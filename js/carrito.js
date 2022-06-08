const carro = document.getElementById("carro")

carro.addEventListener("click",()=>renderCarro())

const pagarMP = async () => {
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



function renderCarro() {
    const carroCanva = document.getElementById("carritoCanvaBody")
    const carroCanvaChildren = document.createElement ("div");


    
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

    const footerCanvaChildren = footerRender();

    const close = document.getElementById("close")
    close.addEventListener("click", () =>{
        carroCanvaChildren.remove();
        footerCanvaChildren.remove();
    })
}


function footerRender() {
    const footerCanva =  document.getElementById("carritoCanvaFooter")
    const footerCanvaChildren = document.createElement("div");
    footerCanva.className = "offcanvas-footer d-flex flex-column"
    
    const div = document.createElement("div");
    div.className ="divCanvaFooter";
    div.innerHTML = `
    <div class="d-flex justify-content-between">
    <p>Intel: ${buscar("INTEL")}</p>
    <p>AMD: ${buscar("AMD")}</p>
    <p>Articulos: ${arrayConProductos.length}</p>
    </div>
    <div>
    <p>Valor total del carrito: ${sumaEnArray()} ARS</p>
    </div>
    <div class="d-flex flex-column">
        <button id="pagar">Pagar con MercadoPago</button>
        <button>Vaciar Carrito</button>
    </div>
    `

    footerCanva.appendChild(footerCanvaChildren);
    footerCanvaChildren.appendChild(div);

    const pagar = document.getElementById("pagar");
    pagar.addEventListener("click", pagarMP);
    
    return footerCanvaChildren;
}

function sumaEnArray() {
    let sumador = 0;
    for (let i = 0; i < arrayConProductos.length; i++) {
        const element = arrayConProductos[i].valor;
        
        sumador += element;
    }

    return sumador;
}

function buscar(string) {
    let contador = 0;

    for (let i = 0; i < arrayConProductos.length; i++) {
        const element = arrayConProductos[i].fabricante;
        if (element === string) {
            contador++;
        }
        
    }
    console.log(contador);
    return contador;
}

