"use client";
import { TaskState } from '@prisma/client';
import { useState, useEffect, ChangeEvent } from 'react';

interface Task {
    id: number;
    title: string;
    taskState: TaskState;
}

const categories: TaskState[] = ['TODO', 'INPROGRESS', 'DONE'];

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    fetch('/api/task')
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = async () => {
    if (newTask !== '') {
      const res = await fetch('/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTask,
          taskState: selectedCategory,
        }),
      });

      const newTaskData: Task = await res.json();
      setTasks((prevTasks) => [...prevTasks, newTaskData]);
      setNewTask('');
      setSelectedCategory(categories[0]); 
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value);
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value as TaskState);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="mb-4">
        <input
          type="text"
          className="border rounded p-2 mr-2"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleInputChange}
        />
        <select
          className="border rounded p-2 mr-2"
          value={selectedCategory}
          onChange={handleSelectChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white p-2 rounded" onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="text-xl font-bold mb-4">{category}</h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.taskState === category)
                .map((task) => (
                  <div key={task.id} className="bg-white p-4 rounded shadow">
                    <p className="text-sm font-medium">{task.title}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
