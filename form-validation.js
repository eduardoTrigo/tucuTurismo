document.getElementById('imagen').addEventListener('change', function(event) {
    var fileName = event.target.files[0].name;
    var nextSibling = event.target.nextElementSibling;
    nextSibling.innerText = fileName;
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let valid = true;
    const fields = ['nombre', 'email', 'telefono', 'asunto', 'mensaje', 'terminos'];
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.checkValidity()) {
            valid = false;
            element.classList.add('is-invalid');
        } else {
            element.classList.remove('is-invalid');
        }
    });

    // Validar los radios
    const generoElements = document.getElementsByName('genero');
    let generoValid = false;
    for (let i = 0; i < generoElements.length; i++) {
        if (generoElements[i].checked) {
            generoValid = true;
            break;
        }
    }
    if (!generoValid) {
        valid = false;
        generoElements[0].closest('.form-group').classList.add('is-invalid');
    } else {
        generoElements[0].closest('.form-group').classList.remove('is-invalid');
    }

    // Validar el campo de imagen
    const imagenElement = document.getElementById('imagen');
    if (!imagenElement.files.length) {
        valid = false;
        imagenElement.classList.add('is-invalid');
    } else {
        imagenElement.classList.remove('is-invalid');
    }

    if (valid) {
        document.getElementById('formMessage').innerHTML = '<div class="alert alert-success">Formulario enviado con éxito!</div>';
    } else {
        document.getElementById('formMessage').innerHTML = '<div class="alert alert-danger">Por favor, completa todos los campos requeridos.</div>';
    }
});
