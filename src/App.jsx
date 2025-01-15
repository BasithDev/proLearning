import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './Pages/Home'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
        <Header />
        <main className="flex-1">
          <Home />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
