import { useEffect, useState } from 'react'
import axios from 'axios'
import { z } from 'zod'

const registerApiUrl =
  import.meta.env.VITE_REGISTER_API_URL || 'http://localhost:5000/api/register'

const initialUser = {
  name: '',
  email: '',
  password: '',
}

const registerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
})

const Register = ({ children }) => {
  const [user, setUser] = useState(initialUser)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Create your account'

    return () => {
      document.title = previousTitle
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((currentUser) => ({ ...currentUser, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = registerSchema.safeParse(user)

    if (!result.success) {
      const nextErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0]
        if (typeof field === 'string' && !nextErrors[field]) {
          nextErrors[field] = issue.message
        }
      }
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setSubmitError('')
    setIsSubmitting(true)

    try {
      await axios.post(registerApiUrl, result.data)
      setUser(initialUser)
      window.alert('Registered successfully!')
    } catch (error) {
      const apiMessage = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined
      setSubmitError(
        typeof apiMessage === 'string'
          ? apiMessage
          : error instanceof Error
            ? error.message
            : 'Registration failed unexpectedly.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="w-full max-w-md space-y-6 text-left">
        {children}
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
          Create your account
        </h1>
        <p className="mb-8 text-sm text-slate-600">
          Enter your details below to register.
        </p>

        <form className="space-y-5" noValidate onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              autoComplete="name"
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={Boolean(errors.name)}
              className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-left text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-300"
              id="name"
              name="name"
              onChange={handleChange}
              placeholder="Your name"
              type="text"
              value={user.name}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-700" id="name-error" role="alert">
                {errors.name}
              </p>
            )}
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
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={Boolean(errors.email)}
              className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-left text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-300"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              type="email"
              value={user.email}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-700" id="email-error" role="alert">
                {errors.email}
              </p>
            )}
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
              aria-describedby={errors.password ? 'password-error' : undefined}
              aria-invalid={Boolean(errors.password)}
              className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-left text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-300"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="At least 8 characters"
              type="password"
              value={user.password}
            />
            {errors.password && (
              <p
                className="mt-2 text-sm text-red-700"
                id="password-error"
                role="alert"
              >
                {errors.password}
              </p>
            )}
          </div>

          <button
            className="h-12 w-full rounded-lg bg-violet-600 font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        {submitError && (
          <p className="mt-4 text-sm text-red-700" role="alert">
            {submitError}
          </p>
        )}
      </section>
    </main>
  )
}

export default Register