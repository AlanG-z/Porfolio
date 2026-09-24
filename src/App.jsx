import './App.css'
import Header from './components/Header'
import SobreMi from './components/SobreMi'
import Footer from './components/Footer'
import Proyectos from './components/Proyectos'
import Tecnologias from './components/Tecnologias'
import Educacion from './components/Educacion'
import HabilidadesBlandas from './components/HabilidadesBlandas'
import Contacto from './components/Contacto'
import PortfolioBot from './components/PortfolioBot'
import { useTheme } from './hooks/useTheme'


function App() {
  const { theme, toggle } = useTheme()

  return (
      <div className="app">

        <Header theme={theme} onToggleTheme={toggle} />
        <SobreMi/>
        <Proyectos/>
        <Tecnologias/>
        <Educacion />
        <HabilidadesBlandas />
        <Contacto />
        <Footer />
        <PortfolioBot />
      </div>
  )
}

export default App
