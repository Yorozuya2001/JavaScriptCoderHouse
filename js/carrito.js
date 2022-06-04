const carro = document.getElementById("carro")

let carritoItems = {
    intel: 0,
    amd: 0,
    totalCpu: 0,
    valor: 0,
    impuestos: 0,
}

carro.addEventListener("click",()=>renderCarro())


function renderCarro() {
    const carroCanva = document.getElementById("carritoCanvaBody")
    const carroCanvaChildren = document.createElement ("div");
    
    arrayConProductos.forEach ((item) => {

        carritoData(item);
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

function carritoData(item) {
    switch (item.fabricante) {
        case "AMD":
            carritoItems.amd++;
            carritoItems.totalCpu++;
            carritoItems.valor += item.valor
            break;
        case "INTEL":
            carritoItems.intel++;
            carritoItems.totalCpu++;
            carritoItems.valor += item.valor
            break;
    }
}

function footerRender() {
    const footerCanva =  document.getElementById("carritoCanvaFooter")
    const footerCanvaChildren = document.createElement("div");
    footerCanva.className = "offcanvas-footer d-flex flex-column"
    
    const div = document.createElement("div");
    div.className ="divCanvaFooter";
    div.innerHTML = `
    <p>Procesadores Intel: ${carritoItems.intel}</p>
    <p>Procesadores AMD: ${carritoItems.amd}</p>
    <p>Total de procesadores: ${carritoItems.totalCpu}</p>
    <p>Valor total del carrito: $ ${carritoItems.valor}</p>
    <p>Valor de impuestos: $ ${carritoItems.valor * 0.21}</p>
    <div class="d-flex flex-column">
        <button>Pagar con MercadoPago</button>
        <button>Vaciar Carrito</button>
    </div>
    `

    footerCanva.appendChild(footerCanvaChildren);
    footerCanvaChildren.appendChild(div);
    return footerCanvaChildren;
}
