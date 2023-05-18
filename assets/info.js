let carta = document.getElementById("carta");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(response => response.json())
  .then(data => {
    let eventos = data.events;
    let params = new URLSearchParams(location.search);

    let idParam = params.get("id");

    let eventoid = eventos.find(evento => evento._id == idParam);

    carta.innerHTML = `
      <div class="card mb-3 d-flex justify-content-center" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-12">
            <img src="${eventoid.image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-12">
            <div class="card-body">
              <h5 class="card-title">${eventoid.name}</h5>
              <p class="card-text">${eventoid.description}</p>
              <p class="card-text">${eventoid.date}</p>
              <p class="card-text">Price: ${eventoid.price}</p>
              <p class="card-text">Place: ${eventoid.place}</p>
              <p class="card-text">Capacity: ${eventoid.capacity}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  })
  .catch(error => console.log(error));
