import { useState, useId, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import bannerImg from '../assets/assessment-banner.jpg'
import { usePatients } from '../hooks/usePatients.tsx'
import { calculateAge } from '../lib/utils/calculateAge.tsx'
import { vitalsDb } from '../lib/database.tsx'

export interface VitalsFormData {
  visit_date: string
  weight: string
  bmi: number
  height: string
  patient_id: string
}

export default function VitalsForm() {
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

  const initialWeight = 70
  const initialHeight = 175
  const initialBmi = initialWeight / ((initialHeight / 100) * (initialHeight / 100))

  const [formData, setFormData] = useState<VitalsFormData>({
    visit_date: new Date().toISOString().split('T')[0],
    weight: String(initialWeight),
    height: String(initialHeight),
    bmi: initialBmi,
    patient_id: id || '1',
  })

  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false)

  useEffect(() => {
    const patientId = id || String(currentPatient.id)
    const alreadySubmitted = vitalsDb.hasSubmissionToday(patientId, formData.visit_date)
    setIsAlreadySubmitted(alreadySubmitted)
    if (alreadySubmitted) {
      toast.info('Vitals have already been submitted for this patient today.', {
        toastId: `vitals-${patientId}-${formData.visit_date}`,
      })
    }
  }, [id, currentPatient.id, formData.visit_date])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    let bmi = formData.bmi
    if (name === 'weight') {
      const h = Number(formData.height) / 100
      bmi = h > 0 ? Number(value) / (h * h) : 0
    } else if (name === 'height') {
      const h = Number(value) / 100
      bmi = h > 0 ? Number(formData.weight) / (h * h) : 0
    }
    setFormData((prev) => ({ ...prev, [name]: value, bmi }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const targetPatientId = id || String(currentPatient.id)

    if (vitalsDb.hasSubmissionToday(targetPatientId, formData.visit_date)) {
      toast.info('Vitals have already been submitted for this patient today.')
      setIsAlreadySubmitted(true)
      return
    }

    const response = await vitalsDb.saveVitals({
      patient_id: targetPatientId,
      visit_date: formData.visit_date,
      weight: formData.weight,
      height: formData.height,
      bmi: formData.bmi,
    })

    toast.success(response.data.message || 'Patient vitals saved successfully!')

    setTimeout(() => {
      if (formData.bmi <= 25) {
        navigate(`/general-assessment/${targetPatientId}`)
      } else {
        navigate(`/overweight-assessment/${targetPatientId}`)
      }
    }, 600)
  }

  return (
    <div className="mx-auto py-6">
      {/* Outer Card Wrapper */}
      <div className="flex flex-col overflow-hidden bg-white shadow-lg border border-gray-100 dark:border-gray-800 dark:bg-gray-900 md:flex-row min-h-[800px]">
        {/* Left Scenic Sidebar Banner */}
        <div className="relative flex w-full flex-col justify-end overflow-hidden p-8 text-white md:w-80 lg:w-96 shrink-0 min-h-[260px] md:min-h-full">
          {/* Background Image */}
          <img
            src={bannerImg}
            alt="Scenic Landscape"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Banner Text */}
          <div className="relative z-10">
            <span className="inline-block rounded-full bg-indigo-600/80 backdrop-blur-xs px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white mb-3">
              Step 1 of 3
            </span>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white">
              Vitals Assessment
            </h2>
            <p className="mt-2 text-xs font-medium text-white/80 leading-relaxed">
              Record vital signs, blood pressure, and core biometrics for {currentPatient.firstname}.
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
                    Patient Vitals
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
                  <label htmlFor={`${formId}-date`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Visit Date
                  </label>
                  <input
                    id={`${formId}-date`}
                    type="date"
                    name="visit_date"
                    value={formData.visit_date}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    required
                  />
                </div>

                {/* Weight */}
                <div>
                  <label htmlFor={`${formId}-weight`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Weight (kg)
                  </label>
                  <input
                    id={`${formId}-weight`}
                    type="number"
                    step="0.1"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="e.g. 70"
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    required
                  />
                </div>

                {/* Height */}
                <div>
                  <label htmlFor={`${formId}-height`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Height (cm)
                  </label>
                  <input
                    id={`${formId}-height`}
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="e.g. 175"
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    required
                  />
                </div>

                {/* BMI */}
                <div>
                  <label htmlFor={`${formId}-bmi`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    BMI
                  </label>
                  <input
                    id={`${formId}-bmi`}
                    type="number"
                    name="bmi"
                    disabled
                    value={formData.bmi.toFixed(2)}
                    placeholder="e.g. 22.8"
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
                disabled={isAlreadySubmitted}
                className="cursor-pointer bg-indigo-600 px-8 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                title={isAlreadySubmitted ? 'Assessment already submitted for today' : ''}
              >
                {isAlreadySubmitted ? 'Already Submitted' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export { VitalsForm }

