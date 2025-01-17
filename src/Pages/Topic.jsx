import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const useResponsiveGrid = () => {
  const [itemsPerPage, setItemsPerPage] = useState(9)

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth
      if (width < 640) { // mobile
        setItemsPerPage(6)
      } else if (width < 1024) { // tablet
        setItemsPerPage(9)
      } else { // desktop
        setItemsPerPage(12)
      }
    }

    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  return itemsPerPage
}

const Topic = () => {
  const { topic } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = useResponsiveGrid()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newConcepts, setNewConcepts] = useState('')
  const [conceptsData, setConceptsData] = useState([
    {
      id: 1,
      concepts: ['Variables', 'let', 'const', 'var', 'Scope'],
      postedDate: '2025-01-15'
    },
    {
      id: 2,
      concepts: ['Data Types', 'String', 'Number', 'Boolean', 'null', 'undefined'],
      postedDate: '2025-01-16'
    },
    {
      id: 3,
      concepts: ['Arrays', 'push', 'pop', 'map', 'filter', 'reduce'],
      postedDate: '2025-01-16'
    },
    {
      id: 4,
      concepts: ['Promises', 'async/await', 'then', 'catch', 'finally'],
      postedDate: '2025-01-17'
    },
    {
      id: 5,
      concepts: ['Functions', 'arrow functions', 'callbacks', 'parameters'],
      postedDate: '2025-01-17'
    },
    {
      id: 6,
      concepts: ['Objects', 'properties', 'methods', 'this keyword'],
      postedDate: '2025-01-17'
    },
    {
      id: 7,
      concepts: ['DOM', 'selectors', 'events', 'manipulation'],
      postedDate: '2025-01-17'
    }
  ])

  const capitalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1)
  
  // Pagination logic
  const totalPages = Math.ceil(conceptsData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentConcepts = conceptsData.slice(startIndex, endIndex)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleAddConcepts = () => {
    if (!newConcepts.trim()) return

    // Split the concepts by new line and filter out empty lines
    const conceptsList = newConcepts
      .split('\n')
      .map(concept => concept.trim())
      .filter(concept => concept.length > 0)

    if (conceptsList.length === 0) return

    // Create new concept object
    const newConceptObject = {
      id: conceptsData.length + 1,
      concepts: conceptsList,
      postedDate: new Date().toISOString().split('T')[0]
    }

    // Update the concepts data
    setConceptsData(prevData => [newConceptObject, ...prevData])
    
    // Clear the form and close modal
    setNewConcepts('')
    setIsModalOpen(false)
    
    // Go to first page to see the new concept
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            {capitalizedTopic}
          </h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center"
          >
            Add Concepts
          </button>
        </div>
        <hr className="mb-8" />

        {/* Regular Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentConcepts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 h-[280px] flex flex-col"
            >
              <div className="flex justify-end mb-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(item.postedDate).toLocaleDateString()}
                </div>
              </div>
              <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
                <div className="space-y-2">
                  {item.concepts.map((concept, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-gray-400 mr-2 flex-shrink-0">-</span>
                      <span className="text-gray-700 dark:text-gray-300">{concept}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <motion.button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  currentPage === pageNumber
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {pageNumber}
              </motion.button>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black"
                onClick={() => setIsModalOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="fixed inset-0 flex items-center justify-center p-4 z-50"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl w-full max-w-md relative">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Add New Concepts</h2>
                  <textarea
                    value={newConcepts}
                    onChange={(e) => setNewConcepts(e.target.value)}
                    placeholder="Enter concepts (one per line)..."
                    className="w-full px-3 py-2 mb-4 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 min-h-[200px] resize-none custom-scrollbar"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleAddConcepts}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Topic