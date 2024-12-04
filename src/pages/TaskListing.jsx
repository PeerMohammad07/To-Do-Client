import React from 'react'

const TaskListing = () => {
  const tasks = [
    {
      id: 1,
      title: "Design Project Wireframes",
      description: "Create initial UI mockups for the client dashboard with cutting-edge design principles",
      status: "Pending",
      assignee: "John Doe",
      dueDate: "2024-02-15",
      priority: "High",
      category: "Design"
    },
    {
      id: 2,
      title: "Backend API Development",
      description: "Implement advanced authentication and scalable task management endpoints",
      status: "In Progress",
      assignee: "Jane Smith",
      dueDate: "2024-02-20"
    },
    {
      id: 3,
      title: "Code Review & Optimization",
      description: "Deep dive into performance improvements and architectural refinements",
      status: "Completed",
      assignee: "Mike Johnson",
      dueDate: "2024-02-10"
    }
  ]

  return (
    <div className="task-listing bg-gray-100 p-6">
      <div className="grid grid-cols-1 gap-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-medium">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="bg-gray-200 px-2 py-1 rounded-full text-gray-600 text-sm">
                {task.status}
              </div>
              <div className="text-gray-500 text-sm">
                Assignee: {task.assignee}
              </div>
              <div className="text-gray-500 text-sm">
                Due: {task.dueDate}
              </div>
              {task.priority && (
                <div className="bg-yellow-200 px-2 py-1 rounded-full text-yellow-600 text-sm">
                  {task.priority}
                </div>
              )}
              {task.category && (
                <div className="bg-blue-200 px-2 py-1 rounded-full text-blue-600 text-sm">
                  {task.category}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
        Add Task
      </button>
    </div>
  )
}

export default TaskListing