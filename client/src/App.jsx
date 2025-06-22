import { Routes, Route} from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import About from "./pages/About"
import NotFound from "./pages/404"
import Summarize from "./pages/Summarize"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summarize" element={<Summarize />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  )
}

export default App
