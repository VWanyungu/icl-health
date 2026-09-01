import { useState, useId } from 'react'
import { useNavigate } from 'react-router'
import bannerImg from '../assets/assessment-banner.jpg'
import { usePatients } from '../hooks/usePatients.tsx'

export interface PatientRegistrationData {
  firstName: string
  middleName: string
  lastName: string
  gender: 'Male' | 'Female'
  dob: string
  idNumber: string
  registrationDate: string
}

export default function PatientRegistrationForm() {
  const navigate = useNavigate()
  const { addPatient } = usePatients()
  const formId = useId()

  const [formData, setFormData] = useState<PatientRegistrationData>({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'Male',
    dob: '',
    idNumber: '',
    registrationDate: new Date().toISOString().split('T')[0],
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const calculateAge = (dobString: string): number => {
    if (!dobString) return 30
    const birthDate = new Date(dobString)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age > 0 ? age : 1
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    const fullName = [formData.firstName, formData.middleName, formData.lastName]
      .filter(Boolean)
      .join(' ')

    const age = calculateAge(formData.dob)

    const newPatient = addPatient({
      name: fullName || 'New Patient',
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      gender: formData.gender,
      age,
      bmi: 0,
      dob: formData.dob,
      mrn: formData.idNumber || '521',
      lastAssessmentDate: formData.registrationDate,
      registrationDate: formData.registrationDate,
    })

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
                {submitted && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Registered! Proceeding to Vitals...
                  </span>
                )}
              </div>

              {/* Form Grid */}
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                {/* First Name */}
                <div>
                  <label htmlFor={`${formId}-firstName`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    id={`${formId}-firstName`}
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. John"
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    required
                  />
                </div>

                {/* Middle Name */}
                <div>
                  <label htmlFor={`${formId}-middleName`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Middle Name
                  </label>
                  <input
                    id={`${formId}-middleName`}
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="e.g. Robert (Optional)"
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor={`${formId}-lastName`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    id={`${formId}-lastName`}
                    type="text"
                    name="lastName"
                    value={formData.lastName}
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
                  <label htmlFor={`${formId}-idNumber`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Patient ID / MRN Number
                  </label>
                  <input
                    id={`${formId}-idNumber`}
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleChange}
                    placeholder="e.g. 521-8902"
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    required
                  />
                </div>

                {/* Registration Date */}
                <div>
                  <label htmlFor={`${formId}-registrationDate`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Registration Date
                  </label>
                  <input
                    id={`${formId}-registrationDate`}
                    type="date"
                    name="registrationDate"
                    value={formData.registrationDate}
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
