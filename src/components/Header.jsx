import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Header = () => {
    const { isDarkMode, toggleTheme } = useTheme()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [topicSuggestion, setTopicSuggestion] = useState('')
    const [concepts, setConcepts] = useState('')

    const handleSuggest = () => {
        if (!topicSuggestion.trim() || !concepts.trim()) {
            toast.error('Please fill in all fields', {
                duration: 3000,
                style: {
                    background: isDarkMode ? '#1F2937' : '#fff',
                    color: isDarkMode ? '#fff' : '#000',
                }
            })
            return
        }
        toast.success('Your suggestion has been submitted! Admin or moderators will verify it soon.', {
            duration: 4000,
            style: {
                background: isDarkMode ? '#1F2937' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
            }
        })
        setTopicSuggestion('')
        setConcepts('')
        setIsDropdownOpen(false)
    }

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    }

    return (
        <div className="flex items-center justify-between shadow-md dark:bg-gray-800 transition-colors duration-200">
            <Toaster 
                position="top-center"
                toastOptions={{
                    className: 'dark:bg-gray-800 dark:text-white',
                }} 
            />
            <h1 className="m-3 text-4xl font-extrabold text-blue-900 dark:text-blue-400">Pro Learning</h1>
            <div className="flex items-center gap-4 m-3">
            <div className="relative">
                    <motion.button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        whileTap={{ scale: 0.7 }}
                        whileHover={{ scale: 1.2 }}
                        layout
                        transition={spring}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={isDarkMode ? "dark" : "light"}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isDarkMode ? (
                                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-gray-700 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                                    </svg>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                    <motion.div
                        className="absolute -inset-1 rounded-full bg-blue-100 dark:bg-blue-900 -z-10"
                        animate={{
                            scale: isDarkMode ? 1.1 : 0,
                            opacity: isDarkMode ? 0.3 : 0
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <div className="relative">
                    <motion.button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="px-4 py-2 text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-900 hover:text-white transition font-medium"
                        whileTap={{ scale: 0.95 }}
                        transition={spring}
                    >
                        ADD TOPIC
                    </motion.button>
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 p-4"
                            >
                                <input
                                    type="text"
                                    value={topicSuggestion}
                                    onChange={(e) => setTopicSuggestion(e.target.value)}
                                    placeholder="Enter topic name..."
                                    className="w-full px-3 py-2 mb-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                <textarea
                                    value={concepts}
                                    onChange={(e) => setConcepts(e.target.value)}
                                    placeholder="Enter concepts..."
                                    rows="10"
                                    className="w-full px-3 py-2 mb-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 resize-none custom-scrollbar"
                                />
                                <motion.button
                                    onClick={handleSuggest}
                                    className="w-full px-4 py-2 text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-900 hover:text-white transition font-medium"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Suggest
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default Header