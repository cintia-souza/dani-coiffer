'use client'

import { useEffect, useState } from 'react'
import { getSalonConfig } from '@/lib/client-actions'
import { updateSalonConfig } from '@/lib/admin-actions'

const WEEKDAYS = [
  { value: '0', label: 'Dom' },
  { value: '1', label: 'Seg' },
  { value: '2', label: 'Ter' },
  { value: '3', label: 'Qua' },
  { value: '4', label: 'Qui' },
  { value: '5', label: 'Sex' },
  { value: '6', label: 'Sáb' },
]

function ImageUploadField({ label, description, value, onChange }: {
  label: string
  description: string
  value: string
  onChange: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) onChange(data.url)
      else alert(data.error || 'Erro no upload')
    } catch {
      alert('Erro ao enviar imagem')
    }
    setUploading(false)
  }

  return (
    <div className="border border-gray-100 rounded-lg p-4 space-y-3">
      <div>
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>

      {value && (
        <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-rosegold-100">
          <img src={value} alt={label} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}

      <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
        uploading ? 'bg-gray-100 text-gray-400' : 'bg-rosegold-50 text-rosegold-600 hover:bg-rosegold-100'
      }`}>
        <span>{uploading ? 'Enviando...' : value ? 'Trocar foto' : 'Enviar foto'}</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />
      </label>
    </div>
  )
}

export default function ConfiguracoesPage() {
  const [config, setConfig] = useState({
    salonName: '',
    address: '',
    phone: '',
    whatsapp: '',
    pixKey: '',
    openingHour: '08:00',
    closingHour: '18:00',
    workDays: '1,2,3,4,5,6',
    cancellationHours: 24,
    heroImage: '',
    serviceImage1: '',
    serviceImage2: '',
    serviceImage3: '',
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    getSalonConfig().then((data) => {
      if (data) {
        setConfig({
          salonName: data.salonName || '',
          address: data.address || '',
          phone: data.phone || '',
          whatsapp: data.whatsapp || '',
          pixKey: data.pixKey || '',
          openingHour: data.openingHour?.slice(0, 5) || '08:00',
          closingHour: data.closingHour?.slice(0, 5) || '18:00',
          workDays: (data as any).workDays || '1,2,3,4,5,6',
          cancellationHours: data.cancellationHours || 24,
          heroImage: (data as any).heroImage || '',
          serviceImage1: (data as any).serviceImage1 || '',
          serviceImage2: (data as any).serviceImage2 || '',
          serviceImage3: (data as any).serviceImage3 || '',
        })
      }
    })
  }, [])

  const selectedDays = config.workDays.split(',').filter(Boolean)

  function toggleDay(day: string) {
    const days = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day].sort()
    setConfig({ ...config, workDays: days.join(',') })
  }

  async function handleSave() {
    setSaving(true)
    setMessage('')
    const result = await updateSalonConfig(config)
    if (result?.error) {
      setMessage(`❌ ${result.error}`)
    } else {
      setMessage('✅ Configurações salvas!')
    }
    setSaving(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Configurações</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="space-y-6">
          {/* Dados do Salão */}
          <div className="bg-white rounded-xl p-6 border border-pink-100 shadow-sm space-y-4">
            <h2 className="font-semibold text-gray-800">Dados do Salão</h2>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nome</label>
              <input
                type="text"
                value={config.salonName}
                onChange={(e) => setConfig({ ...config, salonName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-rosegold-400 focus:ring-1 focus:ring-rosegold-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Endereço</label>
              <input
                type="text"
                value={config.address}
                onChange={(e) => setConfig({ ...config, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-rosegold-400 focus:ring-1 focus:ring-rosegold-400 outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Telefone</label>
                <input
                  type="text"
                  value={config.phone}
                  onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                  placeholder="(11) 97666-6767"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-rosegold-400 focus:ring-1 focus:ring-rosegold-400 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">WhatsApp</label>
                <input
                  type="text"
                  value={config.whatsapp}
                  onChange={(e) => setConfig({ ...config, whatsapp: e.target.value })}
                  placeholder="11976666767"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-rosegold-400 focus:ring-1 focus:ring-rosegold-400 outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Horário */}
          <div className="bg-white rounded-xl p-6 border border-pink-100 shadow-sm space-y-5">
            <div>
              <h2 className="font-semibold text-gray-800">Horário de Funcionamento</h2>
              <p className="text-xs text-gray-400 mt-1">Selecione os dias em que o salão está aberto e defina o horário.</p>
            </div>

            {/* Dias da semana */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-3">Dias da semana</label>
              <div className="space-y-2">
                {WEEKDAYS.map((day) => {
                  const isOpen = selectedDays.includes(day.value)
                  return (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => toggleDay(day.value)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                        isOpen
                          ? 'border-rosegold-300 bg-rosegold-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <span className={`text-sm font-medium ${isOpen ? 'text-rosegold-700' : 'text-gray-500'}`}>
                        {day.label === 'Dom' ? 'Domingo' : day.label === 'Seg' ? 'Segunda-feira' : day.label === 'Ter' ? 'Terça-feira' : day.label === 'Qua' ? 'Quarta-feira' : day.label === 'Qui' ? 'Quinta-feira' : day.label === 'Sex' ? 'Sexta-feira' : 'Sábado'}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        isOpen
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-50 text-red-500'
                      }`}>
                        {isOpen ? '✓ Aberto' : '✕ Fechado'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Horários */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Abre às</label>
                <input
                  type="time"
                  value={config.openingHour}
                  onChange={(e) => setConfig({ ...config, openingHour: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-rosegold-400 focus:ring-1 focus:ring-rosegold-400 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Fecha às</label>
                <input
                  type="time"
                  value={config.closingHour}
                  onChange={(e) => setConfig({ ...config, closingHour: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-rosegold-400 focus:ring-1 focus:ring-rosegold-400 outline-none text-sm"
                />
              </div>
            </div>

            {/* Resumo visual */}
            {selectedDays.length > 0 && (
              <div className="bg-rosegold-50 rounded-lg px-4 py-3 border border-rosegold-100">
                <p className="text-xs text-rosegold-700 font-medium">📅 Resumo:</p>
                <p className="text-sm text-rosegold-600 mt-1">
                  {selectedDays.length === 7 ? 'Todos os dias' : selectedDays.length === 6 && !selectedDays.includes('0') ? 'Segunda a Sábado' : WEEKDAYS.filter(d => selectedDays.includes(d.value)).map(d => d.label).join(', ')}
                  {' · '}{config.openingHour}h às {config.closingHour}h
                </p>
              </div>
            )}

            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">Antecedência mínima para cancelamento (horas)</label>
              <input
                type="number"
                value={config.cancellationHours}
                onChange={(e) => setConfig({ ...config, cancellationHours: Number(e.target.value) })}
                min={1}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-rosegold-400 focus:ring-1 focus:ring-rosegold-400 outline-none text-sm"
              />
            </div>
          </div>

          {/* Chave PIX */}
          <div className="bg-white rounded-xl p-6 border border-pink-100 shadow-sm space-y-4">
            <h2 className="font-semibold text-gray-800">Chave PIX</h2>
            <p className="text-xs text-gray-400">A chave será exibida na página de preços e o QR Code é gerado automaticamente.</p>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Chave (CPF, e-mail, telefone ou aleatória)</label>
              <input
                type="text"
                value={config.pixKey}
                onChange={(e) => setConfig({ ...config, pixKey: e.target.value })}
                placeholder="exemplo@email.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-rosegold-400 focus:ring-1 focus:ring-rosegold-400 outline-none text-sm font-mono"
              />
            </div>
          </div>

          {/* Imagens do Site */}
          <div className="bg-white rounded-xl p-6 border border-pink-100 shadow-sm space-y-5">
            <div>
              <h2 className="font-semibold text-gray-800">Imagens do Site</h2>
              <p className="text-xs text-gray-400 mt-1">Envie fotos para personalizar o banner e as seções de serviço.</p>
            </div>

            <ImageUploadField
              label="Banner Principal"
              description="Imagem circular do hero (recomendado: 600x600px)"
              value={config.heroImage}
              onChange={(url) => setConfig({ ...config, heroImage: url })}
            />

            <ImageUploadField
              label="Serviço: Unhas"
              description="Foto da seção de unhas (recomendado: 400x400px)"
              value={config.serviceImage1}
              onChange={(url) => setConfig({ ...config, serviceImage1: url })}
            />

            <ImageUploadField
              label="Serviço: Cabelo"
              description="Foto da seção de cabelo (recomendado: 400x400px)"
              value={config.serviceImage2}
              onChange={(url) => setConfig({ ...config, serviceImage2: url })}
            />

            <ImageUploadField
              label="Serviço: Estética"
              description="Foto da seção de estética (recomendado: 400x400px)"
              value={config.serviceImage3}
              onChange={(url) => setConfig({ ...config, serviceImage3: url })}
            />
          </div>

          {/* Botão Salvar */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full gradient-rosegold text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? 'Salvando...' : 'Salvar Configurações'}
          </button>

          {message && (
            <p className="text-sm text-center font-medium">{message}</p>
          )}
        </div>

        {/* Preview QR Code PIX */}
        <div>
          {config.pixKey && (
            <div className="bg-white rounded-xl p-6 border border-pink-100 shadow-sm text-center sticky top-6">
              <h2 className="font-semibold text-gray-800 mb-4">Preview do QR Code PIX</h2>
              <div className="inline-block p-4 bg-white rounded-2xl border-2 border-rosegold-100">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(config.pixKey)}&color=b76e79`}
                  alt="QR Code PIX"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <p className="text-xs text-gray-400 mt-3">Chave:</p>
              <p className="text-sm font-mono bg-rosegold-50 px-4 py-2 rounded-lg mt-1 break-all text-gray-700">{config.pixKey}</p>
              <p className="text-xs text-gray-400 mt-3">Este QR Code será exibido na página de Preços para os clientes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
