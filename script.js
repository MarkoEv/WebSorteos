const chooseTicketBtn = document.getElementById('chooseTicketBtn');
const ticketModal = document.getElementById('ticketModal');
const formModal = document.getElementById('formModal');
const ticketsContainer = document.getElementById('ticketsContainer');
const confirmSelectionBtn = document.getElementById('confirmSelectionBtn');
const sendFormBtn = document.getElementById('sendFormBtn');
const generateTicketsBtn = document.getElementById('generateTicketsBtn');
const generateTicketsModal = document.getElementById('generateTicketsModal');
const ticketCountInput = document.getElementById('ticketCountInput');
const generateTicketsConfirmBtn = document.getElementById('generateTicketsConfirmBtn');
const smallModalLoading = document.getElementById('smallModalLoading');
const generatedTicketsContainer = document.getElementById('generatedTicketsContainer');
const saveSelectionBtn = document.getElementById('saveSelectionBtn');
const selectAllBtn = document.getElementById('selectAllBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const totalSelected = document.getElementById('totalSelected');
const totalCost = document.getElementById('totalCost');
const ticketSearch = document.getElementById('ticketSearch');

let selectedTickets = [];
let allTickets = [];
let generatedTickets = [];

// Generar botones de boletos con ícono de ticket
function generateTickets() {
  for (let i = 1; i <= 10000; i++) { // Cambiado a 10,000 boletos
    const ticketBtn = document.createElement('button');
    ticketBtn.classList.add('ticket-btn');
    ticketBtn.innerHTML = `<i class="fa fa-ticket"></i><span>${i}</span>`;
    ticketBtn.setAttribute('data-ticket', i); // Guardar el número del boleto como atributo
    ticketBtn.addEventListener('click', () => toggleTicketSelection(ticketBtn, i));
    ticketsContainer.appendChild(ticketBtn);
    allTickets.push(ticketBtn);
  }
}

// Alternar selección de boletos
function toggleTicketSelection(button, ticketNumber) {
  if (button.classList.contains('selected')) {
    button.classList.remove('selected');
    selectedTickets = selectedTickets.filter(ticket => ticket !== ticketNumber);
  } else {
    button.classList.add('selected');
    selectedTickets.push(ticketNumber);
  }
  updateSelectionSummary();
}
// Actualizar resumen de selección
function updateSelectionSummary() {
  totalSelected.textContent = selectedTickets.length;
  totalCost.textContent = selectedTickets.length * 15;
  confirmSelectionBtn.disabled = selectedTickets.length === 0;
}

// Mostrar modal de selección de boletos
chooseTicketBtn.addEventListener('click', () => {
  ticketModal.style.display = 'flex';
});

// Cerrar modal al hacer clic fuera
ticketModal.addEventListener('click', (e) => {
  if (e.target === ticketModal) {
    ticketModal.style.display = 'none';
  }
});

formModal.addEventListener('click', (e) => {
  if (e.target === formModal) {
    formModal.style.display = 'none';
  }
});
// Función para actualizar los números seleccionados con íconos
function updateSelectedNumbers() {
    const selectedNumbersContainer = document.getElementById('selectedNumbers');
    selectedNumbersContainer.innerHTML = ''; // Limpiar el contenedor
  
    if (selectedTickets.length > 0) {
      selectedTickets.forEach(number => {
        // Crear un contenedor para cada número seleccionado
        const numberElement = document.createElement('span');
        numberElement.classList.add('selected-number');
        numberElement.setAttribute('title', 'Eliminar de mi lista'); // Añadir título
  
        // Agregar ícono y número
        numberElement.innerHTML = `<i class="fa fa-ticket"></i> ${number}`;
  
        // Agregar evento de clic para eliminar el boleto
        numberElement.addEventListener('click', () => {
          // Eliminar el boleto de la lista de selección
          selectedTickets = selectedTickets.filter(ticket => ticket !== number);
  
          // Actualizar la interfaz
          updateSelectionSummary();
          updateSelectedNumbers();
  
          // Desmarcar el boleto en el grid principal
          const originalTicket = allTickets.find(ticket => parseInt(ticket.getAttribute('data-ticket')) === number);
          if (originalTicket) {
            originalTicket.classList.remove('selected');
          }
        });
  
        // Agregar el número al contenedor
        selectedNumbersContainer.appendChild(numberElement);
      });
    } else {
      selectedNumbersContainer.innerHTML = 'Ningún boleto seleccionado';
    }
  }
  
  // Actualizar resumen de selección
  function updateSelectionSummary() {
    totalSelected.textContent = selectedTickets.length;
    totalCost.textContent = selectedTickets.length * 15;
    confirmSelectionBtn.disabled = selectedTickets.length === 0;
  
    // Actualizar los números seleccionados con íconos
    updateSelectedNumbers();
  }
  
// Confirmar selección de boletos y mostrar formulario
confirmSelectionBtn.addEventListener('click', () => handleConfirmSelection());

function handleConfirmSelection() {
  if (selectedTickets.length > 0) {
    ticketModal.style.display = 'none';
    formModal.style.display = 'flex';
  }
}

// Enviar datos por WhatsApp y eliminar boletos seleccionados
sendFormBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (!name || !email || !phone) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  const message = `Nombre: ${name}%0AEmail: ${email}%0ATeléfono: ${phone}%0ABoletos seleccionados: ${selectedTickets.join(', ')}`;
  const whatsappUrl = `https://wa.me/+527471366686?text=${message}`;
  window.open(whatsappUrl, '_blank');

  // Limpiar selecciones
  selectedTickets = [];
  allTickets.forEach(ticket => ticket.classList.remove('selected'));
  updateSelectionSummary();
  formModal.style.display = 'none';
});

// Mostrar modal pequeña para generar boletos
generateTicketsBtn.addEventListener('click', () => {
  generateTicketsModal.style.display = 'block';
});

// Generar boletos al hacer clic en "Generar"
generateTicketsConfirmBtn.addEventListener('click', () => {
  const count = parseInt(ticketCountInput.value);
  if (!count || count < 1 || count > 100) { // Límite actualizado a 100
    alert(`Por favor, ingresa una cantidad válida entre 1 y 100.`);
    return;
  }

  // Mostrar loading
  smallModalLoading.style.display = 'block';
  generatedTicketsContainer.innerHTML = '';
  generatedTicketsContainer.style.display = 'none';

  setTimeout(() => {
    smallModalLoading.style.display = 'none';
    generatedTicketsContainer.style.display = 'grid';

    // Generar números aleatorios únicos
    generatedTickets = [];
    while (generatedTickets.length < count) {
      const randomTicket = Math.floor(Math.random() * 10000) + 1; // Cambiado a 10,000
      if (!generatedTickets.includes(randomTicket)) {
        generatedTickets.push(randomTicket);
      }
    }

    // Mostrar los boletos generados
    generatedTickets.forEach(number => {
      const ticketBtn = document.createElement('button');
      ticketBtn.classList.add('ticket-btn');
      ticketBtn.innerHTML = `<i class="fa fa-ticket"></i><span>${number}</span>`;
      ticketBtn.setAttribute('data-ticket', number);
      ticketBtn.addEventListener('click', () => toggleTicketSelection(ticketBtn, number));
      generatedTicketsContainer.appendChild(ticketBtn);
    });
  }, 1000);
});

// Guardar selección
saveSelectionBtn.addEventListener('click', () => {
  generatedTicketsContainer.querySelectorAll('.ticket-btn.selected').forEach(ticketBtn => {
    const ticketNumber = parseInt(ticketBtn.getAttribute('data-ticket'));
    if (!selectedTickets.includes(ticketNumber)) {
      selectedTickets.push(ticketNumber);
      const originalTicket = allTickets.find(ticket => parseInt(ticket.getAttribute('data-ticket')) === ticketNumber);
      if (originalTicket) {
        originalTicket.classList.add('selected');
      }
    }
  });
  updateSelectionSummary();
  generateTicketsModal.style.display = 'none';
});

// Seleccionar todos los boletos generados
selectAllBtn.addEventListener('click', () => {
  generatedTicketsContainer.querySelectorAll('.ticket-btn').forEach(ticketBtn => {
    const ticketNumber = parseInt(ticketBtn.getAttribute('data-ticket'));
    if (!selectedTickets.includes(ticketNumber)) {
      selectedTickets.push(ticketNumber);
      ticketBtn.classList.add('selected');
      const originalTicket = allTickets.find(ticket => parseInt(ticket.getAttribute('data-ticket')) === ticketNumber);
      if (originalTicket) {
        originalTicket.classList.add('selected');
      }
    }
  });
  updateSelectionSummary();
  generateTicketsModal.style.display = 'none';
});

// Cerrar modal
closeModalBtn.addEventListener('click', () => {
  generateTicketsModal.style.display = 'none';
});

// Filtrar boletos por búsqueda
ticketSearch.addEventListener('input', () => {
  const query = ticketSearch.value.trim().toLowerCase();
  allTickets.forEach(ticket => {
    const ticketNumber = ticket.getAttribute('data-ticket');
    if (ticketNumber.includes(query)) {
      ticket.style.display = ''; // Mostrar boleto si coincide
    } else {
      ticket.style.display = 'none'; // Ocultar boleto si no coincide
    }
  });
});


// Botón para continuar eligiendo boletos
document.getElementById('continueSelectingBtn').addEventListener('click', () => {
    // Ocultar el modal de formulario
    document.getElementById('formModal').style.display = 'none';
  
    // Mostrar el modal principal de selección de boletos
    document.getElementById('ticketModal').style.display = 'flex';
  });
// Inicializar
generateTickets();
