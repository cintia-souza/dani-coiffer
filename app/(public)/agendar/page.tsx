'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getServices, getProfessionals } from '@/lib/client-actions'
import { getAvailableSlots, createAppointment } from '@/components/booking/booking-actions'

interface Service {
  id: string
  name: string
  price: string
  durationMinutes: number
  description: string | null
}

interface Professional {
  id: string
  name: string
  phone: string | null
}

interface TimeSlot {
  time: string
  available: boolean
}

export default function AgendarPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [services, setServices] = useState<Service[]>([])
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getServices().then((s) => setServices(s as Service[]))
    getProfessionals().then((p) => setProfessionals(p as Professional[]))
  }, [])

  useEffect(() => {
    if (selectedDate && selectedProfessional && selectedService) {
      setLoading(true)
      getAvailableSlots(selectedProfessional.id, selectedDate, selectedService.durationMinutes).then((s) => {
        setSlots(s)
        setLoading(false)
      })
    }
  }, [selectedDate, selectedProfessional, selectedService])

  async function handleConfirm() {
    if (!selectedService || !selectedProfessional || !selectedDate || !selectedSlot) return
    setLoading(true)

    const result = await createAppointment({
      serviceId: selectedService.id,
      professionalId: selectedProfessional.id,
      date: selectedDate,
      startTime: selectedSlot,
      durationMinutes: selectedService.durationMinutes,
    })

    if (result.error === 'Não autenticado.') {
      alert('Faça login para confirmar seu agendamento!')
      router.push('/login')
      return
    }

    if (result.success) {
      alert('Agendamento confirmado! ✨')
      router.push('/meus-agendamentos')
    } else {
      alert(result.error || 'Erro ao agendar.')
    }
    setLoading(false)
  }

  const today = new Date().toISOString().split('T')[0]

  const steps = ['Serviço', 'Profissional', 'Data & Hora']

  return (
    <main className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Agendar Horário</h1>
        <p className="text-gray-500 text-sm">Escolha o serviço, profissional e horário</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              step > i + 1 ? 'gradient-pink text-white shadow-md shadow-pink-200/50' :
              step === i + 1 ? 'gradient-pink text-white shadow-md shadow-pink-200/50' :
              'bg-pink-100 text-pink-400'
            }`}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:inline ${step >= i + 1 ? 'text-pink-600' : 'text-gray-400'}`}>
              {label}
            </span>
            {i < 2 && <div className={`w-8 h-0.5 rounded ${step > i + 1 ? 'bg-pink-500' : 'bg-pink-100'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Serviço */}
      {step === 1 && (
        <div className="space-y-3">
          {services.length === 0 ? (
            <p className="text-gray-400 text-sm text-center animate-pulse">Carregando serviços...</p>
          ) : (
            services.map((service) => (
              <button
                key={service.id}
                onClick={() => { setSelectedService(service); setStep(2) }}
                aria-label={`Selecionar serviço ${service.name} por R$ ${service.price}`}
                className="card-hover w-full text-left bg-white rounded-2xl p-5 border border-pink-50 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl gradient-pink flex items-center justify-center shrink-0 shadow-sm shadow-pink-200/50">
                    <span className="text-white text-lg" aria-hidden="true">✨</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800">{service.name}</p>
                    {service.description && <p className="text-xs text-gray-400 mt-0.5 truncate">{service.description}</p>}
                    <p className="text-xs text-gray-400 mt-0.5">⏱ {service.durationMinutes} min</p>
                  </div>
                  <span className="text-lg font-bold text-pink-600 shrink-0">R$ {service.price}</span>
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {/* Step 2: Profissional */}
      {step === 2 && (
        <div className="space-y-3">
          <button onClick={() => setStep(1)} className="text-sm text-pink-600 font-medium hover:underline flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Voltar
          </button>

          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 text-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-pink flex items-center justify-center shrink-0">
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <p className="font-medium text-gray-700">{selectedService?.name}</p>
              <p className="text-xs text-gray-400">R$ {selectedService?.price} • {selectedService?.durationMinutes} min</p>
            </div>
          </div>

          {professionals.length === 0 ? (
            <p className="text-gray-400 text-sm text-center">Nenhum profissional disponível.</p>
          ) : (
            professionals.map((prof) => (
              <button
                key={prof.id}
                onClick={() => { setSelectedProfessional(prof); setStep(3) }}
                aria-label={`Selecionar profissional ${prof.name}`}
                className="card-hover w-full text-left bg-white rounded-2xl p-5 border border-pink-50 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">{prof.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{prof.name}</p>
                    <p className="text-xs text-gray-400">Profissional</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {/* Step 3: Data e Hora */}
      {step === 3 && (
        <div className="space-y-5">
          <button onClick={() => setStep(2)} className="text-sm text-pink-600 font-medium hover:underline flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Voltar
          </button>

          {/* Resumo */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 text-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md gradient-pink flex items-center justify-center text-white text-xs">✓</span>
              <span className="text-gray-700">{selectedService?.name} — R$ {selectedService?.price}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md gradient-pink flex items-center justify-center text-white text-xs">✓</span>
              <span className="text-gray-700">{selectedProfessional?.name}</span>
            </div>
          </div>

          <div>
            <label htmlFor="booking-date" className="block text-sm font-medium text-gray-700 mb-2">Escolha a data</label>
            <input
              id="booking-date"
              type="date"
              min={today}
              value={selectedDate}
              onChange={(e) => { setSelectedDate(e.target.value); setSelectedSlot('') }}
              aria-label="Selecionar data do agendamento"
              className="w-full border border-pink-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            />
          </div>

          {loading && <p className="text-pink-500 text-sm text-center animate-pulse">Carregando horários...</p>}

          {slots.length > 0 && !loading && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Horários disponíveis</label>
              <div className="grid grid-cols-4 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.time)}
                    aria-label={`Horário ${slot.time} ${slot.available ? 'disponível' : 'indisponível'}`}
                    className={`py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                      !slot.available
                        ? 'bg-gray-50 text-gray-300 cursor-not-allowed line-through'
                        : selectedSlot === slot.time
                        ? 'gradient-pink text-white shadow-md shadow-pink-200/50 scale-105'
                        : 'bg-white border border-pink-100 text-gray-700 hover:border-pink-300 hover:shadow-sm'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedSlot && (
            <button
              onClick={handleConfirm}
              disabled={loading}
              aria-label="Confirmar agendamento"
              className="w-full gradient-pink text-white py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-pink-200/50 text-center"
            >
              {loading ? 'Agendando...' : 'Confirmar Agendamento →'}
            </button>
          )}
        </div>
      )}
    </main>
  )
}
