import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = 'sEaKFdfZfxs5bqZw9YB31hoXmcvMIEumx7nbjBMcq1RWJ7L23SIqm292'

export default function RandomImage() {
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRandomImage = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get(
        'https://api.pexels.com/v1/search',
        {
          params: {
            query: 'landscape',
            per_page: 1,
            page: Math.floor(Math.random() * 1000)
          },
          headers: {
            Authorization: API_KEY
          }
        }
      )
      if (response.data.photos && response.data.photos.length > 0) {
        setImageUrl(response.data.photos[0].src.large)
      } else {
        throw new Error('No se encontraron imágenes')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomImage()
  }, [])

  return (
    <div className="random-image-container">
      <h1 className="title">Imagen Aleatoria</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <img src={imageUrl} alt="Paisaje aleatorio" className="random-image" />
      )}
      <button
        onClick={fetchRandomImage}
        className="fetch-button"
        disabled={isLoading}
      >
        Obtener Nueva Imagen
      </button>
    </div>
  )
}