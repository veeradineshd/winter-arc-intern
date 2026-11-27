import Student from '../../components/Student.jsx'
import Register from '../Register.jsx'
import Counter from '../count.jsx'
import User from '../users.jsx'

const Home = () => {
  return (
    <main className="space-y-8">
      <Register />
      <Counter />
      <User />
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <Student name="Veera Dinesh" />
      </section>
    </main>
  )
}

export default Home
