
    // ------------------------------------------//
    // ----------- VARIABLES GLOBALES -----------//
    // ------------------------------------------//

let arrayConProductos= [];

const btnAMD = document.getElementById('amd');
const btnIntel = document.getElementById('intel');
const btnAmbos = document.getElementById('ambos');

    
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
    //TRAE EL JSON Y LO MUESTRA EN EL INDEX.HTML
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
                        <button id="${producto.id}" value="${producto.id}" class="buttonClass">Añadir</button>
                        <p class="card-precio">$ ${producto.valor} ARS</p>
                    </div>
                </div>
            </div>
            `;
            row.appendChild(col)
            contador++;
        })
        botonesEventos(data);
        
    })
    
}

     //AÑADE EVENTOS A LOS BOTONES GENERADOS DESDE LA FUNCION RENDER JSON
function botonesEventos(data) {
    let botones = document.querySelectorAll('.buttonClass')
    console.log(botones);
    for (let i = 0; i < botones.length; i++) {
        
        botones[i].addEventListener('click', function() {
            data.forEach(producto => {
                producto.id == botones[i].id && arrayConProductos.push(producto);
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Producto añadido al carrito',
                    showConfirmButton: false,
                    timer: 1000
                })
                sumarProducto()
            });
        });
}
}

function sumarProducto() {
    let badge = document.getElementById("contadorProductos")
        badge.textContent = arrayConProductos.length;
}


