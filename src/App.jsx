import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './Pages/user/Home'
import Topic from './Pages/user/Topic'
import Admin from './Pages/admin/AdminLogin'
import AdminLayout from './components/Common/AdminLayout'
import Dashboard from './Pages/admin/Dashboard'
import ManageMods from './Pages/admin/ManageMods'
import ManageTopics from './Pages/admin/ManageTopics'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const Layout = ({ children }) => (
  <>
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </>
)

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/topic/:topic" element={<Layout><Topic /></Layout>} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<Layout><Admin /></Layout>} />
            <Route path="/admin/dashboard" element={<Layout><AdminLayout /></Layout>}>
              <Route index element={<Dashboard />} />
              <Route path="moderators" element={<ManageMods />} />
              <Route path="topics" element={<ManageTopics />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
