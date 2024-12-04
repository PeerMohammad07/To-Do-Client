import { Sidebar } from "lucide-react";
import React from "react";

const TaskListing = ({ tasks, onEdit, onDelete, onFilter, addTask }) => {
  return (
    <main className="w-3/4 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Task List</h1>
        <button
          className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900"
          onClick={() => {
            addTask();
          }}
        >
          Add Task
        </button>
      </div>

      {/* Tasks */}
      <div className="grid grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{task.description}</p>
            <div className="text-sm text-gray-500 mb-4">
              <span className="block">Status: {task.status}</span>
              <span className="block">Assignee: {task.assignee}</span>
              <span className="block">Due: {task.dueDate}</span>
            </div>
            <div className="flex justify-end space-x-4 text-gray-600">
              <button
                className="hover:text-green-500"
                onClick={() => onEdit(task)}
              >
                <i className="fas fa-edit text-lg"></i>
              </button>
              <button
                className="hover:text-red-500"
                onClick={() => onDelete(task._id)}
              >
                <i className="fas fa-trash-alt text-lg"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TaskListing;
