const detalles = document.querySelector('#divInfo');
const params = new URLSearchParams(location.search);
const id = params.get('id');
const idContent = data.events.find(e => e._id === id);

function crearInfo(data) {
	const change = data.estimate ? 'estimate' : 'assistance';
	return `<div class="row g-0 ">
    <div class="col-md-4 d-flex justify-content-center">
        <img
            src="${data.image}"
            class="img-fluid rounded-start img-info"
            alt="${data.name}"
        />
    </div>
<div class="col-md-8">
    <div class="card-body">
        <h5 class="card-title text-center">${data.name}</h5>
        <p class="card-text text-center">
            ${data.description}
        </p>
        <p class="card-text text-center"><small class="text-muted">capacity: ${data.capacity}</small></p>
        <p class="card-text text-center">
            <small class="text-muted"> ${change} : ${data[change]}
						</small>
        </p>
        <p class="card-text text-center">
            <small class="text-muted">date: ${data.date}</small>
        </p>
        <p class="card-text text-center"><small class="text-muted">place: ${data.place}</small></p>
    </div>
</div>
</div>`;
}

function renderInfo(obj, elemento) {
	let template = '';
	template += crearInfo(obj);
	elemento.innerHTML = template;
}

renderInfo(idContent, detalles);
