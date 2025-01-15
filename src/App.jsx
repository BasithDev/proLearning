import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./Pages/Home"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Home />
      </div>
      <Footer />
    </div>
  )
}

export default App
