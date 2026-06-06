// ============================
//   CONFIGURACIÓN DE AXIOS 
// ============================

// Crear una instancia personalizada de axios que permite no repetir la URL base ni los headers
// en todas las peticiones que se realicen a la API desde el frontend
const clienteAxios = axios.create({
  baseURL: "http://127.0.0.1",
  headers: {
    "Content-Type": "application/json", // Envia datos en JSON
    "X-Requested-With": "XMLHttpRequest", // Indica que se trata de una solicitud AJAX
  },
  // // Permite que Axios envíe cookies o credenciales si Laravel las necesita
  withCredentials: true,
});

// ===============================================
// Esta instancia la usamos en TODO el proyecto
// Ejemplo: clienteAxios.post('/api/login', datos)
// ===============================================