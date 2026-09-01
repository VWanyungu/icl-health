import { useState, useId, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import bannerImg from '../assets/assessment-banner.jpg'
import { usePatients } from '../hooks/usePatients.tsx'
import { calculateAge } from '../lib/utils/calculateAge.tsx'
import { overweightAssessmentDb, STORAGE_VITAL_ID_KEY } from '../lib/database.tsx'

export interface OverweightAssessmentData {
  general_health: string
  on_drugs: string
  comments: string
  visit_date: string
  patient_id: string
  vital_id: string
}

export default function OverweightAssessmentForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getPatientById } = usePatients()
  const formId = useId()

  const currentPatient = (id ? getPatientById(id) : undefined) || {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    dob: "1992-05-14",
  }

  const storedVitalId = localStorage.getItem(STORAGE_VITAL_ID_KEY) || '1'

  const [formData, setFormData] = useState<OverweightAssessmentData>({
    general_health: 'Good',
    on_drugs: 'No',
    comments: '',
    visit_date: new Date().toISOString().split('T')[0],
    patient_id: id || '1',
    vital_id: storedVitalId,
  })

  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false)

  useEffect(() => {
    const patientId = id || String(currentPatient.id)
    const alreadySubmitted = overweightAssessmentDb.hasSubmissionToday(patientId, formData.visit_date)
    setIsAlreadySubmitted(alreadySubmitted)
    if (alreadySubmitted) {
      toast.info('Overweight assessment has already been submitted for this patient today.', {
        toastId: `overweight-${patientId}-${formData.visit_date}`,
      })
    }
  }, [id, currentPatient.id, formData.visit_date])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const patientId = id || String(currentPatient.id)

    if (overweightAssessmentDb.hasSubmissionToday(patientId, formData.visit_date)) {
      toast.info('Overweight assessment has already been submitted for this patient today.')
      setIsAlreadySubmitted(true)
      return
    }

    await overweightAssessmentDb.saveAssessment({
      patient_id: patientId,
      vital_id: formData.vital_id,
      visit_date: formData.visit_date,
      general_health: formData.general_health,
      on_drugs: formData.on_drugs,
      comments: formData.comments,
    })

    toast.success('Overweight assessment saved successfully! Redirecting...')
    setTimeout(() => {
      navigate('/patients')
    }, 800)
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
              Step 3 of 3
            </span>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white">
              Overweight Assessment
            </h2>
            <p className="mt-2 text-xs font-medium text-white/80 leading-relaxed">
              Analyze body composition, nutritional risks, and lifestyle management for {currentPatient.firstname}.
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
                    Overweight Assessment
                  </h1>
                  <div className='flex items-center gap-2 mt-2 '>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Patient: <strong className="text-gray-800 dark:text-gray-200">{currentPatient.firstname} {currentPatient.lastname}</strong>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Age: {calculateAge(currentPatient.dob)} yrs
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">

                {/* Visit date */}
                <div>
                  <label htmlFor={`${formId}-visit_date`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Visit Date
                  </label>
                  <input
                    id={`${formId}-visit_date`}
                    type="date"
                    name="visit_date"
                    value={formData.visit_date}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    required
                  />
                </div>

                {/* General Condition */}
                <div>
                  <label htmlFor={`${formId}-general_health`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    General Health Condition
                  </label>
                  <div className="mt-1.5 flex items-center h-10 flex-wrap gap-4">
                    {["Good", "Poor"].map((condition) => (
                      <label
                        key={condition}
                        className="flex cursor-pointer items-center gap-2 text-xs text-gray-900 dark:text-gray-100"
                      >
                        <input
                          type="radio"
                          name="general_health"
                          value={condition}
                          checked={formData.general_health === condition}
                          onChange={handleChange}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-800"
                        />
                        {condition}
                      </label>
                    ))}
                  </div>
                </div>

                {/* On Diet to lose weight */}
                <div>
                  <label htmlFor={`${formId}-on_drugs`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Have you ever been on a diet to lose weight?
                  </label>
                  <div className="mt-1.5 flex flex-wrap h-10 items-center gap-4">
                    {["Yes", "No"].map((condition) => (
                      <label
                        key={condition}
                        className="flex cursor-pointer items-center gap-2 text-xs text-gray-900 dark:text-gray-100"
                      >
                        <input
                          type="radio"
                          name="on_drugs"
                          value={condition}
                          checked={formData.on_drugs === condition}
                          onChange={handleChange}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-800"
                        />
                        {condition}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Comments / Notes */}
                <div className="sm:col-span-2">
                  <label htmlFor={`${formId}-comments`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Comments
                  </label>
                  <textarea
                    id={`${formId}-comments`}
                    name="comments"
                    rows={3}
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Enter diagnostic summary and clinical findings..."
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => navigate(`/vitals/${id || String(currentPatient.id)}`)}
                className="cursor-pointer bg-indigo-600 px-8 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95"
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={isAlreadySubmitted}
                className="cursor-pointer bg-indigo-600 px-8 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                title={isAlreadySubmitted ? 'Assessment already submitted for today' : ''}
              >
                {isAlreadySubmitted ? 'Already Submitted' : 'Complete Assessment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export { OverweightAssessmentForm }

