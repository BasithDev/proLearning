import React from 'react'
import { motion } from 'framer-motion'
import { FaUsersCog, FaBookOpen, FaChartLine } from 'react-icons/fa'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Topics',
      value: '24',
      icon: <FaBookOpen className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      change: '+12%'
    },
    {
      title: 'Active Moderators',
      value: '8',
      icon: <FaUsersCog className="w-6 h-6 text-green-500 dark:text-green-400" />,
      change: '+2'
    },
    {
      title: 'User Engagement',
      value: '89%',
      icon: <FaChartLine className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
      change: '+5%'
    }
  ]

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                {stat.icon}
              </div>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                {stat.change}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {stat.title}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[
            { action: 'New topic added', subject: 'Advanced JavaScript Concepts', time: '2 hours ago' },
            { action: 'Moderator added', subject: 'Sarah Johnson', time: '5 hours ago' },
            { action: 'Topic updated', subject: 'React Fundamentals', time: '1 day ago' }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {activity.action}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.subject}
                </p>
              </div>
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {activity.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard