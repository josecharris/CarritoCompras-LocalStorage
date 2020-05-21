//VARIABLES
const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito = document.getElementById("vaciar-carrito");



//FUNCIONES

const obtenerCursoLocalStorage = () =>{
	let cursosLS;
	if(localStorage.getItem('cursos') === null){
		cursosLS = [];
	}else {
		cursosLS = JSON.parse(localStorage.getItem('cursos'));
	}
	return cursosLS;
}

const guardarCursoLocalStorage = (curso)=>{
	let cursos;
	cursos = obtenerCursoLocalStorage();
	cursos.push(curso);
	localStorage.setItem('cursos', JSON.stringify(cursos));
}


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
	listaCursos.appendChild(row);
	guardarCursoLocalStorage(curso);
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

const eliminarCursoLocalStorage = (curso) =>{
	let cursosLS = obtenerCursoLocalStorage();
	
	cursosLS.forEach((cursoLS, index)=>{
		if(cursoLS.id == curso){
			cursosLS.splice(index, 1);
		}
	});

	localStorage.setItem('cursos', JSON.stringify(cursosLS));

}

const eliminarCurso = (e) =>{
	e.preventDefault();
	let curso, cursoID;
	if(e.target.classList.contains('borrar-curso')){
		e.target.parentElement.parentElement.remove();
		curso = e.target.parentElement.parentElement;
		cursoID = curso.querySelector('a').getAttribute('data-id');

	}
	eliminarCursoLocalStorage(cursoID);
}


const vaciarCarrito = () =>{
	listaCursos.innerHTML = '';
	localStorage.clear()
}

const leerLocalStorage = ()=>{
	let cursosLS = obtenerCursoLocalStorage();
	cursosLS.map((curso)=>{
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
		listaCursos.appendChild(row);
	})
}


//LISTENERS
const cargarEventListeners = ()=>{
	cursos.addEventListener('click', comprarCurso);

	carrito.addEventListener('click', eliminarCurso);

	btnVaciarCarrito.addEventListener('click', vaciarCarrito);

	document.addEventListener('DOMContentLoaded', leerLocalStorage);
}
cargarEventListeners();
