import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './Pages/Home'
import Topic from './Pages/Topic'
import Admin from './Pages/Admin'
import AdminDashboard from './Pages/AdminDashboard'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

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
            <Route path="/admin/dashboard" element={<Layout><AdminDashboard /></Layout>} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
