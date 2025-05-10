import React, {useEffect, useState} from "react";

// URL para solicitar las tareas por hacer: https://playground.4geeks.com/todo/users/dc_list

// Hacer una peticion GET a la API al cargar el componente con useEffect

// Mostrar en la UI el listado de tareas


// Componente principal
const Home = () => {

	// Estado para almacenar la lista de tareas
	const [todoList, setTodoList] = useState([])

	// Estado para almacenar el valor del input (nueva tarea)
	const [newTodo, setNewTodo] = useState("")

	// Estado para controlar cuál elemento debe mostrar la "X" (índice del item)
	const [showX, setShowX] = useState(null)

	// Función que se ejecuta al presionar una tecla en el input
	const handlePressKey = (e) => {

		// Si la tecla presionada es "Enter"
		if (e.key === "Enter"){
			fetch('https://playground.4geeks.com/todo/todos/dc_list',{ // POST
				method: "POST",
				body: JSON.stringify({
					"label": newTodo,
					"is_done": false
				}),
				headers: {
					"Content-Type": "application/json"
				  }
			})
			.then((response) => response.json())
			.then((data) => console.log(data.todos))

			setNewTodo("")
			// hacer una funcion refactorizable
			fetch('https://playground.4geeks.com/todo/users/dc_list')
			.then((response) => response.json())
			.then((data) => setTodoList(data.todos))
		}
	}

	// Función para eliminar una tarea según su índice
	const handleDelete = (idToDelete) => {
		// Hacer una peticion DELETE a la API
		fetch('https://playground.4geeks.com/todo/todos/' + idToDelete ,{
			method: "DELETE"
		})
		.then((response) => {
			if(response.ok){
				alert("La tarea fue borrada")
			}
		})

		setTodoList(todoList.filter((elem, index) => index ==! indexToDelete))
	}

	const panic = () => {
		fetch('https://playground.4geeks.com/todo/users/dc_list' ,{
			method: "DELETE"
		})
		.then((response) => {
			if(response.ok){
				console.log("Eliminacion correcta")
				fetch('https://playground.4geeks.com/todo/users/dc_list',{ // POST
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				  }
			})
			}
		})
	}

	useEffect(() => {
	// Hacer una peticion GET a la API
	fetch("https://playground.4geeks.com/todo/users/dc_list")
	.then((response) => response.json())
	.then((data) => setTodoList(data.todos)) // data ----> objeto en este ejercicio, propiedad {name:"dc_list", todos: []}

	}, [])

	return (
		<div className="text-center">
			
            <div>Todos</div>

			<div id="container">
				<ul>
					{/* Input para agregar nuevas tareas */}
					<li>
						<input
							type="text"
							placeholder="Agregar Tarea"
							value={newTodo}
							onChange={(e)=> setNewTodo(e.target.value)} // Actualiza el valor del input
							onKeyDown={handlePressKey} // Escucha si se presiona "Enter"
						/>
					</li>

					{/* Mapea y muestra todas las tareas en la lista */}
					{
						todoList.map((todo)=>(

							// Cada tarea es un <li> que detecta si el mouse está encima o no
							<li 
							className="d-flex justify-content-between"
							key={todo.id}
								onMouseOver={() => setShowX(todo.id)} // Muestra la X
								onMouseLeave={() => setShowX(null)} // Oculta la X


							><span>{todo.label}</span>
								{/* Texto de la tarea */}
								

								{/* Botón "X" para eliminar la tarea, aparece solo si el mouse está encima */}
								{showX === todo.id && 
									<small className="mx-5" onClick={() => handleDelete(todo.id)}>X</small>
								}
							</li>
						))
					}

					{/* Muestra un mensaje según la cantidad de tareas */}
					<li>
						{todoList.length === 0
							? "No hay tareas, añadir tareas"
							: todoList.length + " Por hacer"}
					</li>
				</ul>
			</div>
			<button className="btn btn-danger" onClick={() => panic()}>Panic</button>
		</div>
	);
};

export default Home; // Exporta el componente para que se use en otros archivos
