//VARIABLES
const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito = document.getElementById("vaciar-carrito");



//FUNCIONES

const insertarACarrito = (curso) =>{
	const row = document.createElement('tr');
	row.innerHTML = `
	<td>
		<img src='${curso.imagen}' width=100>
	</td>
	<td>${curso.titulo}</td>
	<td>${curso.precio}</td>
	<td>
		<a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
	</td>
	`;
	listaCursos.appendChild(row)
}

const leerDatosCurso = (curso) =>{
	const infoCurso = {
		imagen: curso.querySelector('img').src,
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.u-pull-right').textContent,
		id: curso.querySelector('a').getAttribute('data-id')
	}
	insertarACarrito(infoCurso);
}


const comprarCurso = (e)=>{
	e.preventDefault();
	if(e.target.classList.contains('agregar-carrito')){
		const curso = e.target.parentElement.parentElement;
		leerDatosCurso(curso);
	}
}


const eliminarCurso = (e) =>{
	e.preventDefault();
	let curso;
	if(e.target.classList.contains('borrar-curso')){
		e.target.parentElement.parentElement.remove()
	}
}

const vaciarCarrito = (e) =>{
	while(listaCursos.firstChild){
		listaCursos.remove(listaCursos.firstChild); 
	}
}


//LISTENERS
const cargarEventListeners = ()=>{
	cursos.addEventListener('click', comprarCurso);

	carrito.addEventListener('click', eliminarCurso);

	btnVaciarCarrito.addEventListener('click', vaciarCarrito);

}
cargarEventListeners();
