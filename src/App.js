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
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1:30pm',
      reminder: true
    }
  ])

  // const tasks =[
  //     {
  //       id: 1,
  //       text: 'Doctors Appointment',
  //       day: 'Feb 5th at 2:30pm',
  //       reminder: true
  //     },
  //     {
  //       id: 2,
  //       text: 'Meeting at School',
  //       day: 'Feb 6th at 1:30pm',
  //       reminder: true
  //     }
  //   ]
    
    // Fetch Tasks
    const getTasks = () => {
      console.log('get')
    }
    
    
    // add Tasks
    const addTask = (task) => {
      const newtask = { id: 322,...task }
      setTasks([...tasks, newtask])
      console.log(task)
    }
    
    // delete task
    const onDelete = (id) => {
      setTasks(tasks.filter((task) => task.id !== id))
      console.log(`delete${id}`)
    }
    
    // toggle task
    const onToggle = (id) => {
      setTasks(tasks.map((task) =>task.id === id ? { ...task, reminder: !task.reminder } : task))
      console.log(`toggle${id}`)
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
                {tasks.length > 0 ? (<Tasks title="yaman" tasks={tasks} onDelete={onDelete} onToggle={onToggle} />) 
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
