// Cuando el usuario envía el formulario de registro
document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita que la página se recargue

    // Recoge los valores de los inputs
    const nombre_usuario = document.getElementById("nombre_usuario").value;
    const apellidos = document.getElementById("apellidos").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password_confirmation = document.getElementById("password_confirmation").value;

    // Comprueba que las contraseñas coinciden antes de enviar nada
    if (password !== password_confirmation) { 
        alert("Las contraseñas no coinciden"); 
        return; // Detiene el proceso aquí
    }

    console.log("DEBUG:", {
        nombre_usuario,
        apellidos,
        email,
        password,
    })

    try { 
        // obtener cookie CSRF de sanctum (NO usar clienteAxios)
        await axios.get("http://127.0.0.1/sanctum/csrf-cookie", {
        withCredentials: true
        });
        
        // Envia los datos al backend para crear el usuario
        const response = await clienteAxios.post("/register", { // he quitado /api/register
            nombre_usuario,
            apellidos,
            email,
            password,
            password_confirmation
        });

        // Si la respuesta del backend es 201 o 200 (ok)
        if (response.status === 201 || response.status === 200) {
            alert("Registro completado. Ahora puedes iniciar sesión.");
            window.location.href = "login.html";
            return;
        }

    } catch (error) {
        // Muestra un mensaje de error si faltan datos
        console.error(error.response?.data); 
        alert("Error en los datos del registro");
}
}); 
