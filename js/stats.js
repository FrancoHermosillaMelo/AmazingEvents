const $mayorAsistencia = document.querySelector('#mayorAsistencia');
const $menorAsistencia = document.querySelector('#menorAsistencia');
const $mayorCapacidad = document.querySelector('#mayorCapacidad');
const $tablaUP = document.querySelector('#tablaUpcoming');
const $tablaPast = document.querySelector('#tablaPast');

//---------------------CREAR PROMESA--------------------------//
function datosAPI() {
	fetch(' https://mindhub-xj03.onrender.com/api/amazing')
		.then(response => response.json())
		.then(datosEvent => {
			const eventosFiltrados = datosEvent.events.filter(
				event => event.date < datosEvent.currentDate
			);
			const eventosFiltradosUpcoming = datosEvent.events.filter(
				event => event.date > datosEvent.currentDate
			);
			const resultado = eventosFiltrados.sort((evento1, evento2) => {
				return (
					(evento1.assistance / evento1.capacity) * 100 -
					(evento2.assistance / evento2.capacity) * 100
				);
			});
			const resultadoMayorCapacidad = datosEvent.events
				.sort((evento1, evento2) => evento1.capacity - evento2.capacity)
				.slice(-2);
			const eventoMayorAssistencia = resultado.slice(-1);
			const eventoMenorAsistencia = resultado.slice(0, 1);
			asistencia(eventoMayorAssistencia[0], $mayorAsistencia);
			asistencia(eventoMenorAsistencia[0], $menorAsistencia);
			asistencia(resultadoMayorCapacidad[0], $mayorCapacidad);
			//----------------------------UPCOMING-------------------------------------------//
			const categorias = {};
			eventosFiltradosUpcoming.forEach(propiedadEventos => {
				if (!categorias[propiedadEventos.category]) {
					categorias[propiedadEventos.category] = {
						price: 0,
						estimate: 0,
						capacity: 0,
					};
				}
				categorias[propiedadEventos.category].price +=
					propiedadEventos.price * propiedadEventos.estimate;
				categorias[propiedadEventos.category].capacity += propiedadEventos.capacity;
				categorias[propiedadEventos.category].estimate += propiedadEventos.estimate;
			});

			let subirTabla = '';
			for (const categoria in categorias) {
				const precio = categorias[categoria].price;
				const estimados = categorias[categoria].estimate;
				const capacidad = categorias[categoria].capacity;
				let valorPorcentaje = ((estimados * 100) / capacidad).toFixed(2);
				let template = () => {
					return `<tr>
					<td colspan="2" class="bg-light">${categoria}</td>
					<td colspan="2" class="bg-light">${precio}</td>
					<td colspan="2" class="bg-light">${valorPorcentaje} %</td>
				</tr>`;
				};
				subirTabla += template();
			}
			$tablaUP.innerHTML = subirTabla;

			//---------------------------------PAST EVENTS ---------------------------//
			const categorias2 = {};
			eventosFiltrados.forEach(propiedadEventos => {
				if (!categorias2[propiedadEventos.category]) {
					categorias2[propiedadEventos.category] = {
						price: 0,
						assistance: 0,
						capacity: 0,
					};
				}
				categorias2[propiedadEventos.category].price +=
					propiedadEventos.price * propiedadEventos.assistance;
				categorias2[propiedadEventos.category].capacity += propiedadEventos.capacity;
				categorias2[propiedadEventos.category].assistance += propiedadEventos.assistance;
			});
			let subirTabla2 = '';
			for (const categoria in categorias2) {
				const precio2 = categorias2[categoria].price;
				const asistencias2 = categorias2[categoria].assistance;
				const capacidad2 = categorias2[categoria].capacity;
				let valorPorcentaje2 = ((asistencias2 * 100) / capacidad2).toFixed(2);
				let template2 = () => {
					return `<tr>
					<td colspan="2" class="bg-light">${categoria}</td>
					<td colspan="2" class="bg-light">${precio2}</td>
					<td colspan="2" class="bg-light">${valorPorcentaje2} %</td>
				</tr>`;
				};
				subirTabla2 += template2();
			}
			$tablaPast.innerHTML = subirTabla2;
		})
		.catch(error => console.log(error));
}
datosAPI();

//-------------------------------------------------------------------//

function asistencia(objeto, elemento) {
	elemento.innerHTML = objeto.name;
}
