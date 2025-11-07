import { useState } from 'react'

const Feedback = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    if (!name || !feedback || !rating) {
      setError('All fields are required!')
      return
    }

    onSubmit({ name, feedback, rating })
    setName('')
    setFeedback('')
    setRating('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Feeback</h2>

      {error && <p role='alert'>{error}</p>}

      <label htmlFor='name'>Name:</label>
      <input
        type='text'
        name='name'
        id='name'
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <label htmlFor='feedback'>Feedback:</label>
      <textarea
        name='feedback'
        id='feedback'
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
      ></textarea>

      <label htmlFor='rating'>Rating:</label>
      <select
        name='rating'
        id='rating'
        value={rating}
        onChange={e => setRating(e.target.value)}
      >
        <option value=''>select</option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </select>

      <button type='submit'>Submit Feedback</button>
    </form>
  )
}

export default Feedback
