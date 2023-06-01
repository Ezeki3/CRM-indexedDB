// IIFE
(function(){
  let DB;
  const formulario = document.querySelector('#formulario');

  document.addEventListener('DOMContentLoaded', () =>{
    conectarDB();

    formulario.addEventListener('submit', validarCliente);
  });

  function conectarDB(){
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror = function(){
      console.log('Error al abrir la conexión a la base de datos');
    };

    abrirConexion.onsuccess = function(){
      DB = abrirConexion.result;
    }
  }


})();