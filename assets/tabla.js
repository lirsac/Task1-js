fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(response => response.json())
  .then(data => {
    const currentDate = new Date(data.currentDate);
    const eventos = data.events.filter(evento => new Date(evento.date) < currentDate);

    // Evento con mayor porcentaje de asistencia
    const eventoMayorAsistencia = eventos.reduce((prev, current) => {
      const prevPorcentaje = (prev.assistance / prev.capacity) * 100;
      const currentPorcentaje = (current.assistance / current.capacity) * 100;
      return (prevPorcentaje > currentPorcentaje) ? prev : current;
    });
    document.getElementById("mayorasi").textContent = `${eventoMayorAsistencia.name} (${(eventoMayorAsistencia.assistance / eventoMayorAsistencia.capacity * 100).toFixed(2)}%)`;

    // Evento con menor porcentaje de asistencia
    const eventoMenorAsistencia = eventos.reduce((prev, current) => {
      const prevPorcentaje = (prev.assistance / prev.capacity) * 100;
      const currentPorcentaje = (current.assistance / current.capacity) * 100;
      return (prevPorcentaje < currentPorcentaje) ? prev : current;
    });
    document.getElementById("menorasi").textContent = `${eventoMenorAsistencia.name} (${(eventoMenorAsistencia.assistance / eventoMenorAsistencia.capacity * 100).toFixed(2)}%)`;

    // Evento con mayor capacidad
    const eventoMayorCapacidad = eventos.reduce((prev, current) => {
      return (prev.capacity > current.capacity) ? prev : current;
    });
    document.getElementById("mayorcapi").textContent = eventoMayorCapacidad.name;


    




  })
  .catch(error => {
    console.error("Error al obtener los datos:", error);
  });
