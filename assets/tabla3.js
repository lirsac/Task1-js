fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(response => response.json())
  .then(data => {
    const currentDate = new Date(data.currentDate);
    const pastEvents = data.events.filter(event => new Date(event.date) < currentDate);
    let categorias = pastEvents.map(evento => evento.category).filter((category, index, array) => array.indexOf(category) === index);

    const tablaCategorias = document.getElementById("categoriaspasado").getElementsByTagName("tbody")[0];
    categorias.forEach(categoria => {
      const fila = document.createElement("tr");
      const nombreCategoria = document.createElement("td");
      const ingresos = document.createElement("td");
      const porcentajeAsistencia = document.createElement("td");

      const eventosCategoria = pastEvents.filter(evento => evento.category === categoria);
      const totalRevenues = eventosCategoria.reduce((sum, evento) => {
        if (evento.assistance && evento.price) {
          return sum + parseFloat(evento.assistance) * parseFloat(evento.price);
        } else {
          return sum;
        }
      }, 0);
      
      const capacidadTotal = eventosCategoria.reduce((sum, evento) => {
        if (evento.capacity) {
          return sum + parseFloat(evento.capacity);
        } else {
          return sum;
        }
      }, 0);
      
      const totalAttendance = eventosCategoria.reduce((sum, evento) => {
        if (evento.assistance) {
          return sum + parseFloat(evento.assistance);
        } else {
          return sum;
        }
      }, 0);
      
      const promedioAsistencia = (totalAttendance / capacidadTotal) * 100;

      nombreCategoria.textContent = categoria;
      ingresos.textContent = "$" + totalRevenues.toLocaleString();
      porcentajeAsistencia.textContent = promedioAsistencia.toFixed(2) + "%";

      fila.appendChild(nombreCategoria);
      fila.appendChild(ingresos);
      fila.appendChild(porcentajeAsistencia);

      tablaCategorias.appendChild(fila);
    });
  })
  .catch(error => {
    console.error("Error al obtener los datos:", error);
  });
