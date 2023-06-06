(function () {
  let DB;
  let idCliente;

  const nombreInput = document.querySelector('#nombre');
  const emailInput = document.querySelector('#email');
  const telefonoInput = document.querySelector('#telefono');
  const empresaInput = document.querySelector('#empresa');

  const formulario = document.querySelector('#formulario');


  document.addEventListener('DOMContentLoaded', () => {
    conectarDB();

    // Actuliza el registro
    formulario.addEventListener('submit', actulizarCliente);

    // Verificar el ID de la URL
    const parametrosURL = new URLSearchParams(window.location.search);
    idCliente = parametrosURL.get('id');
    if (idCliente) {
      // para que le demos tiempo a buscar la DB o usar programacion asincrona
      setTimeout(() => {
        obtenerCliente(idCliente);
      }, 100);
    }

  });

  function actulizarCliente(e) {
    e.preventDefault();

    if (nombreInput.value === '' || emailInput.value === '' || telefonoInput.value === '' || empresaInput.value === '') {
      imprimirAlerta('Todos los camos son obligatorios', 'error');
      return;
    }

    // Actualizar cliente
    const clienteActualizado = {
      nombre: nombreInput.value,
      email: emailInput.value,
      telefono: telefonoInput.value,
      empresa: empresaInput.value,
      id: Number(idCliente)
    }
    console.log(clienteActualizado);

  }

  function obtenerCliente(id) {
    const transaction = DB.transaction(['crm'], 'readonly');
    const objectStore = transaction.objectStore('crm');

    const cliente = objectStore.openCursor();
    cliente.onsuccess = function (e) {
      const cursor = e.target.result;

      if (cursor) {

        // nos trae la info del cliente
        if (cursor.value.id === Number(id)) {
          llenarFormulario(cursor.value);
        }
        cursor.continue();
      }
    }
  }

  function llenarFormulario(datosCliente) {
    const { nombre, email, telefono, empresa } = datosCliente;

    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
  }

  function conectarDB() {
    const abrirConexion = window.indexedDB.open('crm', 1)
 
    abrirConexion.onerror = function () {
      console.log('No se pudo crear la base de datos')
    }
 
    abrirConexion.onsuccess = function () {
      DB = abrirConexion.result
    }
  }


})();