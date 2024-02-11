let carritoCompras=document.querySelector("#carritoCompras");
let listaHamburgesas=document.querySelector("#lista-hamburgesas");
let listadoHamburgesas=[];
let contenedorCarritoCompras=document.querySelector("#carritoComprasLista tbody");
let carritoComprasLista=document.querySelector("#carritoComprasLista");
console.log(carritoComprasLista);
cargandoEventos();
let carritoComprasPadre=document.querySelector(".carrito-compras svg");
//console.log(carritoComprasPadre);
let contadorCantidad=document.querySelector("#contador-cantidad");
//console.log(contadorCantidad);

 function cargandoEventos(){
    listaHamburgesas.addEventListener("click",agregrarHamburgesas);
    carritoComprasLista.addEventListener("click",eliminarHamburgesa);
    

    document.addEventListener('DOMContentLoaded',()=>{
        listadoHamburgesas=JSON.parse(localStorage.getItem('hamburgesa')|| []);
        imprimirHTMListaHamburgesas();
        mostrarCantidadTotalHamburges();
    });
 }

 function agregrarHamburgesas(e){
    e.preventDefault();
    let agregarCarrito=e.target.classList.contains('agregarHamburguesa');
    if(agregarCarrito){    
        const seleccionarHamburguesa=e.target.parentElement;
        leerHamburguesaSeleccionada(seleccionarHamburguesa);
    }
}

function eliminarHamburgesa(e){
    if(e.target.classList.contains('deleteHamburgesa')){
       // console.log("Diste click");
        const hamburgesaId=e.target.getAttribute('data-id')
        listadoHamburgesas=listadoHamburgesas.filter(hamburgesa=>hamburgesa.id!==hamburgesaId);
        console.log(listadoHamburgesas);
        imprimirHTMListaHamburgesas();
        localStorage.setItem('hamburgesa',JSON.stringify(listadoHamburgesas));
        
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
    //console.log(existe);

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

   // console.log(listadoHamburgesas);
    imprimirHTMListaHamburgesas();
}

let total=0;
let cantidadtotal=0;
function imprimirHTMListaHamburgesas(){
    limpiarContenedorHamburgesas();
    listadoHamburgesas.forEach((hamburgesa)=>{
        //let {nombre,precio, cantidad}=hamburgesa;
        const row=document.createElement("tr");
        row.innerHTML=`<td>${hamburgesa.cantidad}</td>
                       <td>${hamburgesa.nombre}</td>
                       <td>${hamburgesa.precio}</td>
                       <td><a href="#" class="deleteHamburgesa"  data-id="${hamburgesa.id}">X </td>
        `;
        contenedorCarritoCompras.appendChild(row);
        localstorageListaHamburguesas();
        cantidadtotal+=hamburgesa.cantidad;
        console.log(cantidadtotal);

        function localstorageListaHamburguesas(){
            localStorage.setItem('hamburgesa',JSON.stringify(listadoHamburgesas));
        }


        //total+=Number.parseInt(hamburgesa.precio)*hamburgesa.cantidad;
        //console.log(total);  

        //mostrarCantidadTotalHamburges();
     });
}

function limpiarContenedorHamburgesas(){
    contenedorCarritoCompras.textContent='';
}

function mostrarCantidadTotalHamburges(){
    let contadorCantidad=0;
    listadoHamburgesas.map((hamburgesa)=>{
        contadorCantidad+=hamburgesa.cantidad;
    });

    console.log(contadorCantidad);
}