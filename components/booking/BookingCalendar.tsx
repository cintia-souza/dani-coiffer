'use client'

import { useState, useEffect } from 'react'
import { getAvailableSlots, createAppointment } from './booking-actions'

interface TimeSlot {
  time: string
  available: boolean
}

interface BookingCalendarProps {
  serviceId: string
  professionalId: string
  durationMinutes: number
}

export default function BookingCalendar({ serviceId, professionalId, durationMinutes }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState('')
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedDate && professionalId) {
      setLoading(true)
      getAvailableSlots(professionalId, selectedDate, durationMinutes).then((s) => {
        setSlots(s)
        setLoading(false)
      })
    }
  }, [selectedDate, professionalId, durationMinutes])

  async function handleBooking() {
    if (!selectedDate || !selectedSlot) return

    const result = await createAppointment({
      professionalId,
      serviceId,
      date: selectedDate,
      startTime: selectedSlot,
      durationMinutes,
    })

    if (result?.success) {
      alert('Agendamento realizado com sucesso!')
      setSelectedSlot('')
      const s = await getAvailableSlots(professionalId, selectedDate, durationMinutes)
      setSlots(s)
    } else {
      alert(result?.error || 'Erro ao agendar.')
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Escolha a data</label>
        <input
          type="date"
          min={today}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full border border-pink-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {loading && <p className="text-pink-500 text-sm">Carregando horários...</p>}

      {slots.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Horários disponíveis</label>
          <div className="grid grid-cols-4 gap-2">
            {slots.map((slot) => (
              <button
                key={slot.time}
                disabled={!slot.available}
                onClick={() => setSelectedSlot(slot.time)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  !slot.available
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : selectedSlot === slot.time
                    ? 'bg-pink-500 text-white'
                    : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
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
          onClick={handleBooking}
          className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
        >
          Confirmar Agendamento
        </button>
      )}
    </div>
  )
}
