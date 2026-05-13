'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getAllServices, createService, updateService, deleteService } from '@/lib/admin-actions'

const serviceSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  description: z.string().optional(),
  price: z.string().min(1, 'Preço obrigatório'),
  durationMinutes: z.number().min(10, 'Mínimo 10 minutos'),
  photoUrl: z.string().optional(),
})

type ServiceForm = z.infer<typeof serviceSchema>

interface Service {
  id: string
  name: string
  description: string | null
  price: string
  durationMinutes: number
  photoUrl: string | null
  active: boolean | null
}

export default function ServicosPage() {
  const [servicesList, setServicesList] = useState<Service[]>([])
  const [editing, setEditing] = useState<Service | null>(null)
  const [showForm, setShowForm] = useState(false)

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { durationMinutes: 60 },
  })

  useEffect(() => { loadServices() }, [])

  async function loadServices() {
    const data = await getAllServices()
    setServicesList(data as Service[])
  }

  function openEdit(service: Service) {
    setEditing(service)
    setShowForm(true)
    reset({
      name: service.name,
      description: service.description || '',
      price: service.price,
      durationMinutes: service.durationMinutes,
      photoUrl: service.photoUrl || '',
    })
  }

  function openNew() {
    setEditing(null)
    setShowForm(true)
    reset({ name: '', description: '', price: '', durationMinutes: 60, photoUrl: '' })
  }

  async function onSubmit(data: ServiceForm) {
    if (editing) {
      await updateService(editing.id, data)
    } else {
      await createService(data)
    }
    setShowForm(false)
    loadServices()
  }

  async function handleDelete(id: string) {
    if (!confirm('Desativar este serviço?')) return
    await deleteService(id)
    loadServices()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestão de Serviços</h1>
        <button
          onClick={openNew}
          aria-label="Adicionar novo serviço"
          className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          + Novo Serviço
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {editing ? 'Editar Serviço' : 'Novo Serviço'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <input
                id="name"
                {...register('name')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1" role="alert">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Preço (R$) *</label>
              <input
                id="price"
                {...register('price')}
                placeholder="80.00"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-invalid={!!errors.price}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1" role="alert">{errors.price.message}</p>}
            </div>

            <div>
              <label htmlFor="durationMinutes" className="block text-sm font-medium text-gray-700 mb-1">Duração (min) *</label>
              <input
                id="durationMinutes"
                type="number"
                {...register('durationMinutes', { valueAsNumber: true })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-invalid={!!errors.durationMinutes}
              />
              {errors.durationMinutes && <p className="text-red-500 text-xs mt-1" role="alert">{errors.durationMinutes.message}</p>}
            </div>

            <div>
              <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 mb-1">URL da Foto</label>
              <input
                id="photoUrl"
                {...register('photoUrl')}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                id="description"
                {...register('description')}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              />
            </div>

            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="bg-pink-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {editing ? 'Salvar' : 'Criar'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="border border-gray-200 text-gray-600 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista */}
      <div className="bg-white rounded-xl border border-pink-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm" role="table">
          <thead className="bg-pink-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Serviço</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Preço</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Duração</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Status</th>
              <th className="text-right px-4 py-3 font-medium text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {servicesList.map((s) => (
              <tr key={s.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{s.name}</td>
                <td className="px-4 py-3 text-gray-600">R$ {s.price}</td>
                <td className="px-4 py-3 text-gray-600">{s.durationMinutes} min</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${s.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {s.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => openEdit(s)}
                    aria-label={`Editar serviço ${s.name}`}
                    className="text-pink-600 hover:text-pink-700 font-medium focus:outline-none focus:underline"
                  >
                    Editar
                  </button>
                  {s.active && (
                    <button
                      onClick={() => handleDelete(s.id)}
                      aria-label={`Desativar serviço ${s.name}`}
                      className="text-red-500 hover:text-red-600 font-medium focus:outline-none focus:underline"
                    >
                      Desativar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
