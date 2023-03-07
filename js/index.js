const $cards = document.querySelector('#section-cards');
const $divs = document.querySelector('#divCategory');
const category = Array.from(new Set(data.events.map(valor => valor.category)));

function crearInputs(datos) {
	return `<div class="form-check me-4">
    <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
    <label class="form-check-label" for="flexCheckIndeterminate"> ${datos} </label>
</div>`;
}

function ponerInputs(datos, elemento) {
	let contenedor = '';
	for (let inputs of datos) {
		contenedor += crearInputs(inputs);
	}
	elemento.innerHTML = contenedor;
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
            <a href="./pages/info.html" class="btn btn-success">More info</a>
        </div>
    </div>
</div>`;
}

function ponerTarjetas(arrayCards, elemento) {
	let template = '';
	for (let cards of arrayCards) {
		template += crearTarjetas(cards);
	}
	elemento.innerHTML = template;
}

ponerTarjetas(data.events, $cards);
ponerInputs(category, $divs);
