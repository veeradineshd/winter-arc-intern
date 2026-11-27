import { useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import About from './hooks/pages/About.jsx'
import Home from './hooks/pages/Home.jsx'

const App = () => {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'React Demo | Frontend'

    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <nav aria-label="Main navigation" className="flex gap-4">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-violet-700'
                : 'text-slate-600 hover:text-violet-700'
            }
            end
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-violet-700'
                : 'text-slate-600 hover:text-violet-700'
            }
            to="/about"
          >
            About
          </NavLink>
        </nav>

        <header className="bg-blue-700 px-4 py-2 text-right text-xl font-semibold text-white">
          App
        </header>

        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route
            element={
              <main className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-xl font-semibold text-slate-900">
                  Page not found
                </h1>
                <NavLink className="mt-3 inline-block text-violet-700" to="/">
                  Return home
                </NavLink>
              </main>
            }
            path="*"
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
