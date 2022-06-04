const carro = document.getElementById("carro")

carro.addEventListener("click",()=>renderCarro())


function renderCarro() {
    const carroCanva = document.getElementById("carritoCanvaBody")
    
    arrayConProductos.forEach ((item) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card mb-3" style="max-width: 80%;">
            <div class="row g-0">
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

        carroCanva.appendChild(div);
    })
}

