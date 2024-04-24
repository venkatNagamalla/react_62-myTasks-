import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Task from '../Task'
import './index.css'

class TaskContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagsList: props.tagsList,
      task: '',
      tag: props.tagsList[0].optionId,
      tasksList: [],
      activeTab: '',
    }
  }

  onAddTask = e => {
    e.preventDefault()
    const {task, tag, tagsList} = this.state

    const newTask = {
      id: uuidv4(),
      task,
      tag,
    }
    if (task !== '') {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        task: '',
        tag: tagsList[0].optionId,
      }))
    }
  }

  renderFormItems = () => {
    const {tagsList, task, tag} = this.state

    return (
      <form onSubmit={this.onAddTask} className="form-container">
        <div className="input-container">
          <label htmlFor="task">Task</label>
          <input
            onChange={e => this.setState({task: e.target.value})}
            value={task}
            placeholder="Enter the task here"
            type="text"
            id="task"
          />
        </div>
        <div className="input-container">
          <label htmlFor="tags">Tags</label>
          <select
            onChange={e => this.setState({tag: e.target.value})}
            id="tags"
            value={tag}
          >
            {tagsList.map(eachTag => (
              <option value={eachTag.optionId} key={eachTag.optionId}>
                {eachTag.displayText}
              </option>
            ))}
          </select>
        </div>
        <button className="sub-btn" type="submit">
          Add Task
        </button>
      </form>
    )
  }

  renderTaskContainer = () => (
    <div className="create-task-container">
      <h1 className="create-task-heading">Create a task!</h1>
      {this.renderFormItems()}
    </div>
  )

  onTabClick = id => {
    this.setState(prevState => ({
      activeTab: prevState.activeTab === id ? '' : id,
    }))
  }

  renderTabs = () => {
    const {tagsList, activeTab} = this.state
    return (
      <ul className="tabs-container">
        {tagsList.map(eachTag => {
          const btnStyle =
            eachTag.optionId === activeTab
              ? 'active-tab btn'
              : 'not-active-tab btn'

          return (
            <li className="tab" key={eachTag.optionId}>
              <button
                onClick={() => this.onTabClick(eachTag.optionId)}
                className={btnStyle}
                type="button"
              >
                {eachTag.displayText}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  renderTasks = filteredTasks => (
    <ul className="list-container">
      {filteredTasks.map(eachTask => (
        <Task key={eachTask.id} taskDetails={eachTask} />
      ))}
    </ul>
  )

  renderMsg = () => (
    <div className="msg-container">
      <p className="msg">No Tasks Added Yet</p>
    </div>
  )

  renderResult = () => {
    const {tasksList, activeTab} = this.state
    const filteredTasks =
      activeTab === ''
        ? tasksList
        : tasksList.filter(eachTask => eachTask.tag === activeTab)
    return filteredTasks.length === 0
      ? this.renderMsg()
      : this.renderTasks(filteredTasks)
  }

  renderTagsContainer = () => (
    <div className="tags-container">
      <h1 className="tags-heading">Tags</h1>
      {this.renderTabs()}
      <h1 className="tags-heading">Tasks</h1>
      {this.renderResult()}
    </div>
  )

  render() {
    return (
      <div className="main-container">
        {this.renderTaskContainer()}
        {this.renderTagsContainer()}
      </div>
    )
  }
}

export default TaskContainer
