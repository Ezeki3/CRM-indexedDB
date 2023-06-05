(function () {

  document.addEventListener('DOMContentLoaded', () => {

    // Verificar el ID de la URL
    const parametrosURL = new URLSearchParams(window.location.search);
    const idCliente = parametrosURL.get('id');
    console.log(idCliente);
  })


})();