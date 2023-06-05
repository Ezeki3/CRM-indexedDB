(function () {
  let DB;

  document.addEventListener('DOMContentLoaded', () => {
    conectarDB();

    // Verificar el ID de la URL
    const parametrosURL = new URLSearchParams(window.location.search);
    const idCliente = parametrosURL.get('id');
    if (idCliente) {
      // para que le demos tiempo a buscar la DB o usar programacion asincrona
      setTimeout(() => {
        obtenerCliente(idCliente);
      }, 1000);
    }

  });

  function obtenerCliente(id) {
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    const cliente = objectStore.openCursor();
    cliente.onsuccess = function (e) {
      const cursor = e.target.result;

      if (cursor) {

        // nos trae la info del cliente
        if (cursor.value.id === Number(id)) {
          console.log(cursor.value);
        }
        cursor.continue();
      }
    }

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