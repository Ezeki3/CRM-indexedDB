(function () {

  let DB;

  document.addEventListener('DOMContentLoaded', () => {
    crearDB();

    if (window.location.open('crm', 1)) {
      obtenerClientes();
    }

  });

  // crea la base de datos de IndexDB
  function crearDB() {
    const crearDB = window.indexedDB.open('crm', 1);

    crearDB.onerror = function () {
      console.log('Hubo un error');
    };

    crearDB.onsuccess = function () {
      DB = crearDB.result;
    };

    crearDB.onupgradeneeded = function (e) {
      const db = e.target.result;

      const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });

      objectStore.createIndex('nombre', 'nombre', { unique: false });
      objectStore.createIndex('email', 'email', { unique: true });
      objectStore.createIndex('telefono', 'telefono', { unique: false });
      objectStore.createIndex('empresa', 'empresa', { unique: false });
      objectStore.createIndex('id', 'id', { unique: true });

      console.log('DB lista y creada');
    }
  }

  function obtenerClientes(){
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror = function(){
      console.log('hubo un error');
    };

    abrirConexion.onsuccess = function(){
      DB = abrirConexion.result;

      const objectStore = DB.transaction('crm').objectStore('crm');

      objectStore.openCursor().onsuccess = function(e){
        const cursor = e.target.result;
      }
    }
  }


})();