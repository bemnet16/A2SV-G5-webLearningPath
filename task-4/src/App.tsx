import { useState } from 'react';
import './App.css';

const initialTasks: { title: string, done: boolean, id: number }[] = [];
let taskId = 4;

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');

  const handleAddTask = (e: React.MouseEvent) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [
        ...prevTasks,
        { title: newTask, done: false, id: taskId },
      ]);
      setNewTask('');
      taskId++;
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditTaskId(id);
      setEditedTaskTitle(taskToEdit.title);
    }
  };

  const handleSaveEditedTask = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editTaskId ? { ...task, title: editedTaskTitle } : task
      )
    );
    setEditTaskId(null);
  };

  const handleDoTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="container">
        <h2>Task List</h2>
        <div className='add-task'>
      <input
        type="text"
        placeholder="Add task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        />
      <button className="add-btn" onClick={(e) => handleAddTask(e)}>Add</button>
        </div>

      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className={editTaskId === task.id ? 'editing' : ''}>
              {editTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedTaskTitle}
                    onChange={(e) => setEditedTaskTitle(e.target.value)}
                  />
                  <button className="edit-btn" onClick={() => handleSaveEditedTask()}>Save</button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    name={task.title}
                    checked={task.done}
                    onChange={() => handleDoTask(task.id)}
                  />
                  <p className={task.done? "task-done": ""}> {task.title}</p>
                  <button className="edit-btn" onClick={() => handleEditTask(task.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </>
              )}
            </li>
          ))
        ) : (
          <h4>No tasks yet</h4>
        )}
      </ul>
    </div>
  );
}

export default App;
