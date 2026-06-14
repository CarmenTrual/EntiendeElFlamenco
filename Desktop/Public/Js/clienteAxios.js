// ============================
//   CONFIGURACIÓN DE AXIOS 
// ============================

// --- MODO LOCAL --- 
// Crear una instancia personalizada de axios que permite no repetir la URL base ni los headers
// en todas las peticiones que se realicen a la API desde el frontend
const clienteAxios = axios.create({
  baseURL: "http://127.0.0.1/api",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true
});

// --- MODO SERVIDOR ---
// Crear una instancia personalizada de axios que permite no repetir la URL base ni los headers
// en todas las peticiones que se realicen a la API desde el frontend
// const clienteAxios = axios.create({
//   baseURL: "https://caref.duckdns.org/api",
//   headers: {
//     "Content-Type": "application/json", // Envia datos en JSON
//     "X-Requested-With": "XMLHttpRequest", // Indica que se trata de una solicitud AJAX
//   },
//   withCredentials: true, // Necesario para Sanctum
// });


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
// Instancia separada SOLO para Sanctum
// ===============================================

// --- MODO LOCAL ---
const csrfAxios = axios.create({
    baseURL: "http://127.0.0.1",
    withCredentials: true
});

//  --- MODO SERVIDOR ---
// Aquí la baseURL NO lleva /api, porque la ruta real de Sanctum es
// https://caref.duckdns.org/sanctum/csrf-cookie (sin /api delante).
// La usamos únicamente para pedir la cookie CSRF.
//const csrfAxios = axios.create({
//  baseURL: "https://caref.duckdns.org",
//  withCredentials: true // Necesario para que el navegador guarde la cookie de Sanctum
//});




// ===============================================
// Esta instancia la usamos en TODO el proyecto
// Ejemplo: clienteAxios.post('/api/login', datos)
// ===============================================
