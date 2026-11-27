import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)
  const [isToggled, setIsToggled] = useState(false)

  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xl text-slate-900">Count: {count}</p>
      <div className="flex flex-wrap gap-3">
        <button
          className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700"
          onClick={() => setCount((currentCount) => currentCount + 1)}
          type="button"
        >
          Increase
        </button>
        <button
          className="rounded-lg bg-fuchsia-100 px-4 py-2 font-semibold text-fuchsia-800 hover:bg-fuchsia-200"
          onClick={() => setCount(0)}
          type="button"
        >
          reset
        </button>
      </div>
      <button
        aria-pressed={isToggled}
        className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700"
        onClick={() => setIsToggled((currentValue) => !currentValue)}
        type="button"
      >
        Toggle
      </button>
      {isToggled && (
        <p className="text-slate-700" role="status">
          Toggled on
        </p>
      )}
    </section>
  )
}

export default Counter