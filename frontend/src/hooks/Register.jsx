import { useState } from 'react'

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(user)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl sm:p-10">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
          Create your account
        </h1>
        <p className="mb-8 text-sm text-slate-600">
          Enter your details below to register.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              autoComplete="name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              id="name"
              name="name"
              onChange={handleChange}
              placeholder="Your name"
              required
              type="text"
              value={user.name}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              autoComplete="email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              required
              type="email"
              value={user.email}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              id="password"
              minLength={8}
              name="password"
              onChange={handleChange}
              placeholder="At least 8 characters"
              required
              type="password"
              value={user.password}
            />
          </div>

          <button
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            Register
          </button>
        </form>
      </section>
    </main>
  )
}

export default Register