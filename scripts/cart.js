document.addEventListener('DOMContentLoaded', () => {
  // Function to display products in the cart
  function displayCart() {
    const productsGroup = document.querySelector('.products-group');
    productsGroup.innerHTML = '';

    let cartHTML = "";
    let totalCost = 0;
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.forEach((product) => {
        cartHTML += `
            <tr class="product-card">
                <td class="drugInfo">
                    <img src="${product.img}" />
                    <h3 style="font-size: 1.2rem; color: #222222;">${product.name}</h3>
                </td>
                <td class="drugAmount">${product.amount}</td>
                <td class="drugAmount">${(parseFloat(product.price) * product.amount).toFixed(2)} Birr</td>
            </tr>
        `;

        totalCost += parseFloat(product.price) * product.amount;
    });

    productsGroup.innerHTML = `
        <table class="products-table" style="width: 100%;">
          <thead>
            <tr>
              <button style="font-size: 1rem; color: black; width: 80px;" onclick="clearCart();">Clear</button>
              <th>Drug Info</th>
              <th>Amount</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
              ${cartHTML}
          </tbody>
        </table>
        <p style="font-size: 1rem; color: black;">Sum: ${totalCost.toFixed(2)} Birr</p>
        <p style="font-size: 1rem; color: grey;">Delivery: ${(totalCost * 0.15).toFixed(2)} Birr</p>
        <h2 style="font-size: 1.4rem; color: black; display: inline;">Total Cost: <h2 style="font-size: 1.4rem; color: green; display: inline;">${(totalCost + (totalCost * 0.15)).toFixed(2)} Birr</h2></h2>
    `;

    // Check if any product requires a prescription
    const requiresPrescription = cart.some(product => product.perscription === "true");
    const prescGroup = document.querySelector('#presc-group');
    if (requiresPrescription) {
      prescGroup.style.display = "block";
    } else {
      prescGroup.style.display = "none";
    }
  }

  function openMap() {
    let map = L.map('map').setView([9.022854, 38.746905], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
    let marker = L.marker([9.022854, 38.746905], { draggable: true }).addTo(map);
    
    marker.on('dragend', function(event) {
      const { lat, lng } = marker.getLatLng();
      document.querySelector('.setlocation').innerText = `Lat: ${lat}, Lon: ${lng}`;
    });
  }

  displayCart();
  openMap();
});

function clearCart() {
  sessionStorage.removeItem('cart');
  location.reload();
}

function validateForm() {
  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');
  const phoneInput = document.getElementById('phone');
  const cityInput = document.getElementById('city');
  const houseNumberInput = document.getElementById('house-number');
  const locationInput = document.getElementById('setlocation');
  const prescriptionInput = document.getElementById('prescription');
  
  if (nameInput.value.trim() === '' || ageInput.value.trim() === '' || phoneInput.value.trim() === '' || cityInput.value.trim() === '' || houseNumberInput.value.trim() === '' || locationInput.textContent.includes('location not set...')) {
    alert('Please fill in all the required fields.');
    return;
  }

  const namePattern = /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/;
  if (!namePattern.test(nameInput.value)) {
    alert('Please enter your full name.');
    return;
  }

  if (parseInt(ageInput.value) < 18) {
    alert('You must be 18 years of age or older to place an order.');
    return;
  }

  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(phoneInput.value)) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }

  const houseNumberPattern = /^[0-9]{4}$/;
  if (!houseNumberPattern.test(houseNumberInput.value)) {
    alert('Please enter a valid 4-digit house number.');
    return;
  }

  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  const requiresPrescription = cart.some(product => product.perscription === "true");
  if (requiresPrescription) {
    if (!checkPrescriptionExists(prescriptionInput.value)) {
      alert('The entered prescription code does not exist. Please check and try again.');
      return;
    }
  }

  alert('Proceeding to payment...');
}

function checkPrescriptionExists(prescriptionCode) {
  return prescriptionCode === '1234567890';
}