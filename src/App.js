import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks'
import AddTask from './components/AddTask';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './components/About';


function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }

  useEffect(() => {getTasks()}, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8000/api/tasks')
    const data = await res.json()
    return data.data
  }

  
  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:8000/api/tasks/${id}`)
    const data = await res.json()

    return data.data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:8000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data.data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.data.reminder } : task
      )
    )
  }
  
  return (
    <Router>
      <div className="container" >
        <Header title="yaman" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

        <Routes>
        <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                
                {tasks.length > 0 ? (<Tasks title="yaman" tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) 
                : ( 'No Tasks To Show')}
                {/* <Tasks title="yaman" tasks={tasks} onDelete={onDelete} onToggle={onToggle} /> */}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
