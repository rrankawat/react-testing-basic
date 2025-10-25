import { useEffect, useState } from 'react'

const RandomDog = () => {
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(res => res.json())
      .then(data => {
        setImg(data.message)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load data')
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p role='alert'>{error}</p>

  return (
    <>
      <h1>Today's Dog!</h1>
      <img src={img} alt='Random Dog' />
    </>
  )
}

export default RandomDog
