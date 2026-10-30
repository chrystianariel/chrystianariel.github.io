import { Navigate, Route, Routes } from 'react-router-dom'
import SmoothScroll from './lib/SmoothScroll'
import Cursor from './components/Cursor'
import Header from './components/Header'
import Footer from './components/Footer'
import PageCurtain from './components/PageCurtain'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import About from './pages/About'

export default function App() {
  return (
    <>
      <SmoothScroll />
      <PageCurtain />
      <Cursor />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
