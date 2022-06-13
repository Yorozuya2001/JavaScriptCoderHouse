    // ------------------------------------------//
    // ----------- VARIABLES GLOBALES -----------//
    // ------------------------------------------//

let arrayConProductos= [];

const btnAMD = document.getElementById('amd');
const btnIntel = document.getElementById('intel');
const btnAmbos = document.getElementById('ambos');



    // ------------------------------------------//
    // --------------- FUNCION DE ---------------//
    // ---------------LOCAL STORAGE--------------//
    // ------------------------------------------//

    localStorageTraer() // Consigue el array con productos del local storage y lo reemplaza (si este existe en el local storage)

function localStorageTraer() {
    const arrayLS = JSON.parse(localStorage.getItem("CarritoDeCompras")) || false;

    if (arrayLS != false) {
        arrayConProductos = arrayLS;
        acumuladorProducto();
        
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        
        Toast.fire({
            title: '¡Hola de nuevo!Tienes un pedido pendiente en tu carrito.'
            })
    }
}


    
    // ------------------------------------------//
    // ---------------- EVENTOS ---------------//
    // ------------------------------------------//

btnAMD.addEventListener("click",() => instrucciones('../json/amd-items.json'));

btnIntel.addEventListener("click",() => instrucciones ('../json/intel-items.json'));

btnAmbos.addEventListener("click", () => instrucciones ('../json/ambos-items.json'))

    // ------------------------------------------//
    // ---------------- FUNCIONES ---------------//
    // ------------------------------------------//


    //FUNCION QUE OBTIENE EL JSON LOCAL TIENE COMO PARAMETRO LA RUTA DEL ARCHIVO

function instrucciones(ubicacion) {
    remover('tienda-print');
    renderJson(ubicacion);
}

    //REMUEVE EL CONTENEDOR EN EL INDEX.HTML

function remover(id){
    const elemento = document.getElementById(id)
    elemento.remove();
}

    //TRAE EL JSON Y LO RENDERIZA EN INDEX.HTML CUANDO EL USUARIO HACE CLICK EN EL BOTON CON EL EVENTO INCORPORADO

function renderJson(ubicacion) {
    let row;
    const contenido = document.getElementById('contenido')

    const contenedor = document.createElement("div")
    contenedor.setAttribute("id", "tienda-print");

    const container = document.createElement("div")
    container.setAttribute("data-aos","fade-right")
    container.setAttribute("data-aos-duration","2000")
    container.className = "container" ;

    contenido.appendChild(contenedor)
    contenedor.appendChild(container)



    fetch(ubicacion)
    .then( (res) => res.json())
    .then( (data) => {

        let contador = 0;
    
        data.forEach((producto) => {

            if (contador == 0 || contador%3 == 0) {
                row = document.createElement("div");
                row.className = "row";
                container.appendChild(row)
            }
            const col = document.createElement("div")
            col.className = "col-sm-4 d-flex justify-content-center";
            col.innerHTML = `
            <div class="card my-3" style="width: 18rem; height:455.484px;">
                <img src="${producto.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.titulo}</h5>
                    <div class=" pt-5 d-flex justify-content-between align-items-center">
                        <button id="${producto.id}" value="${producto.id}">Añadir</button>
                        <p class="card-precio">$ ${producto.valor} ARS</p>
                    </div>
                </div>
            </div>
            `;
            row.appendChild(col)

            const button = document.getElementById(producto.id);
            if (producto.fabricante === "AMD") {
                button.className ="buttonClassAMD buttonQuery"
            }else{
                button.className ="buttonClassINTEL buttonQuery"
            }
            contador++;
        })
        botonesEventos(data);
        
    })
    
}

     //AÑADE EVENTOS A LOS BOTONES GENERADOS DESDE LA FUNCION RENDER JSON Y AÑADE ADÉMAS EL PRODUCTO A UN ARRAY Y UNA ALERTA QUE NOTIFICA QUE EL PRODUCTO SE AÑADIO AL CARRITO CUANDO EL USUASRIO HAGA CLICK EN AÑADIR
function botonesEventos(data) {
    let botones = document.querySelectorAll('.buttonQuery')
    for (let i = 0; i < botones.length; i++) {
        
        botones[i].addEventListener('click', function() {
            data.forEach(producto => {
                producto.id == botones[i].id && arrayConProductos.push(producto);
                
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                
                Toast.fire({
                    icon: 'success',
                    title: 'Procesador añadido al carrito'
                })
                acumuladorProducto()
            });
        });
}
}

// Indica la cantidad de productos añadidos al carrito sosteniendose de la longitud del array de productos lo muestra en la imagen del carrito
function acumuladorProducto() {
    let badge = document.getElementById("contadorProductos")
        badge.textContent = arrayConProductos.length;
}
