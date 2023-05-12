let seccion = document.getElementById("cartas")

function armarTarjeta(objeto){
    return `<div class="row row-cols-1 row-cols-md-1 g-4" >
                <div class="col">
                  <div class="card">
                    <img src=${objeto.image} alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${objeto.name}</h5>
                      <p class="card-text">${objeto.description}</p>
                      <a href="./information.html?id=${objeto._id}" class="btn btn-primary ">More Information</a>
                    </div>
                </div>
            </div>
            </div>`
}

function asignar(lista){
    let template = ""
    for (let eventos of lista) {
        template += armarTarjeta(eventos)
    }
    seccion.innerHTML = template
}

let eventos = data.events
let cajasFiltradas = eventos 
asignar(eventos)

let cajas = document.getElementById("box")

let categorias = eventos.map( categoria => categoria.category).filter( (category,index,array) => array.indexOf(category) == index )

let funcionReduce = (acum, actual,indice, array) => {
  return acum += `<div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="${actual}-${indice}" value="${actual}">
                  <label class="form-check-label" for="${actual}-${indice}">${actual}</label>
                  </div>`
}


 
let template = categorias.reduce(funcionReduce, "")

cajas.innerHTML = template

cajas.addEventListener ("change", () =>{
  let cajasMarcadas = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`))
  let categoriasSeleccionadas = cajasMarcadas.map(caja => caja.value);
  let cajasFiltradas = filtrarCategorias(eventos, categoriasSeleccionadas)
  asignar(cajasFiltradas)
})

function filtrarCategorias(eventos,categorias){
  if(categorias.length === 0){
    return eventos
  }
  return eventos.filter( evento => categorias.includes(evento.category))
}  

let barraBusqueda = document.getElementById("busqueda")

barraBusqueda.addEventListener ("input", () =>{
  let cajasMarcadas = Array.from(document.querySelectorAll(`input[type="checkbox"]:checked`))
  let categoriasSeleccionadas = cajasMarcadas.map(caja => caja.value)
  let eventosFiltrados = filtrarCategorias(eventos, categoriasSeleccionadas)
  let filtrarBusqueda = filtroNombre(eventosFiltrados, barraBusqueda.value)
  asignar(filtrarBusqueda)
})

function filtroNombre(eventos, busqueda){
  return eventos.filter( evento => evento.name.toLowerCase().includes( busqueda.toLowerCase()))
}
