(function () {

  let DB;

  document.addEventListener('DOMContentLoaded', () => {
    crearDB();
  });

  // crea la base de datos
  function crearDB() {
    const crearDB = window.indexedDB.open('crm', 1);

    crearDB.onerror = function () {
      console.log('Hubo un error');
    };

    crearDB.onsuccess = function () {
      DB = crearDB.result;
    }
  }
})