let carritoCompras=document.querySelector("#carritoCompras");
let listaHamburgesas=document.querySelector("#lista-hamburgesas");
let listadoHamburgesas=[];
let contenedorCarritoCompras=document.querySelector("#carritoComprasLista tbody");
let carritoComprasLista=document.querySelector("#carritoComprasLista");
let iconoCarrito=document.querySelector(".carrito-compras svg");
let contadorCantidad=document.querySelector("#contador-cantidad");
let carritoComprasPadre=document.querySelector("#carritoCompras");
let contenedorContadorCompras=document.querySelector(".contador-compras");
let precioTotalPagar=document.querySelector(".precio-total-hamburgesas");
let elementoNumericoCantidad=document.querySelector("#contador-cantidad");
console.log(elementoNumericoCantidad);

cargandoEventos();


 function cargandoEventos(){
    listaHamburgesas.addEventListener("click",agregrarHamburgesas);
    carritoComprasLista.addEventListener("click",eliminarHamburgesa);
    iconoCarrito.addEventListener("click",mostrarCarrito); 

    document.addEventListener('DOMContentLoaded',()=>{
        listadoHamburgesas=JSON.parse(localStorage.getItem('hamburgesa')|| []);
        imprimirHTMListaHamburgesas();
        //mostrarCantidadTotalHamburges();
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
        const hamburgesaId=e.target.getAttribute('data-id')
        listadoHamburgesas=listadoHamburgesas.filter(hamburgesa=>hamburgesa.id!==hamburgesaId);
        imprimirHTMListaHamburgesas();
        localStorage.setItem('hamburgesa',JSON.stringify(listadoHamburgesas));
        mostrarCantidadTotalHamburges();
        
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

    imprimirHTMListaHamburgesas();
}



function imprimirHTMListaHamburgesas(){
    limpiarContenedorHamburgesas();
    let totalPrecio=0;
    let cantidadtotal=0;
    listadoHamburgesas.forEach((hamburgesa)=>{
        //let {nombre,precio, cantidad}=hamburgesa;
        const row=document.createElement("tr");
        row.innerHTML=`<td>${hamburgesa.cantidad}</td>
                       <td>${hamburgesa.nombre}</td>
                       <td>${hamburgesa.precio} $</td>
                       <td><a href="#" class="deleteHamburgesa"  data-id="${hamburgesa.id}">X </td>
        `;
        contenedorCarritoCompras.appendChild(row);
        localstorageListaHamburguesas();
        cantidadtotal+=hamburgesa.cantidad;
        totalPrecio+=Number.parseFloat(hamburgesa.precio)*hamburgesa.cantidad;
        //console.log(totalPrecio);
        cantidadtotal+=hamburgesa.cantidad;
        //console.log(cantidadtotal);
        mostrarCantidadTotalHamburges();
     });
     
     precioTotalPagar.innerHTML=`<p> Total a Pagar: ${totalPrecio} $</p>`;
}

function localstorageListaHamburguesas(){
    localStorage.setItem('hamburgesa',JSON.stringify(listadoHamburgesas));
}

function limpiarContenedorHamburgesas(){
    contenedorCarritoCompras.textContent='';
}

 function mostrarCantidadTotalHamburges(){
     let ccCantidad=0;
     listadoHamburgesas.forEach((hamburgesa)=>{
        ccCantidad+=hamburgesa.cantidad;
     });
     
     elementoNumericoCantidad.innerHTML="";
     let elementoContadadorCantidad=document.createElement("p");
     elementoContadadorCantidad.textContent=ccCantidad;
     console.log(elementoContadadorCantidad);
     elementoNumericoCantidad.appendChild(elementoContadadorCantidad);
 }

function mostrarCarrito(e){
    if(carritoComprasPadre.style.display==="none"){
        carritoComprasPadre.style.display="block";
        iconoCarrito.style.marginLeft="135px";
    }
    else {
        carritoComprasPadre.style.display="none";
    }
 
}