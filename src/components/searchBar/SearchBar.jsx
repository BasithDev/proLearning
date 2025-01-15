import { motion } from 'framer-motion'

const SearchBar = ({ onSearch }) => {
    return (
        <div className="max-w-xl w-full mx-auto">
            <motion.div 
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:shadow-lg"
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <svg 
                    className="w-5 h-5 text-gray-400 dark:text-gray-500"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search topics..."
                    className="flex-1 outline-none bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </motion.div>
        </div>
    )
}

export default SearchBar