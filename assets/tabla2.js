fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(response => response.json())
  .then(data => {
    const currentDate = new Date(data.currentDate);
    const eventosFuturos = data.events.filter(evento => new Date(evento.date) >= currentDate);
    let categorias = eventosFuturos.map(evento => evento.category).filter((category, index, array) => array.indexOf(category) === index);

    const tablaCategorias = document.getElementById("tablaCategorias").getElementsByTagName("tbody")[0];
    categorias.forEach(categoria => {
      const fila = document.createElement("tr");
      const nombreCategoria = document.createElement("td");
      const ingresos = document.createElement("td");
      const porcentajeAsistencia = document.createElement("td");

      const eventosCategoria = eventosFuturos.filter(evento => evento.category === categoria);
      const totalRevenues = eventosCategoria.reduce((sum, evento) => {
        if (evento.estimate && evento.price) {
          return sum + parseFloat(evento.estimate) * parseFloat(evento.price);
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
        if (evento.estimate) {
          return sum + parseFloat(evento.estimate);
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
