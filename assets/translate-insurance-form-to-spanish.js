  // This function sends a message to the iframe when both the page and iframe are ready
  function sendTranslateMessage() {
    const iframe = document.getElementById('frame_S6JyNwYUyN12xu6yEI_d8Q');
    if (iframe && iframe.contentWindow) {
      const message = {
        type: 'translateForm',
        data: {
          "First Name": "Nombre",
          "Last Name": "Apellido",
          "Email": "Correo Electrónico",
          "Baby’s Birth/Due Date": "Fecha de Nacimiento/Fecha de Vencimiento del Bebé"
        }
      };
      // Sending the message to the iframe
      iframe.contentWindow.postMessage(message, '*');
    }
  }

  // Ensure the DOM is fully loaded before running the script
  document.addEventListener("DOMContentLoaded", function() {
    sendTranslateMessage();
    setTimeout(() => {
        sendTranslateMessage();
    }, 1000);
  });
