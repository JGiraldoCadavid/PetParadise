let formulario = document.getElementById("miFormulario");
    let boton = document.getElementById("boton");
    let mensajeElement = document.getElementById("mensajealert");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        let nombre = document.getElementById("nombre").value;
        let email = document.getElementById("email").value;

        if (nombre === "" || email === "") {
            mensajeElement.textContent = "Error: Por favor, completa todos los campos.";
        } else {

            mensajeElement.textContent = "¡Formulario enviado con éxito!";
        }


        setTimeout(function() {
            mensajeElement.textContent = "";
            location.reload();
        }, 3000);
    });