import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    }

    return (
        <div className="flex items-center justify-between shadow-md">
            <h1 className="m-3 text-4xl font-extrabold text-blue-900">Pro Learning</h1>
            <div className="flex items-center gap-4 m-3">
                <div className="relative">
                    <motion.button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-2 rounded-full hover:bg-gray-100"
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
                                    <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                                    </svg>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                    <motion.div
                        className="absolute -inset-1 rounded-full bg-blue-100 -z-10"
                        animate={{
                            scale: isDarkMode ? 1.1 : 0,
                            opacity: isDarkMode ? 0.3 : 0
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <motion.button 
                    className="px-4 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition font-medium"
                    whileTap={{ scale: 0.95 }}
                    transition={spring}
                >
                    ADD TOPIC
                </motion.button>
            </div>
        </div>
    )
}

export default Header