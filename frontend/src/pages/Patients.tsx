import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    type ColumnDef,
    type RowSelectionState,
} from '@tanstack/react-table'
import {
    Search,
    Download,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    X,
    MoreVertical,
} from 'lucide-react'
import { usePatients } from '../hooks/usePatients.tsx'
import type { DashboardPatient } from '../lib/database.tsx'

export default function Patients() {
    const { patients } = usePatients()
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({ '1': true }) // Row 1 selected by default to match demo
    const [globalFilter, setGlobalFilter] = useState('')
    const [assessmentDate, setAssessmentDate] = useState('')
    const [categoryFilter, setCategoryFilter] = useState<'all' | 'today' | 'overweight' | 'normal' | 'underweight'>('all')

    // Compute summary stats dynamically
    const summaryStats = useMemo(() => {
        const todayStr = new Date().toISOString().split('T')[0]
        const todaysVisitsCount = patients.filter(
            (p) => p.lastAssessmentDate === todayStr || p.lastAssessmentDate === '2024-05-27'
        ).length || 4
        const overweightCount = patients.filter((p) => p.bmi >= 25.0).length
        const normalCount = patients.filter((p) => p.bmi >= 18.5 && p.bmi < 25.0).length
        const underweightCount = patients.filter((p) => p.bmi < 18.5).length

        return {
            todaysVisits: todaysVisitsCount,
            overweight: overweightCount,
            normal: normalCount,
            underweight: underweightCount,
        }
    }, [patients])

    // Filter patients based on search, year, month, specific date, and category filter
    const filteredData = useMemo(() => {
        return patients.filter((patient) => {
            // Category filter check
            if (categoryFilter === 'overweight' && patient.bmi < 25.0) return false
            if (categoryFilter === 'normal' && (patient.bmi < 18.5 || patient.bmi >= 25.0)) return false
            if (categoryFilter === 'underweight' && patient.bmi >= 18.5) return false
            if (categoryFilter === 'today') {
                const todayStr = new Date().toISOString().split('T')[0]
                const isToday = patient.lastAssessmentDate === todayStr || patient.lastAssessmentDate === '2024-05-27'
                if (!isToday) return false
            }

            // Date filter check
            if (patient.lastAssessmentDate) {
                if (assessmentDate && patient.lastAssessmentDate !== assessmentDate) {
                    return false
                }
            }

            // Global search check (name or MRN)
            if (globalFilter.trim()) {
                const query = globalFilter.toLowerCase()
                const matchFirstName = patient.firstname.toLowerCase().includes(query)
                const matchLastName = patient.lastname.toLowerCase().includes(query)
                const matchMrn = patient.unique?.toLowerCase().includes(query)
                return matchFirstName || matchLastName || matchMrn
            }

            return true
        })
    }, [patients, assessmentDate, globalFilter, categoryFilter])

    const columns = useMemo<ColumnDef<DashboardPatient>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Patient Name',
                cell: ({ row }) => (
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                        {row.original.firstname + " " + row.original.lastname}
                    </span>
                ),
            },
            {
                accessorKey: 'age',
                header: 'Age',
                cell: ({ row }) => {
                    const age = new Date().getFullYear() - new Date(row.original.dob).getFullYear()
                    return (
                        <span className="text-gray-700 dark:text-gray-300">
                            {age} yrs
                        </span>
                    )
                },
            },
            {
                accessorKey: 'bmi',
                header: 'BMI',
                cell: ({ row }) => {
                    const bmi = row.original.bmi
                    let badgeColor = 'text-emerald-700 dark:text-emerald-300'
                    if (bmi < 18.5) badgeColor = 'text-blue-700 dark:text-blue-300'
                    else if (bmi >= 25 && bmi < 30) badgeColor = 'text-amber-700 dark:text-amber-300'
                    else if (bmi >= 30) badgeColor = 'text-rose-700 dark:text-rose-300'

                    return (
                        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold ${badgeColor}`}>
                            {bmi.toFixed(2)}
                        </span>
                    )
                },
            },
            {
                accessorKey: 'lastAssessmentDate',
                header: 'Last Assessment Date',
                cell: ({ row }) => {
                    const dateStr = row.original.lastAssessmentDate
                    if (!dateStr) return <span className="text-gray-400">—</span>
                    const [y, m, d] = dateStr.split('-')
                    return (
                        <span className="text-gray-700 dark:text-gray-300 font-mono text-xs">
                            {`${parseInt(m, 10)}/${parseInt(d, 10)}/${y}`}
                        </span>
                    )
                },
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <div className="flex items-center justify-end pr-2">
                        <PatientActionDropdown patientId={String(row.original.id)} />
                    </div>
                ),
            },
        ],
        []
    )

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    })

    const exportCSV = () => {
        const headers = ['Patient Name', 'Age', 'BMI', 'Last Assessment Date']
        const rows = filteredData.map((p) => [p.firstname + " " + p.lastname, p.dob, p.bmi, p.lastAssessmentDate])
        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement('a')
        link.setAttribute('href', encodedUri)
        link.setAttribute('download', `patients_assessment_${new Date().toISOString().split('T')[0]}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const clearFilters = () => {
        setAssessmentDate('')
        setGlobalFilter('')
        setCategoryFilter('all')
    }

    const hasActiveFilters =
        assessmentDate !== '' ||
        globalFilter !== '' ||
        categoryFilter !== 'all'

    const totalItems = filteredData.length
    const pageIndex = table.getState().pagination.pageIndex
    const currentPageSize = table.getState().pagination.pageSize
    const startItem = totalItems === 0 ? 0 : pageIndex * currentPageSize + 1
    const endItem = Math.min((pageIndex + 1) * currentPageSize, totalItems)

    return (
        <div className="mx-auto py-8">
            {/* Summary Cards Grid (Based on Uploaded Image) */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* 1. Today's Visits */}
                <div
                    onClick={() => setCategoryFilter(categoryFilter === 'today' ? 'all' : 'today')}
                    className={`group cursor-pointer border p-5 transition-all hover:shadow-sm ${categoryFilter === 'today'
                        ? 'border-amber-100 bg-amber-50/20 dark:bg-amber-950/20'
                        : 'border-gray-100 bg-white hover:border-gray-200 dark:border-gray-800 dark:bg-gray-900'
                        }`}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <span className="h-4.5 w-1.5 rounded-full bg-amber-500" />
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Today's Visits
                            </h3>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-600 dark:text-gray-500" />
                    </div>
                    <div className="mb-2 flex items-baseline gap-2.5">
                        <span className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            {summaryStats.todaysVisits}
                        </span>
                        {/* <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight className="h-4 w-4" /> 20
                        </span> */}
                    </div>
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                        Shows total clinical assessments and visits logged for today.
                    </p>
                </div>

                {/* 2. Overweight */}
                <div
                    onClick={() => setCategoryFilter(categoryFilter === 'overweight' ? 'all' : 'overweight')}
                    className={`group cursor-pointer border p-5 transition-all hover:shadow-sm ${categoryFilter === 'overweight'
                        ? 'border-amber-100 bg-amber-50/20 dark:bg-amber-950/20'
                        : 'border-gray-100 bg-white hover:border-gray-200 dark:border-gray-800 dark:bg-gray-900'
                        }`}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <span className="h-4.5 w-1.5 rounded-full bg-amber-500" />
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Overweight
                            </h3>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-600 dark:text-gray-500" />
                    </div>
                    <div className="mb-2 flex items-baseline gap-2.5">
                        <span className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            {summaryStats.overweight}
                        </span>
                        {/* <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight className="h-4 w-4" /> {Math.round((summaryStats.overweight / (patients.length || 1)) * 100)}%
                        </span> */}
                    </div>
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                        Patients with BMI ≥ 25.0 to track clinical weight management.
                    </p>
                </div>

                {/* 3. Normal BMI */}
                <div
                    onClick={() => setCategoryFilter(categoryFilter === 'normal' ? 'all' : 'normal')}
                    className={`group cursor-pointer border p-5 transition-all hover:shadow-sm ${categoryFilter === 'normal'
                        ? 'border-amber-100 bg-amber-50/20 dark:bg-amber-950/20'
                        : 'border-gray-100 bg-white hover:border-gray-200 dark:border-gray-800 dark:bg-gray-900'
                        }`}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <span className="h-4.5 w-1.5 rounded-full bg-amber-500" />
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Normal BMI
                            </h3>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-600 dark:text-gray-500" />
                    </div>
                    <div className="mb-2 flex items-baseline gap-2.5">
                        <span className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            {summaryStats.normal}
                        </span>
                        {/* <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight className="h-4 w-4" /> {Math.round((summaryStats.normal / (patients.length || 1)) * 100)}%
                        </span> */}
                    </div>
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                        Patients maintaining a healthy weight range (BMI 18.5 - 24.9).
                    </p>
                </div>

                {/* 4. Underweight */}
                <div
                    onClick={() => setCategoryFilter(categoryFilter === 'underweight' ? 'all' : 'underweight')}
                    className={`group cursor-pointer border p-5 transition-all hover:shadow-sm ${categoryFilter === 'underweight'
                        ? 'border-amber-100 bg-amber-50/20 dark:bg-amber-950/20'
                        : 'border-gray-100 bg-white hover:border-gray-200 dark:border-gray-800 dark:bg-gray-900'
                        }`}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <span className="h-4.5 w-1.5 rounded-full bg-amber-500" />
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Underweight
                            </h3>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-600 dark:text-gray-500" />
                    </div>
                    <div className="mb-2 flex items-baseline gap-2.5">
                        <span className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            {summaryStats.underweight}
                        </span>
                        {/* <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight className="h-4 w-4" /> {Math.round((summaryStats.underweight / (patients.length || 1)) * 100)}%
                        </span> */}
                    </div>
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                        Patients with BMI &lt; 18.5 requiring nutritional assessment.
                    </p>
                </div>
            </div>

            {/* Table Card Container */}
            <div className="bg-white dark:border-gray-800 dark:bg-gray-900">
                {/* Header and Controls Toolbar */}
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left Title & Counter */}
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-indigo-900 dark:text-indigo-400">
                            Patients
                        </h1>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            {totalItems} registered patients
                            {categoryFilter !== 'all' && (
                                <span className="ml-1.5 inline-flex items-center px-2 py-0.5 text-2xs font-semibold text-amber-800">
                                    Filtered by: {categoryFilter}
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Right Toolbar Filters */}
                    <div className="flex flex-wrap items-center gap-2.5">
                        {/* Assessment Date Filter */}
                        <div className="relative flex flex-col items-start gap-1">
                            {/* <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Date:</span> */}
                            <input
                                type="date"
                                value={assessmentDate}
                                onChange={(e) => setAssessmentDate(e.target.value)}
                                className="h-10  border border-gray-200 bg-gray-50/80 px-3 py-1 text-xs text-gray-700 transition focus:border-teal-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                title="Filter by exact assessment date"
                            />
                        </div>

                        {/* Global Search Box */}
                        <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Search"
                                className="h-10 w-full  border border-gray-200 bg-gray-50/80 pl-9 pr-8 text-xs text-gray-800 placeholder-gray-400 transition hover:bg-gray-100 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
                            />
                            {globalFilter && (
                                <button
                                    type="button"
                                    onClick={() => setGlobalFilter('')}
                                    className="absolute right-2.5 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {/* Reset Filters button if active */}
                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="cursor-pointer h-10  border border-dashed border-gray-300 px-3 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Clear filters
                            </button>
                        )}

                        {/* Export / Download Button */}
                        <button
                            type="button"
                            onClick={exportCSV}
                            title="Download CSV"
                            className="cursor-pointer flex h-10 w-10 items-center justify-center  bg-amber-400 text-amber-950 shadow-sm transition hover:bg-amber-500 active:scale-95"
                        >
                            <Download className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Table Viewport */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border-spacing-y-1.5 text-left text-sm">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="text-xs font-medium text-gray-400 dark:text-gray-500 ">
                                    {headerGroup.headers.map((header, idx) => (
                                        <th
                                            key={header.id}
                                            className={`pb-3 pt-1 px-4 font-normal text-center ${idx === 0 ? 'text-left' : ''
                                                } ${idx === headerGroup.headers.length - 1 ? 'text-right pr-6' : ''} border-b border-gray-200`}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map((row) => {
                                    return (
                                        <tr
                                            key={row.id}
                                            className={`group transition-all duration-150
                                                hover:bg-gray-50/80 dark:hover:bg-gray-800/40 text-gray-700 dark:text-gray-200`}
                                        >
                                            {row.getVisibleCells().map((cell, idx) => {
                                                const isFirst = idx === 0
                                                const isLast = idx === row.getVisibleCells().length - 1
                                                return (
                                                    <td
                                                        key={cell.id}
                                                        className={`py-3.5 px-4 text-xs transition-colors text-center ${isFirst ? ' text-left' : ''
                                                            } ${isLast ? 'text-right pr-6' : ''}`}
                                                    >
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="py-12 text-center text-xs text-gray-500 dark:text-gray-400"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <p>No patients found matching the selected criteria.</p>
                                            {hasActiveFilters && (
                                                <button
                                                    type="button"
                                                    onClick={clearFilters}
                                                    className="cursor-pointer mt-1 text-xs font-semibold text-teal-600 hover:underline dark:text-teal-400"
                                                >
                                                    Clear all filters
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination Bar */}
                <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400 sm:flex-row">
                    {/* Rows per page selector */}
                    <div className="flex items-center gap-2">
                        <span>Rows per page:</span>
                        <div className="relative">
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value))
                                }}
                                className="appearance-none border border-gray-200 bg-white py-1 pl-2.5 pr-6 text-xs font-medium text-gray-700 shadow-xs focus:border-teal-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                            >
                                {[5, 10, 20, 50].map((pageSizeOption) => (
                                    <option key={pageSizeOption} value={pageSizeOption}>
                                        {pageSizeOption}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-1.5 top-2 h-3.5 w-3.5 text-gray-400" />
                        </div>
                    </div>

                    {/* Page range & navigation chevrons */}
                    <div className="flex items-center gap-4">
                        <span>
                            {startItem}-{endItem} of {totalItems}
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="cursor-pointer flex h-7 w-7 items-center justify-center border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                aria-label="Previous page"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="cursor-pointer flex h-7 w-7 items-center justify-center border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                aria-label="Next page"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PatientActionDropdown({ patientId }: { patientId: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                title="Open patient actions"
                aria-expanded={isOpen}
            >
                <MoreVertical className="h-4 w-4" />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 w-56 origin-top-right border border-gray-100 bg-white shadow-xl ring-1 ring-black/5 dark:border-gray-700 dark:bg-gray-800">
                    <div className="px-4.5 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        Patient Actions
                    </div>
                    <Link
                        to={`/patients`}
                        onClick={() => setIsOpen(false)}
                        className="border-y border-gray-100 flex items-center gap-2.5 px-3 py-4 text-xs font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700/60 dark:hover:text-gray-400"
                    >
                        <span>Single Patient View</span>
                    </Link>
                    <Link
                        to={`/vitals/${patientId}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-4 text-xs font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700/60 dark:hover:text-gray-400"
                    >
                        <span>Assess</span>
                    </Link>
                </div>
            )}
        </div>
    )
}