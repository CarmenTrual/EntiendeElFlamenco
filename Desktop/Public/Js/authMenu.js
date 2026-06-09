// Toast de bienvenida
const paginaActual = window.location.pathname;

// ==================================//
//   CONFIGURACIÓN INICIAL DEL DOM
// ==================================//
// Esperar a que el HTML cargue para poder acceder a los elementos del menú
document.addEventListener("DOMContentLoaded", () => {

    // Recuperar token para saber si el usuario está logueado
    const token = localStorage.getItem("token");

    // Botones del menú principal
    const btnLogin = document.getElementById("btn-login");
    const btnCesta = document.getElementById("btn-cesta");
    const btnLogout = document.getElementById("btn-logout");

    // Botones del menú hamburguesa
    const hmLogin = document.getElementById("hm-login");
    const hmCesta = document.getElementById("hm-cesta");
    const hmLogout = document.getElementById("hm-logout");


    // ==============================//
    //   MOSTRAR / OCULTAR BOTONES   //
    // ==============================//
    // Si no existe token - usuario no logueado
    if (!token) {
        
        // Usuario NO logueado: mostrar solo el botón de iniciar sesión
        if (btnLogin) btnLogin.style.display = "inline-block";
        if (btnCesta) btnCesta.style.display = "none";
        if (btnLogout) btnLogout.style.display = "none";

        // Menú hamburguesa en estado NO logueado
        if (hmLogin) hmLogin.style.display = "block";
        if (hmCesta) hmCesta.style.display = "none";
        if (hmLogout) hmLogout.style.display = "none";

        return; // No seguimos. NO llamamos a /api/user
    }

    // ==============================//
    //   MOSTRAR ESTADO LOGUEADO YA  //
    // ==============================//

    // Mostrar botones correctos 
    if (btnLogin) btnLogin.style.display = "none";
    if (btnCesta) btnCesta.style.display = "inline-block";
    if (btnLogout) btnLogout.style.display = "inline-block";

    if (hmLogin) hmLogin.style.display = "none";
    if (hmCesta) hmCesta.style.display = "block";
    if (hmLogout) hmLogout.style.display = "block";


    // ============================
    //   OBTENER DATOS DEL USUARIO
    // ============================
    const obtenerUsuario = async () => {
        try {
            const respuesta = await clienteAxios.get("/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const usuario = respuesta.data;

            // Pasar el nombre del usuario al toast (si existe)
            const nombreUsuarioSpan = document.getElementById("nombre-usuario");
            if (nombreUsuarioSpan) nombreUsuarioSpan.textContent = usuario.nombre_usuario;


            } catch (error) {
            console.error("Error al obtener el usuario:", error);

            // Si el token es inválido lo borra y vuelve a estado no logueado
            localStorage.removeItem("token");

            if (btnLogin) btnLogin.style.display = "inline-block";
            if (btnCesta) btnCesta.style.display = "none";
            if (btnLogout) btnLogout.style.display = "none";

            if (hmLogin) hmLogin.style.display = "block";
            if (hmCesta) hmCesta.style.display = "none";
            if (hmLogout) hmLogout.style.display = "none";
            
            return; // NO sigue
            }
        };

    // Ejecuta la función
    obtenerUsuario();

    // ========================//
    //         LOGOUT          //
    // ========================//
    // Función reutilizable para cerrar sesión
    const hacerLogout = async () => {

        try {
            // Llama al endpoint de logout de Laravel
            // Invalida el token en el backend
            await clienteAxios.post("/api/logout", null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
            // Si falla, no pasa nada. Cierra la sesión en el navegador
            console.error("Error al cerrar sesión en el servidor:", error);
        }

        // Elimina el token del navegador
        localStorage.removeItem("token");

        // Redirige al login
        window.location.href = "login.html";
    };

    // Botón logout del menú principal
    if (btnLogout) {
        btnLogout.addEventListener("click", hacerLogout);
    }

    // Botón logout del menú hamburguesa
    if (hmLogout) {
        hmLogout.addEventListener("click", hacerLogout);
    }
});
