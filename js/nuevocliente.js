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

  function validarCliente(e){
    e.preventDefault();

    // leer todos los inputs
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    if (nombre === '' || email === '' || telefono === '' || empresa === '' ) {
      imprimirAlerta('Todos los campos son obligatorios', 'error');

      return;
    }

  }


})();