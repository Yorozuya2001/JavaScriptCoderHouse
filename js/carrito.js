

//TOMA LA IMAGEN QUE SE MUESTRA EN EL HEADER Y LE AÑADIMOS UN EVENTO
const carro = document.getElementById("carro")
carro.addEventListener("click",()=>renderCarro())

    // ------------------------------------------//
    // ------------- FUNCIÓN ASYNC --------------//
    // --------------MERCADO PAGO----------------//
    //-------------------------------------------//

const pagarMP = async () => {
    
    //MAPEADO DE PRODUCTOS DEL ARRAY CON PRODUCTOS CON USO DE OBJETO
    const productosToMap = arrayConProductos.map(Element =>{
        let nuevoElemento = {
                    title: Element.fabricante,
                    description: Element.titulo,
                    picture_url: Element.imagen,
                    category_id: Element.id,
                    quantity: 1,
                    currency_id: "ARS",
                    unit_price: Element.valor
        }

        return nuevoElemento;
    })
    //LLAMAR A LA API
    let response = await fetch('https://api.mercadopago.com/checkout/preferences',{
        method: "POST",
        headers:{
            Authorization: "Bearer TEST-3657109204649175-060714-44f113b78d8cc9543419fcfccf4b2fd0-262917483"
        },
        body: JSON.stringify({
            items: productosToMap
        })
    })
    let data = await response.json()
    window.open(data.init_point,"_blank")
}

    // ------------------------------------------//
    // ---------------- FUNCIONES ---------------//
    // ------------------------------------------//

// RENDERIZA EN EL BODY  DEL OFFCANVAS DE BOOTSTRAP EL ARRAY CON PRODUCTOS AL HACER CLICK EN LA IMAGEN
function renderCarro() {
    
    arrayConProductos == 0 && mostrarMensajeGuardado();

    localStorageEnviar() // Enviar carrito a local storage para guardar datos
    
    const carroCanva = document.getElementById("carritoCanvaBody")      //Cuerpo del OFFCANVA
    const carroCanvaChildren = document.createElement ("div");          //Hijo del cuerpo del OFFCANVA
    
    carroCanvaChildren.setAttribute("id", "carritoCanvaChildren")      

    arrayConProductos.forEach ((item) => {
        const div = document.createElement("div");
        div.className = "d-flex flex-coolumn align-items-center justify-content-center"
        
        div.innerHTML = `
        <div class="card mb-3" style="max-width: 80%;">
            <div class="row g-0 ">
            <div class="col-md-4 d-flex flex-column align-items-center justify-content-center">
                <img src="${item.imagen}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body-canva">
                <h5 class="card-title">${item.titulo}</h5>
                <p class="card-precio">$ ${item.valor} ARS</p>
                </div>
            </div>
            </div>
        </div>`
        
        carroCanva.appendChild(carroCanvaChildren);
        carroCanvaChildren.appendChild(div);
    
    })

    const footerCanvaChildren = footerRender(); // Renderizamos el footer y lo guardamos en una variable para luego removerlo cuando el usuario salga del OFFCANVA
    const close = document.getElementById("close") // Variable  que le asignaremos una función que remueve  los elementos  del OFFCANVAS
    
    close.addEventListener("click", () =>{
        carroCanvaChildren.remove();
        footerCanvaChildren.remove();
    })
}

// RENDERIZA EN EL FOOTER DEL OFFCANVAS EL VALOR, LOS DETALLES DE LA COMPRA Y LOS BOTONES PARA PAGAR Y VACIAR EL CARRITO 
function footerRender() {
    const footerCanva =  document.getElementById("carritoCanvaFooter")
    const footerCanvaChildren = document.createElement("div");
    footerCanva.className = "offcanvas-footer d-flex flex-column"
    const div = document.createElement("div");
    div.className ="divCanvaFooter";
    div.innerHTML = `
    <div class="d-flex justify-content-between">
    <p id="intel-canva">Intel: ${buscar("INTEL")}</p>
    <p id="amd-canva">AMD: ${buscar("AMD")}</p>
    <p id="articulos-canva">Articulos: ${arrayConProductos.length}</p>
    </div>
    <div>
    <p id="valor-canva">Valor total del carrito: ${sumaEnArray()} ARS</p>
    </div>
    <div class="d-flex flex-column">
        <button id="pagar" class="buttonMP">Pagar con MercadoPago</button>
        <button id="vaciar"class="buttonVaciar">Vaciar Carrito</button>
    </div>
    `

    footerCanva.appendChild(footerCanvaChildren);
    footerCanvaChildren.appendChild(div);

    const pagar = document.getElementById("pagar");
    const vaciar = document.getElementById("vaciar");

    if (arrayConProductos.length === 0) {   //Si el array no contiene productos no se podrá pagar ni vaciar el carrito, apareceran en color gris
        removerID(pagar);
        addClass(pagar)
        removerID(vaciar)
        addClass(vaciar)
    }
    else{   // si el array contiene productos se añadiran eventos a los botones
        pagar.addEventListener("click", pagarMP);
        vaciar.addEventListener("click", () => vaciarCanva(pagar,vaciar));
    }


    return footerCanvaChildren; //retornamos el footer para removerlo en otra función 
}
// RECORRE EL ARRAY Y SUMA EL VALOR DE LOS PROCESADORES EN UNA VARIABLE Y LO RETORNA EN EL OFFCANVA FOOTER
function sumaEnArray() {
    let sumador = 0;
    for (let i = 0; i < arrayConProductos.length; i++) {
        const element = arrayConProductos[i].valor;
        
        sumador += element;
    }

    return sumador;
}
// RECORRE EL ARRAY CUENTA CUANTOS PROCESADORES HAY DE X FABRICANTE (POR MEDIO DEL PARAMETRO string) EN EL CARRITO
function buscar(string) {
    let contador = 0;

    for (let i = 0; i < arrayConProductos.length; i++) {
        const element = arrayConProductos[i].fabricante;
        if (element === string) {
            contador++;
        }
        
    }
    return contador;
}

//REMUEVE ID LO USAREMOS PARA EVITAR ERRORES DE COMPUTOS AL MANIPULAR EL OFFCANVA
function removerID(button) {
    button.removeAttribute("id");
}
// AÑADE LA CLASE CON VALORES EN GRISES A X BOTÓN 
function addClass(element) {
    element.className = "disabled"
    
}
// REESTABLECE EL OFFCANVAS FOOTER EN 0 Y AL ARRAY CON PRODCUTOS EN 0 , VACIA EL CANVAS BODY - OCULTA EL BOTÓN DE PAGAR Y DESHABILITA EL BOTÓN VACIAR
const vaciarCanva = (pagar,vaciar) =>{
    
    localStorageBorrar();

    const canvaBody = document.getElementById("carritoCanvaChildren")
    canvaBody.innerHTML = `
    <p>Carrito Vaciado</p>
    <p>Los prodcutos que añadiste han sido eliminados</p>
    `
    arrayConProductos = [];
    
    pagar.className = "d-none";
    addClass(vaciar);

    const intelCont = traerDeDom("intel-canva");
    const amdCont = traerDeDom ("amd-canva");
    const arituclosCont= traerDeDom ("articulos-canva");
    const valorTotalCarrito = traerDeDom("valor-canva");
    const contadorDeProductos = traerDeDom("contadorProductos")
    reestablecer(intelCont,"Intel: 0");
    reestablecer(amdCont,"AMD: 0");
    reestablecer(arituclosCont,"Articulos: 0");
    reestablecer(valorTotalCarrito,"Valor total del carrito: $0 ARS");
    reestablecer(contadorDeProductos,"0");

    
}

//TRAE LOS ELEMENTOS DEL OFFCANVAS FOOTER Y LOS RETORNA EN VACIARCANVA()
const traerDeDom = (string) =>{
    const elemento = document.getElementById(string)
    return elemento;
}
// REESTABLECE EL CONTENIDO DEL OFFCANVAS FOOTER
const reestablecer = (elemento,contenido) =>{
    elemento.textContent = contenido;
}

function localStorageEnviar() {
    console.log(arrayConProductos);
    arrayConProductos.length > 0 && localStorage.setItem("CarritoDeCompras",JSON.stringify(arrayConProductos))
}

function localStorageBorrar() {
    localStorage.removeItem("CarritoDeCompras")
}


function mostrarMensajeGuardado() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        
        Toast.fire({
            title: 'Los productos que elijas se guardaran en el almacenamiento local :).'
            })

}