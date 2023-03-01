const $cards = document.querySelector('#section-cards');

function crearCards(arrayCards) {
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
	for (let event of arrayCards) {
		if (event.date <= '2022-01-01') {
			template += crearCards(event);
		}
	}
	elemento.innerHTML = template;
}

ponerTarjetas(data.events, $cards);
