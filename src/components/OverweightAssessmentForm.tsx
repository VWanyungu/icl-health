import { useState, useId } from 'react'
import { useNavigate, useParams } from 'react-router'
import bannerImg from '../assets/assessment-banner.jpg'
import { usePatients } from '../hooks/usePatients.tsx'

export interface OverweightAssessmentData {
  weight: string
  height: string
  bmi: string
  waistCircumference: string
  hipCircumference: string
  targetWeight: string
  dietaryHabits: string
  familyHistory: string
  nutritionPlan: string
  date: string
  generalHealth: string
  drugs: string
  assessmentNotes: string
}

export default function OverweightAssessmentForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { patients } = usePatients()
  const formId = useId()

  const currentPatient = patients.find((p) => p.id === id) || {
    id: id || '1',
    name: 'Patient Record',
    age: 32,
    bmi: 28.1,
    mrn: '521',
  }

  const [formData, setFormData] = useState<OverweightAssessmentData>({
    weight: '82',
    height: '172',
    bmi: String(currentPatient.bmi || '27.7'),
    waistCircumference: '88',
    hipCircumference: '102',
    targetWeight: '72',
    dietaryHabits: 'High carb, low vegetable intake',
    familyHistory: 'Yes - Type 2 Diabetes',
    nutritionPlan: '',
    date: new Date().toISOString().split('T')[0],
    generalHealth: '',
    drugs: '',
    assessmentNotes: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      if (name === 'weight' || name === 'height') {
        const w = parseFloat(name === 'weight' ? value : prev.weight)
        const h = parseFloat(name === 'height' ? value : prev.height) / 100
        if (w > 0 && h > 0) {
          updated.bmi = (w / (h * h)).toFixed(1)
        }
      }
      return updated
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      navigate('/patients')
    }, 1000)
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
              Analyze body composition, nutritional risks, and lifestyle management for {currentPatient.name}.
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
                      Patient: <strong className="text-gray-800 dark:text-gray-200">{currentPatient.name}</strong>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Age: {currentPatient.age} yrs
                    </p>
                  </div>
                </div>
                {submitted && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Assessment Completed! Returning to dashboard...
                  </span>
                )}
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
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-1.5 w-full border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    required
                  />
                </div>

                {/* General Condition */}
                <div>
                  <label htmlFor={`${formId}-generalHealth`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
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
                          name="generalHealth"
                          value={condition}
                          checked={formData.generalHealth === condition}
                          onChange={handleChange}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-800"
                        />
                        {condition}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor={`${formId}-drugs`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
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
                          name="drugs"
                          value={condition}
                          checked={formData.drugs === condition}
                          onChange={handleChange}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-800"
                        />
                        {condition}
                      </label>
                    ))}
                  </div>
                </div>


                {/* Assessment Notes */}
                <div className="sm:col-span-2">
                  <label htmlFor={`${formId}-assessmentNotes`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Comments
                  </label>
                  <textarea
                    id={`${formId}-assessmentNotes`}
                    name="assessmentNotes"
                    rows={3}
                    value={formData.assessmentNotes}
                    onChange={handleChange}
                    placeholder="Enter diagnostic summary and clinical findings..."
                    className="mt-1.5 w-full  border border-gray-200 bg-gray-50/70 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => navigate(`/vitals/${id || currentPatient.id}`)}
                className="cursor-pointer bg-indigo-600 px-8 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95"
              >
                Previous
              </button>
              <button
                type="submit"
                className="cursor-pointer bg-indigo-600 px-8 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95"
              >
                Complete Assessment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export { OverweightAssessmentForm }
