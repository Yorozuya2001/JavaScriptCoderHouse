//Api EmailJS

const btn = document.getElementById('button');

document.getElementById('form')
.addEventListener('submit', function(event) {
event.preventDefault();

btn.value = 'Enviando...';

const serviceID = 'default_service';
const templateID = 'template_e9t7thw';

emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
    btn.value = 'Enviado';
    Swal.fire({
        icon: 'success',
        title: 'Se ha enviado correctamente el formulario',
        text: 'Recibiras una respuesta en 24 horas hábiles',
    })
    }, (err) => {
    btn.value = 'Enviar';
    Swal.fire({
        icon: 'error',
        title: 'Oops. Algo salio mal :(',
        text: 'Hubo un problema al enviar el formulario',
    })
    });
});
