import React from 'react'

const Sidebar = ({onFilter}) => {
  return (
      <aside className="w-1/4 bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-6">Filters</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            onChange={(e) => onFilter("status", e.target.value)}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assignee
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            onChange={(e) => onFilter("assignee", e.target.value)}
          >
            <option value="">All</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Date
          </label>
          <div className="space-y-2">
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              placeholder="Start Date"
              onChange={(e) => onFilter("startDate", e.target.value)}
            />
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              placeholder="End Date"
              onChange={(e) => onFilter("endDate", e.target.value)}
            />
          </div>
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md mt-4"
          onClick={() => onFilter("reset", null)}
        >
          Reset Filters
        </button>
      </aside>
  )
}

export default Sidebar
