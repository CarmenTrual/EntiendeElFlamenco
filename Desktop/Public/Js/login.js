// =================================
// MANEJAR EL FORMULARIO DE LOGIN
// =================================

document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // Evita que la página se recargue

    // ===================================
    // OBTENER LOS DATOS DEL FORMULARIO
    // ===================================
    const email = document.getElementById("email").value;      
    const password = document.getElementById("password").value; 

    try {
        // =============================================
        // OBTENER COOKIE CSRF DE SANCTUM (OBLIGATORIO)
        // =============================================
        await clienteAxios.get("/sanctum/csrf-cookie");

        // ============================================
        // ENVIAR DATOS A LA API DE LARAVEL CON AXIOS
        // ============================================

        // Usamos la instancia clienteAxios creada en clienteAxios.js
        const { data } = await clienteAxios.post("/api/login", {
            email,
            password
        });

        // ==============================================
        // GUARDAR TOKEN EN EL LOCALSTORAGE Y REDIRIGIR
        // ==============================================
        // Guarda el token que nos da laravel en el localStorage
        localStorage.setItem("token", data.access_token);

        // Redirige a la página principal
        window.location.href = "index.html";

        } catch (error) {
            // ==================
            // MANEJO DE ERRORES
            // ==================
            console.error("Error en login:", error);

            // Si Laravel devuelve un mensaje de error, lo muestra
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("No se pudo conectar con el servidor");
            }
        }
    });
