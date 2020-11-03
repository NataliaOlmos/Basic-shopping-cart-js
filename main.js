//constants
const cart = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Evento que responde al botón "Agregar carrito"
    listaCursos.addEventListener('click', agregarCurso)

//Elimina curso del carrito
    carrito.addEventListener('click', eliminarCurso)
//Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
      articulosCarrito =[];
      limipiarHTML();//eliminamos todo el html
    })
}

function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito'));
    const cursoSeleccionado = e.target.parentElement.parentElement;
    console.log(e.target.parentElement.parentElement)

    leerDatosCurso(cursoSeleccionado)
}


//Elimina curso
function eliminarCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
     const cursoId = e.target.getAttribute('data-id');   

    //elimina el arreglo de articulos por el data-id
     articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
    
     carritoHTML();//Iterar sobre el carrito
    }
}

//EXTRAYENDO INFO DEL CURSO
function leerDatosCurso(curso){
    console.log(curso)

    //objeto con el contenido del curso actual
    const infoCurso= {
        id : curso.querySelector('a').getAttribute('data-id'),
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        cantidad : 1
        
    }

//Revisar si un elemento ya existe en el carrito
const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
if(existe){
    const cursos = articulosCarrito.map( curso => {
        if( curso.id === infoCurso.id){
            curso.cantidad++;
            return curso;
        }else{
            return curso;
        }
    });
    articulosCarrito =[...cursos];
}else{
    articulosCarrito = [...articulosCarrito, infoCurso]; 
}




//agregar elementos al carrito copiando el array

  console.log(articulosCarrito);
  carritoHTML();
}


//mostrar el carrito en html
function carritoHTML(){
    limipiarHTML();
    articulosCarrito.forEach( curso =>{
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${curso.imagen}" width="100">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `;
//agrag html
        contenedorCarrito.appendChild(row);
    })
}

function limipiarHTML(){

    //contenedorCarrito.innerHTML="";
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}