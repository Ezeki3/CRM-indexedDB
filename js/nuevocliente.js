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

    // Crear un objeto con la informacion
    const cliente = {
      // Como la llave y el valor tienen el mismo nombre y se puede omitir uno: nombre: nombre
      nombre,
      email,
      telefono,
      empresa,
      id: Date.now()
    }
    
    crearNuevoCliente(cliente);
  }

  function crearNuevoCliente(cliente){
    const transaction = DB.transaction(['crm'], 'readwrite');

    const objectStore = transaction.objectStore('crm');

    objectStore.add(cliente);

    transaction.onerror = function(){

      imprimirAlerta('El email tiene que ser unico', 'error')
    };

    transaction.oncomplete = function(){
      console.log('cliente agregado');
      imprimirAlerta('El cliente se agrego correctamente')

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 3000);
    }
  }



})();