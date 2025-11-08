import { useCounter } from './CounterContext'

const CounterDisplay = () => {
  const { count, increment, decrement } = useCounter()

  return (
    <div>
      <h3 data-testid='count'>Count: {count}</h3>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}

export default CounterDisplay
