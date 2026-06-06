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
    if (token) {
        // Usuario logueado: muestra perfil + logout y oculta login
        if (btnLogin) btnLogin.style.display = "none";
        if (btnCesta) btnCesta.style.display = "inline-block";
        if (btnLogout) btnLogout.style.display = "inline-block";

        if (hmLogin) hmLogin.style.display = "none";
        if (hmCesta) hmCesta.style.display = "block";
        if (hmLogout) hmLogout.style.display = "block";
    } else {
        // Usuario no logueado: muestra login y oculta perfil + logout
        if (btnLogin) btnLogin.style.display = "inline-block";
        if (btnCesta) btnCesta.style.display = "none";
        if (btnLogout) btnLogout.style.display = "none";

        if (hmLogin) hmLogin.style.display = "block";
        if (hmCesta) hmCesta.style.display = "none";
        if (hmLogout) hmLogout.style.display = "none";
    }

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
