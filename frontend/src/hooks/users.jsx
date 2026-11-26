import { useEffect, useState } from 'react'
import axios from 'axios'

const User = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users/1',
          { signal: controller.signal },
        )
        setUser(response.data)
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          const errorMessage = axios.isAxiosError(fetchError)
            ? typeof fetchError.response?.data?.message === 'string'
              ? fetchError.response.data.message
              : fetchError.message
            : fetchError instanceof Error
              ? fetchError.message
              : 'Could not load user.'
          setError(errorMessage)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchUser()
    return () => controller.abort()
  }, [])

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-live="polite">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">User</h2>
      {isLoading && <p className="text-slate-600">Loading user...</p>}
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {user && (
        <div className="space-y-2 text-slate-700">
          <p><span className="font-medium text-slate-900">Name:</span> {user.name}</p>
          <p><span className="font-medium text-slate-900">Email:</span> {user.email}</p>
          <p><span className="font-medium text-slate-900">Phone:</span> {user.phone}</p>
          <p><span className="font-medium text-slate-900">Website:</span> {user.website}</p>
          <p><span className="font-medium text-slate-900">Company:</span> {user.company.name}</p>
        </div>
      )}
    </section>
  )
}

export default User