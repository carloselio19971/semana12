let carritoCompras=document.querySelector("#carritoCompras");
let listaHamburgesas=document.querySelector("#lista-hamburgesas");
let listadoHamburgesas=[];
let contenedorCarritoCompras=document.querySelector("#carritoComprasLista tbody");
 cargandoEventos();

 function cargandoEventos(){
    listaHamburgesas.addEventListener("click",agregrarHamburgesas);

 }

 function agregrarHamburgesas(e){
    e.preventDefault();
    let agregarCarrito=e.target.classList.contains('agregarHamburguesa');
    if(agregarCarrito){    
        const seleccionarHamburguesa=e.target.parentElement;
        leerHamburguesaSeleccionada(seleccionarHamburguesa);
    }
}

function leerHamburguesaSeleccionada(seleccionarHamburguesa){
    const dataSeleccionada={
        nombre:seleccionarHamburguesa.querySelector("h3").textContent,
        precio:seleccionarHamburguesa.querySelector("p").textContent,
        id:seleccionarHamburguesa.querySelector("button").getAttribute('data-id'),
        cantidad:1
    }

    const existe=listadoHamburgesas.some((hamburgesa)=> hamburgesa.id===dataSeleccionada.id);
    console.log(existe);

    if(existe) {
        const listadoFiltradoHamburgesas=listadoHamburgesas.map((hamburgesa)=>{
                if(hamburgesa.id===dataSeleccionada.id){
                    hamburgesa.cantidad++;
                    return hamburgesa;
                }
                else{
                    return hamburgesa;
                }
        });
        listadoHamburgesas=[...listadoFiltradoHamburgesas];
    }
    else {
        listadoHamburgesas=[...listadoHamburgesas,dataSeleccionada];
    }

    console.log(listadoHamburgesas);
    imprimirHTMListaHamburgesas();
}

let total=0;

function imprimirHTMListaHamburgesas(){
    limpiarContenedorHamburgesas();
    listadoHamburgesas.forEach((hamburgesa)=>{
        //let {nombre,precio, cantidad}=hamburgesa;
        const row=document.createElement("tr");
        row.innerHTML=`<td>${hamburgesa.cantidad}</td>
                       <td>${hamburgesa.nombre}</td>
                       <td>${hamburgesa.precio}</td>
                       <td><a href="#" class="deleteCourse" data-id="${hamburgesa.id}">X </td>
        `;
        contenedorCarritoCompras.appendChild(row);
        total+=Number.parseInt(hamburgesa.precio)*hamburgesa.cantidad;
        console.log(total);  
     });
}

function limpiarContenedorHamburgesas(){
    contenedorCarritoCompras.textContent='';
}