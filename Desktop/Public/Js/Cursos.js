
// Genera cursos dinámicamente
//document.addEventListener('DOMContentLoaded', () => {
//  // Datos de ejemplo
//  const exampleCourses = [
//    {
//      id_curso: 1,
//      id_categoria: 2,
//      id_nivel: 1,
//      nombre_curso: "Curso de Bulerías I",
//      descripcion: "Aprende Bulerías desde cero",
//      precio: "99.95",
//      nivel: "Principiante",
//      imagen: "./img/Curso_Bulerías.jpg"
//    },
//    {
//      id_curso: 2,
//      id_categoria: 1,
//      id_nivel: 2,
//      nombre_curso: "Curso de Tangos II",
//      descripcion: "Mejora tu nivel en el estilo de los Tangos",
//      precio: "120.00",
//      nivel: "Intermedio",
//      imagen: "./img/Curso_Flamenco.jpg"
//    }
//  ];
//
//  renderCourses(exampleCourses);
//});
//


// =======================================
//     PINTAR LOS CURSOS EN PANTALLA
// =======================================
// Recibe un array de cursos y los mete en el HTML. Crea una card por cada curso
function renderCourses(courses) {
  const container = document.getElementById('cursos-container');
  container.innerHTML = '';  // Limpia el contenedor antes de agregar nuevos elementos

  courses.forEach(course => {
    // Plantilla de la card
    const courseCard = `
      <div class="curso-card">
        <img src="${course.imagen}" alt="${course.nombre_curso}">
        <h2>${course.nombre_curso}</h2>
        <p>${course.descripcion}</p>
        <p>${course.precio}€</p>
        <button class="btn-page btn-add-carrito" data-nombre="${course.nombre_curso}" data-precio="${course.precio}">Agregar al carrito</button>
      </div>
    `;
    // Agrega la card al contenedor
    container.insertAdjacentHTML('beforeend', courseCard);
  });
}

// ====================================================
//   CAPTURAR CLICK EN EL BOTÓN "AGREGAR AL CARRITO"
// ====================================================
// Función para mandar los datos al backend
document.addEventListener('click', async (e) => {

  // Si se ha pulsado el botón de "Agregar al carrito"
  if (e.target.classList.contains('btn-add-carrito')) {

    // Sacar los datos del curso desde el botón
    const nombre = e.target.dataset.nombre;
    const precio = e.target.dataset.precio;

    // Enviar los datos al backend
    try {
      const respuesta = await fetch('/carrito/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content') || ''
        },
        body: JSON.stringify({
          nombre: nombre,
          precio: precio
        })
      });

      // Recibir la respuesta del backend
      const data = await respuesta.json();
      console.log('Carrito actualizado:', data);

    } catch (error) {
      console.error('Error al añadir al carrito:', error);
    }
    // El carrito visual NO se actualiza aquí.
    // Eso lo hace Cesta.js cuando detecta el click en el botón.
  }
});
