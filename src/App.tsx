import { useState } from 'react'
import './App.css'

interface Task {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')

  const addTask = () => {
    if (inputValue.trim() === '') return

    const newTask: Task = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }

    setTasks([...tasks, newTask])
    setInputValue('')
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const startEditing = (task: Task) => {
    setEditingId(task.id)
    setEditingText(task.text)
  }

  const saveEdit = () => {
    if (editingText.trim() === '') return

    setTasks(tasks.map(task =>
      task.id === editingId ? { ...task, text: editingText } : task
    ))
    setEditingId(null)
    setEditingText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText('')
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action()
    }
  }

  const completedCount = tasks.filter(task => task.completed).length
  const totalCount = tasks.length

  return (
    <div className="app-container">
      <div className="todo-card">
        <div className="header">
          <h1 className="title">
            <span className="icon">✓</span>
            Task Master
          </h1>
          <p className="subtitle">Stay organized, get things done</p>
        </div>

        <div className="stats">
          <div className="stat-item">
            <span className="stat-value">{totalCount}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">{totalCount - completedCount}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>

        <div className="input-container">
          <input
            type="text"
            className="task-input"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addTask)}
          />
          <button className="add-button" onClick={addTask}>
            <span className="plus-icon">+</span>
            Add Task
          </button>
        </div>

        <div className="tasks-container">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <p className="empty-text">No tasks yet</p>
              <p className="empty-subtext">Add your first task to get started!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                {editingId === task.id ? (
                  <div className="edit-container">
                    <input
                      type="text"
                      className="edit-input"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                      autoFocus
                    />
                    <div className="edit-actions">
                      <button className="save-btn" onClick={saveEdit}>
                        ✓
                      </button>
                      <button className="cancel-btn" onClick={cancelEdit}>
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="task-content">
                      <button
                        className="checkbox"
                        onClick={() => toggleComplete(task.id)}
                      >
                        {task.completed && <span className="checkmark">✓</span>}
                      </button>
                      <span className="task-text">{task.text}</span>
                    </div>
                    <div className="task-actions">
                      <button
                        className="edit-btn"
                        onClick={() => startEditing(task)}
                        title="Edit task"
                      >
                        ✎
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(task.id)}
                        title="Delete task"
                      >
                        🗑
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
