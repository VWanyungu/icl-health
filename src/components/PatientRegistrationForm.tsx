import { useState, useId } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import bannerImg from '../assets/assessment-banner.jpg'
import { usePatients } from '../hooks/usePatients.tsx'
import type { Patient } from '../hooks/usePatients.tsx'

export default function PatientRegistrationForm() {
  const navigate = useNavigate()
  const { addPatient } = usePatients()
  const formId = useId()

  const [formData, setFormData] = useState<Omit<Patient, 'id'>>({
    firstname: '',
    middlename: '',
    lastname: '',
    gender: 'Male',
    dob: '',
    unique: '',
    reg_date: new Date().toISOString().split('T')[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newPatient = addPatient({
      firstname: formData.firstname,
      middlename: formData.middlename,
      lastname: formData.lastname,
      gender: formData.gender,
      dob: formData.dob,
      unique: formData.unique,
      reg_date: formData.reg_date,
      created_at: formData.created_at,
      updated_at: formData.updated_at,
    })

    toast.success('Patient registered successfully! Proceeding to Vitals...')

    setTimeout(() => {
      navigate(`/vitals/${newPatient.id}`)
    }, 600)
  }

  return (
    <div className="mx-auto py-6">
      {/* Outer Card Wrapper */}
      <div className="flex flex-col overflow-hidden bg-white shadow-lg border border-gray-100 dark:border-gray-800 dark:bg-gray-900 md:flex-row min-h-[800px]">
        {/* Left Scenic Sidebar Banner */}
        <div className="relative flex w-full flex-col justify-end overflow-hidden p-8 text-white md:w-80 lg:w-96 shrink-0 min-h-[260px] md:min-h-full">
          <img
            src={bannerImg}
            alt="Scenic Landscape"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="relative z-10">
            <span className="inline-block rounded-full bg-indigo-600/80 backdrop-blur-xs px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white mb-3">
              Patient Onboarding
            </span>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white">
              Patient Registration
            </h2>
            <p className="mt-2 text-xs font-medium text-white/80 leading-relaxed">
              Enroll a new patient into the ICL Health system and proceed directly to vitals capture.
            </p>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="flex flex-1 flex-col justify-between px-6 py-6 sm:px-10">
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col justify-between">
            <div>
              {/* Form Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Patient Registration Form
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Please provide the patient demographic and identification details below.
                  </p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                {/* First Name */}
                <div>
                  <label htmlFor={`${formId}-firstname`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    id={`${formId}-firstname`}
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="e.g. John"
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    required
                  />
                </div>

                {/* Middle Name */}
                <div>
                  <label htmlFor={`${formId}-middlename`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Middle Name
                  </label>
                  <input
                    id={`${formId}-middlename`}
                    type="text"
                    name="middlename"
                    value={formData.middlename}
                    onChange={handleChange}
                    placeholder="e.g. Robert (Optional)"
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor={`${formId}-lastname`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    id={`${formId}-lastname`}
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="e.g. Doe"
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    required
                  />
                </div>

                {/* Gender (Radio Buttons) */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Gender
                  </label>
                  <div className="mt-1.5 flex h-10 items-center gap-6">
                    {(['Male', 'Female'] as const).map((genderOption) => (
                      <label
                        key={genderOption}
                        className="flex cursor-pointer items-center gap-2 text-xs text-gray-900 dark:text-gray-100"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={genderOption}
                          checked={formData.gender === genderOption}
                          onChange={handleChange}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
                        />
                        {genderOption}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor={`${formId}-dob`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Date of Birth
                  </label>
                  <input
                    id={`${formId}-dob`}
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    required
                  />
                </div>

                {/* Patient ID Number */}
                <div>
                  <label htmlFor={`${formId}-unique`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Patient ID Number
                  </label>
                  <input
                    id={`${formId}-unique`}
                    type="text"
                    name="unique"
                    value={formData.unique}
                    onChange={handleChange}
                    placeholder="e.g. 521-8902"
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    required
                  />
                </div>

                {/* Registration Date */}
                <div>
                  <label htmlFor={`${formId}-reg_date`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Registration Date
                  </label>
                  <input
                    id={`${formId}-reg_date`}
                    type="date"
                    name="reg_date"
                    value={formData.reg_date}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => navigate('/patients')}
                className="cursor-pointer bg-indigo-600 px-8 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95"
              >
                Previous
              </button>
              <button
                type="submit"
                className="cursor-pointer bg-indigo-600 px-8 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export { PatientRegistrationForm }
