// ============================
// PROTECCIÓN DE RUTA PRIVADA
// ============================

// Recupera el token del usuario guardado en localStorage.
//const token = localStorage.getItem("AUTH_TOKEN");

// Si NO existe token, el usuario no está logueado. LLeva a la página de login.
//if (!token) {
//window.location.href = "login.html";
//}

// Si el token existe, la página continúa cargando con normalidad.

console.log("Cesta.js cargado");

// Hacer async para poder usar await dentro 
document.addEventListener("DOMContentLoaded", async () => {
  // ==============================================
  //   RECUPERAR TOKEN DEL USUARIO LOGUEADO
  // ==============================================
  // Para enviar Authorization: Bearer TOKEN
  const token = localStorage.getItem("token");

  // ==============================================
  //    OBTENER EL USUARIO LOGUEADO DESDE LA API
  // ==============================================
  //Se necesita el ID del usuario para crear el carrito unico para cada usuario
  let userId = null;

  // Obtener el ID real del usuario logueado
  try{
    const { data } = await clienteAxios.get("/user"); // He quitado /api/user
    userId = data.id; // ID real del usuario logueado
  } catch (error) {
    console.error("No se pudo obtener el usuario:", error);
    return; // Si no hay usuario logueado, no carga el carrito
    }

    // Clave única del carrito para cada usuario
    const carritoKey = `carrito-${userId}`;


    // ========================================
    //    REFERENCIAS A ELEMENTOS DEL DOM
    // ========================================
    // Cojo del HTML todo lo que necesito para que el carrito funcione (botones, modal, lista, total)
  const abrirCarritoBtns = document.querySelectorAll(".abrir-carrito");
  const modal = document.getElementById("carrito-modal");
  const cerrarBtn = document.querySelector(".close-btn");
  const carritoItemsContainer = document.getElementById("carrito-items");
  const totalElement = document.getElementById("total");


  // ====================================================
  //   CARGAR EL CARRITO DEL USUARIO DESDE LOCALSTORAGE
  // ====================================================
  // Cargar carrito_ID 
  let carrito = JSON.parse(localStorage.getItem(carritoKey)) || [];
  actualizarCarrito();


  // ===============================
  //    ABRIR MODAL DEL CARRITO 
  // ===============================
  // funciona para los botones de los dos menus
  abrirCarritoBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Botón de cesta pulsado");
      modal.style.display = "block";
    });
  });

  // ========================================
  //    ACTUALIZAR EL CARRITO EN PANTALLA
  // ========================================
  function actualizarCarrito() {
    carritoItemsContainer.innerHTML = "";
    let total = 0;

    // Mostrar cursos en el carrito
    carrito.forEach((curso, index) => {
      total += curso.precio;
      
      // Crear el elemento del carrito
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("carrito-item");

      // Agregar el curso al carrito
      itemDiv.innerHTML = `
        <span>${curso.nombre} - ${curso.precio.toFixed(2)}€</span>
        <button data-index="${index}">Eliminar</button>
      `;
      carritoItemsContainer.appendChild(itemDiv);
    });

    // Actualizar el total
    totalElement.textContent = total.toFixed(2) + "€";

    // Botones para eliminar cursos
    carritoItemsContainer.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        carrito.splice(index, 1);
        guardarCarrito();
        actualizarCarrito();
      });
    });
  }

  // ===================================
  //    GUARDAR CARRITO POR USUARIO
  // ===================================
  function guardarCarrito() {
    localStorage.setItem(carritoKey, JSON.stringify(carrito));
  }


  // ===============================
  // CERRAR MODAL DEL CARRITO
  // ===============================
  if (cerrarBtn) {
    cerrarBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });


  // ===============================
  //    AÑADIR CURSOS AL CARRITO
  // ===============================
  document.addEventListener("click", (e) => {//
    if (e.target.matches(".curso-card button")) {// botón de anadir al carrito

      // Obtener información del curso
      const card = e.target.closest(".curso-card");
      const nombre = card.querySelector("h2").textContent;

      const precioTexto = Array.from(card.querySelectorAll("p")).pop().textContent;

      // Convertir precio a float "Precio: 99,95€" - 99.95
      const precio = parseFloat(precioTexto.replace("Precio: ", "").replace("€", "").replace(",", "."));

      carrito.push({ nombre, precio });
      guardarCarrito();// Guardar con la clave del usuario
      actualizarCarrito(); 

      // Mostrar el modal
      modal.style.display = "block"; // abrir modal automáticamente
    }
  });
});

