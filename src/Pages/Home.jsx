import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBar from '../components/searchBar/SearchBar'
import useDebounce from '../hooks/useDebounce'

const NoResultsFound = ({ searchQuery }) => (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="text-center py-8"
    >
        <div className="mb-4">
            <svg 
                className="w-16 h-16 mx-auto text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 21a9 9 0 110-18 9 9 0 010 18z" 
                />
            </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            No topics found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            We couldn't find any topics matching "{searchQuery}". 
            Try searching with different keywords or browse our available topics.
        </p>
    </motion.div>
)

const Home = () => {
    const allTopics = [
        {
            name: 'JavaScript',
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-800'
        },
        {
            name: 'Python',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-800'
        },
        {
            name: 'Node.js',
            bgColor: 'bg-green-100',
            textColor: 'text-green-800'
        },
        {
            name: 'MongoDB',
            bgColor: 'bg-emerald-100',
            textColor: 'text-emerald-800'
        },
        {
            name: 'SQL',
            bgColor: 'bg-indigo-100',
            textColor: 'text-indigo-800'
        },
        {
            name: 'React',
            bgColor: 'bg-cyan-100',
            textColor: 'text-cyan-800'
        },
        {
            name: 'TypeScript',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-800'
        },
        {
            name: 'Docker',
            bgColor: 'bg-sky-100',
            textColor: 'text-sky-800'
        },
        {
            name: 'AWS',
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-800'
        },
        {
            name: 'Git',
            bgColor: 'bg-red-100',
            textColor: 'text-red-800'
        },
        {
            name: 'Golang',
            bgColor: 'bg-green-100',
            textColor: 'text-green-800'
        },
        {
            name: 'Java',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-800'
        }
    ]

    const [visibleCount, setVisibleCount] = useState(5)
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 300)

    const filteredTopics = useMemo(() => {
        if (!debouncedSearchQuery.trim()) return allTopics
        
        const query = debouncedSearchQuery.toLowerCase()
        return allTopics.filter(topic => 
            topic.name.toLowerCase().includes(query)
        )
    }, [debouncedSearchQuery])

    const visibleTopics = useMemo(() => {
        return debouncedSearchQuery ? filteredTopics : filteredTopics.slice(0, visibleCount)
    }, [filteredTopics, visibleCount, debouncedSearchQuery])

    const hasMore = !debouncedSearchQuery && visibleCount < allTopics.length

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    }

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 5, allTopics.length))
    }

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                        What do you want to learn today?
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Explore our vast collection of topics and start learning at your own pace
                    </p>
                </div>
                
                <SearchBar onSearch={handleSearch} />

                <div className="min-h-[20px]">
                    <AnimatePresence mode="sync">
                        {visibleTopics.length > 0 ? (
                            <motion.div 
                                key="topics-grid"
                                variants={container}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                            >
                                {visibleTopics.map((topic) => (
                                    <motion.div
                                        key={topic.name}
                                        variants={item}
                                        className={`${topic.bgColor} rounded-lg p-4 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105`}
                                    >
                                        <h3 className={`text-lg font-semibold ${topic.textColor} text-center`}>
                                            {topic.name}
                                        </h3>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <NoResultsFound key="no-results" searchQuery={debouncedSearchQuery} />
                        )}
                    </AnimatePresence>
                </div>

                {hasMore && (
                    <motion.div 
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <button
                            onClick={handleLoadMore}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
                        >
                            Load More Topics
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    )
}

export default Home