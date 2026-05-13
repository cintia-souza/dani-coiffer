'use client'

import { useEffect, useState } from 'react'
import { getGalleryPhotosAdmin, addGalleryPhoto, deleteGalleryPhoto } from '@/lib/gallery-actions'

interface Photo {
  id: string
  imageUrl: string
  caption: string | null
  category: string | null
  professionalName: string
  active: boolean | null
  createdAt: Date | null
}

const categories = [
  { value: 'cabelo', label: 'Cabelo' },
  { value: 'unhas', label: 'Unhas' },
  { value: 'maquiagem', label: 'Maquiagem' },
  { value: 'estetica', label: 'Estética' },
  { value: 'outro', label: 'Outro' },
]

export default function GaleriaAdminPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState('cabelo')
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => { loadPhotos() }, [])

  async function loadPhotos() {
    const data = await getGalleryPhotosAdmin()
    setPhotos(data as Photo[])
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  async function handleUpload() {
    if (!file) return
    setUploading(true)

    // Upload do arquivo
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()

    if (data.error) {
      alert(data.error)
      setUploading(false)
      return
    }

    // Salvar no banco
    const result = await addGalleryPhoto({
      imageUrl: data.url,
      caption,
      category,
    })

    if (result.error) {
      alert(result.error)
    } else {
      setFile(null)
      setPreview(null)
      setCaption('')
      loadPhotos()
    }
    setUploading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Remover esta foto da galeria?')) return
    await deleteGalleryPhoto(id)
    loadPhotos()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Galeria de Fotos</h1>

      {/* Upload form */}
      <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Foto</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* File input + preview */}
          <div>
            <label htmlFor="photo-file" className="block text-sm font-medium text-gray-700 mb-2">
              Imagem (JPG, PNG ou WebP — máx 5MB)
            </label>
            <input
              id="photo-file"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-pink-50 file:text-pink-600 file:font-medium hover:file:bg-pink-100 file:cursor-pointer"
            />
            {preview && (
              <div className="mt-3 relative w-40 h-40 rounded-xl overflow-hidden border border-pink-100">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Caption + Category */}
          <div className="space-y-3">
            <div>
              <label htmlFor="photo-caption" className="block text-sm font-medium text-gray-700 mb-1">Legenda</label>
              <input
                id="photo-caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Ex: Corte em camadas com luzes"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label htmlFor="photo-category" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select
                id="photo-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              aria-label="Enviar foto para galeria"
              className="bg-pink-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-pink-700 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {uploading ? 'Enviando...' : 'Publicar Foto'}
            </button>
          </div>
        </div>
      </div>

      {/* Photos grid */}
      <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Fotos Publicadas ({photos.length})
        </h2>

        {photos.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">Nenhuma foto publicada ainda.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group rounded-xl overflow-hidden aspect-square border border-pink-50">
                <img
                  src={photo.imageUrl}
                  alt={photo.caption || 'Foto da galeria'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <button
                    onClick={() => handleDelete(photo.id)}
                    aria-label="Remover foto"
                    className="self-end w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ✕
                  </button>
                  <div>
                    {photo.caption && <p className="text-white text-xs font-medium">{photo.caption}</p>}
                    <p className="text-white/70 text-xs mt-0.5">por {photo.professionalName}</p>
                    <span className="inline-block mt-1 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                      {categories.find(c => c.value === photo.category)?.label || photo.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
