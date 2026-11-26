const Student = ({ name }) => {
  return (
    <div className="mb-6 text-slate-700">
      <h2 className="mb-2 text-xl font-semibold text-slate-900">Student</h2>
      <p className="mb-1">
        Hey, I am Sheru Bhai, king of the world.
      </p>
      <p>Student name: {name}</p>
    </div>
  )
}

export default Student
