import React from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa'

const ManageTopics = () => {
  const topics = [
    {
      id: 1,
      title: 'React Fundamentals',
      description: 'Learn the basics of React including components, props, and state',
      moderator: 'John Doe',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      description: 'Deep dive into JavaScript concepts like closures, promises, and async/await',
      moderator: 'Jane Smith',
      status: 'Draft'
    },
    {
      id: 3,
      title: 'Python for Beginners',
      description: 'Introduction to Python programming language',
      moderator: 'Mike Johnson',
      status: 'Active'
    }
  ]

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      {/* Add Topic Button */}
      <div className="mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors">
          <FaPlus />
          <span>Add New Topic</span>
        </button>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg dark:shadow-gray-900/10 transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {topic.title}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  topic.status === 'Active'
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}
              >
                {topic.status}
              </span>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {topic.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Moderator: {topic.moderator}
              </span>
              
              <div className="flex gap-3">
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors">
                  <FaEye size={18} />
                </button>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                  <FaEdit size={18} />
                </button>
                <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors">
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ManageTopics