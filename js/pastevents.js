const $cards = document.querySelector('#section-cards');
const $divInput = document.querySelector('#divCategory');
const $srh = document.querySelector('#srh');

//---------------------CREAR PROMESA--------------------------//
function datosAPI() {
	fetch(' https://mindhub-xj03.onrender.com/api/amazing')
		.then(response => response.json())
		.then(datosEvent => {
			const categoriaListas = Array.from(new Set(datosEvent.events.map(evento => evento.category)));
			const eventosFiltrados = datosEvent.events.filter(
				event => event.date < datosEvent.currentDate
			);
			crearInputs(categoriaListas);
			ponerTarjetas(eventosFiltrados, $cards);
			ponerInputs(categoriaListas, $divInput);
			$divInput.addEventListener('change', e => {
				ponerTarjetas(filtroCruzado(eventosFiltrados), $cards);
			});
			$srh.addEventListener('keyup', e => {
				ponerTarjetas(filtroCruzado(eventosFiltrados), $cards);
			});
		})
		.catch(error => console.log(error));
}
datosAPI();

//-------------------------------------------------------------------//

function mensaje() {
	return `<h2 class= "text-center text-dark p-5">No result found</h2>`;
}

function crearTarjetas(arrayCards) {
	return `<div class="card mt-3" style="width: 18rem">
    <img src="${arrayCards.image}" alt="${arrayCards.category}" class="card-img-top img-s" />
    <div class="card-body">
        <h5 class="card-title text-center">${arrayCards.name}</h5>
        <p class="card-text p-home">
            ${arrayCards.description}
        </p>
        <div class="d-flex justify-content-between align-items-center price1">
            <h5 class="fs-5">Price: ${arrayCards.price}$</h5>
            <a href="../pages/info.html?id=${arrayCards._id}" class="btn btn-success">More info</a>
        </div>
    </div>
</div>`;
}

function ponerTarjetas(arrayCards, elemento) {
	let template = '';
	if (arrayCards == 0) {
		template = mensaje();
	}
	for (let event of arrayCards) {
		template += crearTarjetas(event);
	}
	elemento.innerHTML = template;
}

function crearInputs(datos) {
	return `<div class="form-check me-4">
    <input class="form-check-input" type="checkbox" value="${datos}" id="${datos}" />
    <label class="form-check-label" for="${datos}"> ${datos} </label>
    </div>`;
}

function ponerInputs(datos, elemento) {
	let contenedor = '';
	for (let inputs of datos) {
		contenedor += crearInputs(inputs);
	}
	elemento.innerHTML = contenedor;
}

// ------------------------------------------------------ //

function filtradoCheck(array) {
	const check = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));
	const valorInput = check.map(elemento => elemento.value);
	if (valorInput.length === 0) {
		return array;
	}
	const listaFiltrada = array.filter(elemento => {
		return valorInput.includes(elemento.category);
	});

	return listaFiltrada;
}

// ---------------------FILTRAR SEACH---------------------------------//

function filtradoSearch(array) {
	const searchValor = $srh.value.toLowerCase();
	if (searchValor.length === 0) {
		return array;
	}
	const filtradoDeSrh = array.filter(e => {
		return e.name.toLowerCase().includes(searchValor);
	});
	return filtradoDeSrh;
}

//----------------------FILTROS CRUZADOS ---------------------------//

function filtroCruzado(array) {
	return filtradoCheck(filtradoSearch(array));
}
