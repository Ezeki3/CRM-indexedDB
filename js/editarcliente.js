(function () {
  let DB;

  document.addEventListener('DOMContentLoaded', () => {
    conectarDB();

    // Verificar el ID de la URL
    const parametrosURL = new URLSearchParams(window.location.search);
    const idCliente = parametrosURL.get('id');
    if (idCliente) {
      obtenerCliente(idCliente);
    }

  });

  function obtenerCliente(id) {
    console.log(id);
  }

  function conectarDB() {
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror = function () {
      console.log('Error al abrir la conexión a la base de datos');
    };

    abrirConexion.onsuccess = function () {
      DB = abrirConexion.result;
    }

  }


})();