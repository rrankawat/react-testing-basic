import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, reset } from './counterSlice'

const Counter = () => {
  const dispatch = useDispatch()
  const count = useSelector(state => state.counter.value)

  return (
    <>
      <h1 data-testid='count'>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </>
  )
}

export default Counter
