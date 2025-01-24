import React, { useState,useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaKey, FaTrash, FaUserPlus, FaTimes, FaRandom } from 'react-icons/fa';

const ManageMods = () => {


    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasskeyModalOpen, setIsPasskeyModalOpen] = useState(false);
    const [selectedPasskey, setSelectedPasskey] = useState('');
    const [newModeratorData, setNewModeratorData] = useState({
        name: '',
        number: '',
        email: '',
        passkey: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        number: '',
        email: ''
    });
    const [copyStatus, setCopyStatus] = useState('');

    // Validation functions
    const validateName = (name) => {
        if (name.length < 3) {
            return 'Name must be at least 3 characters long';
        }
        if (!/^[a-zA-Z\s]*$/.test(name)) {
            return 'Name should only contain letters and spaces';
        }
        return '';
    };

    const validatePhone = (phone) => {
        const indianPhoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
        if (!indianPhoneRegex.test(phone)) {
            return 'Please enter a valid Indian phone number';
        }
        return '';
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const handleInputChange = (field, value) => {
        setNewModeratorData({ ...newModeratorData, [field]: value });
        
        // Validate on change
        let error = '';
        switch (field) {
            case 'name':
                error = validateName(value);
                break;
            case 'number':
                error = validatePhone(value);
                break;
            case 'email':
                error = validateEmail(value);
                break;
            default:
                break;
        }
        setErrors({ ...errors, [field]: error });
    };

    const generatePasskey = () => {
        if (!newModeratorData.name) {
            setErrors({ ...errors, name: 'Please enter a name first' });
            return;
        }

        // Get first letter and last letter of each word in name
        const nameLetters = newModeratorData.name
            .split(' ')
            .map(word => word.charAt(0) + word.charAt(word.length - 1))
            .join('')
            .toUpperCase();

        // Generate random string
        const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
        
        // Generate random number
        const randomNumber = Math.floor(1000 + Math.random() * 9000);

        // Combine all parts
        const passkey = `${nameLetters}-${randomString}-${randomNumber}`;
        
        setNewModeratorData({ ...newModeratorData, passkey });
    };

    const handleSubmitNewModerator = () => {
        // Validate all fields
        const nameError = validateName(newModeratorData.name);
        const numberError = validatePhone(newModeratorData.number);
        const emailError = validateEmail(newModeratorData.email);

        setErrors({
            name: nameError,
            number: numberError,
            email: emailError
        });

        // Check if there are any errors
        if (nameError || numberError || emailError || !newModeratorData.passkey) {
            if (!newModeratorData.passkey) {
                alert('Please generate a passkey');
            }
            return;
        }

        // Proceed with submission
        console.log('Add new moderator:', newModeratorData);
        setIsModalOpen(false);
        setNewModeratorData({ name: '', number: '', email: '', passkey: '' });
        setErrors({ name: '', number: '', email: '' });
    };

    const handleViewPasskey = (passkey) => {
        setSelectedPasskey(passkey);
        setIsPasskeyModalOpen(true);
    };

    const handleCopyPasskey = async () => {
        try {
            await navigator.clipboard.writeText(selectedPasskey);
            setCopyStatus('Copied!');
            setTimeout(() => setCopyStatus(''), 2000);
        } catch (err) {
            setCopyStatus('Failed to copy');
            setTimeout(() => setCopyStatus(''), 2000);
        }
    };

    // Dummy data for demonstration
    const moderators = [
        { id: 1, name: 'John Doe', number: '+1234567890', email: 'john@example.com', passkey: 'JN-DE-X7K9-4521' },
        { id: 2, name: 'Jane Smith', number: '+1987654321', email: 'jane@example.com', passkey: 'JE-SH-L9M2-7832' },
        { id: 3, name: 'Mike Johnson', number: '+1122334455', email: 'mike@example.com', passkey: 'ME-JN-P4Q7-1234' },
        { id: 4, name: 'Sarah Wilson', number: '+1555666777', email: 'sarah@example.com', passkey: 'SH-WN-R5S8-5678' },
        { id: 5, name: 'Tom Brown', number: '+1999888777', email: 'tom@example.com', passkey: 'TM-BN-T6U9-9012' },
        { id: 6, name: 'Emily Davis', number: '+1777888999', email: 'emily@example.com', passkey: 'EY-DS-V7W1-3456' },
        { id: 7, name: 'David Lee', number: '+1444555666', email: 'david@example.com', passkey: 'DD-LE-X8Y2-7890' },
    ];

    // Filter moderators based on search term
    const filteredModerators = moderators.filter(mod => 
        mod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mod.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mod.number.includes(searchTerm)
    );

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredModerators.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredModerators.length / itemsPerPage);

    const handleChangePasskey = (id) => {
        // Implement passkey change logic
        console.log('Change passkey for moderator:', id);
    };

    const handleRemoveModerator = (id) => {
        // Implement remove moderator logic
        console.log('Remove moderator:', id);
    };

    const handleAddModerator = () => {
        setIsModalOpen(true);
    };

    // Animation variants
    const tableRowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const staggeredTableVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                type: "spring",
                duration: 0.5,
                bounce: 0.3
            }
        },
        exit: { 
            opacity: 0, 
            scale: 0.8,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full sm:w-64">
                        <motion.input
                            type="text"
                            placeholder="Search moderators..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            initial={{ scale: 1 }}
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddModerator}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <FaUserPlus />
                        <span>Add New Moderator</span>
                    </motion.button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700">
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 w-1/4">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 w-1/4">Number</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 w-1/4">Email</th>
                                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100 w-1/4">Actions</th>
                            </tr>
                        </thead>
                        <motion.tbody
                            variants={staggeredTableVariants}
                            initial="hidden"
                            animate="visible"
                            className="divide-y divide-gray-200 dark:divide-gray-700"
                        >
                            <AnimatePresence mode="wait">
                                {currentItems.map((moderator, index) => (
                                    <motion.tr
                                        key={moderator.id}
                                        variants={tableRowVariants}
                                        className={`${
                                            index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                                        }`}
                                    >
                                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{moderator.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{moderator.number}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{moderator.email}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex items-center justify-end gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleViewPasskey(moderator.passkey)}
                                                    className="px-3 py-1.5 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                                                >
                                                    <FaKey size={14} />
                                                    <span>View Passkey</span>
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleRemoveModerator(moderator.id)}
                                                    className="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                                                >
                                                    <FaTrash size={14} />
                                                    <span>Remove</span>
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </motion.tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-center items-center gap-2 mt-6"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
                        >
                            Previous
                        </motion.button>
                        <AnimatePresence mode="wait">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <motion.button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded-md ${
                                        currentPage === page
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {page}
                                </motion.button>
                            ))}
                        </AnimatePresence>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
                        >
                            Next
                        </motion.button>
                    </motion.div>
                )}
            </div>

            {/* Add New Moderator Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative z-10"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Moderator</h2>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setNewModeratorData({ name: '', number: '', email: '', passkey: '' });
                                        setErrors({ name: '', number: '', email: '' });
                                    }}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <FaTimes size={20} />
                                </motion.button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newModeratorData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            errors.name ? 'border-red-500' : 'dark:border-gray-700'
                                        } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter moderator name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={newModeratorData.number}
                                        onChange={(e) => handleInputChange('number', e.target.value)}
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            errors.number ? 'border-red-500' : 'dark:border-gray-700'
                                        } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter phone number"
                                    />
                                    {errors.number && (
                                        <p className="mt-1 text-sm text-red-500">{errors.number}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={newModeratorData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            errors.email ? 'border-red-500' : 'dark:border-gray-700'
                                        } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter email address"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Passkey
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newModeratorData.passkey}
                                            readOnly
                                            className="w-full px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Generated passkey"
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={generatePasskey}
                                            className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2"
                                        >
                                            <FaRandom />
                                            Generate
                                        </motion.button>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmitNewModerator}
                                    className="w-full mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                                >
                                    <FaUserPlus />
                                    Add Moderator
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Passkey View Modal */}
            <AnimatePresence>
                {isPasskeyModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black"
                            onClick={() => {
                                setIsPasskeyModalOpen(false);
                                setCopyStatus('');
                            }}
                        />
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm relative z-10"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Moderator Passkey</h2>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                        setIsPasskeyModalOpen(false);
                                        setCopyStatus('');
                                    }}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <FaTimes size={20} />
                                </motion.button>
                            </div>
                            <div className="mt-4">
                                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-xl font-mono text-gray-900 dark:text-gray-100">
                                            {selectedPasskey}
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleCopyPasskey}
                                            className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                                        >
                                            <FaKey size={14} />
                                            <span>Copy</span>
                                        </motion.button>
                                    </div>
                                    {copyStatus && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className={`mt-2 text-sm text-center ${
                                                copyStatus === 'Copied!' ? 'text-green-500' : 'text-red-500'
                                            }`}
                                        >
                                            {copyStatus}
                                        </motion.p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ManageMods;