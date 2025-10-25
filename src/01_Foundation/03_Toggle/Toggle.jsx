import { useState } from 'react'

const Toggle = () => {
  const [isShow, setIsShow] = useState(false)

  return (
    <>
      {isShow && <p>Hello World!</p>}
      <button onClick={() => setIsShow(!isShow)}>
        {isShow ? 'Hide' : 'Show'}
      </button>
    </>
  )
}

export default Toggle
