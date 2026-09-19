import './css/Seccion2.css'

function Proyectos() {
    return ( 
    <section className="seccion2" id="proyectos">
        <h2 className="section-title">Proyectos destacados</h2>
        <div className="seccion">
            <h3 className="titulo">Genesis</h3>
            <p className="tex-seccion">Genesis es una aplicación web de comercio electrónico de venta y compra, donde los usuarios 
pueden iniciar sesión, navegar por categorías, agregar al carrito y hacer seguimiento de sus 
órdenes . Cuenta también con un panel de administración para gestionar los pedidos de los 
usuarios y la creación, eliminación y actualización de productos.
</p>
        </div>
        <div className="seccion">
            <h3 className="titulo">¿Dónde estacioné?</h3>
            <p className="tex-seccion">Aplicación para registrar la ubicación del vehículo y encontrarlo rápidamente.</p>
        </div>
        <div className="seccion">
            <h3 className="titulo">Pendiente</h3>
            <p className="tex-seccion">Proyecto en desarrollo enfocado en resolver tareas cotidianas con una interfaz simple.</p>
        </div>
    </section>
     );
}

export default Proyectos;