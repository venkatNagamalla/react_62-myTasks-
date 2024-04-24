import './index.css'

const Task = props => {
  const {taskDetails} = props
  console.log(taskDetails)
  const {tag, task} = taskDetails
  return (
    <li className="item">
      <p className="task">{task}</p>
      <p className="tag">
        {tag.slice(0, 1)}
        {tag.slice(1).toLowerCase()}
      </p>
    </li>
  )
}

export default Task
