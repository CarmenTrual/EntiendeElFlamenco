// ============================
//   CONFIGURACIÓN DE AXIOS 
// ============================

// Crear una instancia personalizada de axios que permite no repetir la URL base ni los headers
// en todas las peticiones que se realicen a la API desde el frontend
const clienteAxios = axios.create({
  baseURL: "http://localhost",
  headers: {
    "Content-Type": "application/json", // Envia datos en JSON
    "X-Requested-With": "XMLHttpRequest", // Indica que se trata de una solicitud AJAX
  },
  withCredentials: true, // Necesario para Sanctum
});

// ===============================================
// Interceptar las peticiones y agregar el token
// ===============================================
clienteAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===============================================
// Esta instancia la usamos en TODO el proyecto
// Ejemplo: clienteAxios.post('/api/login', datos)
// ===============================================
