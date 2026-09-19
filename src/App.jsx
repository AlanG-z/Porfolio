import './App.css'
import Header from './components/Heder'
import SobreMi from './components/SobreMi'
import Footer from './components/Footer'
import Proyectos from './components/Proyectos'
import Tecnologias from './components/Tecnologias'
import Contacto from './components/Contacto'


function App() {

  return (
    <>
      <div className="app">

        <Header />
        <SobreMi/>
        <Proyectos/>
        <Tecnologias/>
        <Contacto />
        <Footer />
      </div>
    </>
  )
}

export default App
