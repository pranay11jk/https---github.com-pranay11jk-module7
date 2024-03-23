// Parent class Room
function Room(custName, checkInDate, checkOutDate, rate) {
    this.custName = custName;
    this.checkInDate = new Date(checkInDate);
    this.checkOutDate = new Date(checkOutDate);
    this.rate = rate;
  }
  
  Room.prototype.calculateTotal = function() {
    const days = Math.ceil((this.checkOutDate - this.checkInDate) / (1000 * 60 * 60 * 24));
    const totalWithoutGST = this.rate * days;
    const GST = 0.12;
    const total = totalWithoutGST + (totalWithoutGST * GST);
    return total.toFixed(2);
  }
  
  // Child class Normal
  function Normal(custName, checkInDate, checkOutDate) {
    Room.call(this, custName, checkInDate, checkOutDate, 2000);
  }
  
  Normal.prototype = Object.create(Room.prototype);
  
  // Child class Deluxe
  function Deluxe(custName, checkInDate, checkOutDate) {
    Room.call(this, custName, checkInDate, checkOutDate, 4000);
  }
  
  Deluxe.prototype = Object.create(Room.prototype);
  
  // Event listener for form submission
  document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const custName = document.getElementById('custName').value;
    const checkInDate = document.getElementById('checkInDate').value;
    const checkOutDate = document.getElementById('checkOutDate').value;
    const roomType = document.getElementById('roomType').value;
  
    let room;
    if (roomType === 'normal') {
      room = new Normal(custName, checkInDate, checkOutDate);
    } else if (roomType === 'deluxe') {
      room = new Deluxe(custName, checkInDate, checkOutDate);
    }
  
    const total = room.calculateTotal();
  
    const invoiceHTML = `
      <div class="invoice-content">
        <p><strong>Customer Name:</strong> ${room.custName}</p>
        <p><strong>Check-in Date:</strong> ${room.checkInDate}</p>
        <p><strong>Check-out Date:</strong> ${room.checkOutDate}</p>
        <p><strong>Room Type:</strong> ${roomType}</p>
        <p><strong>Rate/day:</strong> Rs. ${room.rate}</p>
        <p><strong>No. of days:</strong> ${Math.ceil((room.checkOutDate - room.checkInDate) / (1000 * 60 * 60 * 24))}</p>
        <p><strong>GST@12%:</strong> Rs. ${(total - (room.rate * Math.ceil((room.checkOutDate - room.checkInDate) / (1000 * 60 * 60 * 24)))).toFixed(2)}</p>
        <p><strong>Total payable:</strong> Rs. ${total}</p>
        <button class="print-btn" onclick="printInvoice()">Print</button>
        <button class="back-btn" onclick="closeInvoice()">Back</button>
      </div>
    `;
    document.getElementById('invoice').innerHTML = invoiceHTML;
    document.getElementById('invoice').style.display = 'block';
  });
  
  // Event listener for reset button
  document.getElementById('booking-form').addEventListener('reset', function() {
    document.getElementById('invoice').innerHTML = '';
    document.getElementById('invoice').style.display = 'none';
  });
  
  // Function to print the invoice
  function printInvoice() {
    const invoiceContent = document.querySelector('.invoice-content').innerHTML;
    const newWindow = window.open('', '_blank', 'width=600,height=600');
    newWindow.document.body.innerHTML = `
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            .invoice-content {
              border: 1px solid #ccc;
              padding: 20px;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          ${invoiceContent}
          <script>
            window.print();
          </script>
        </body>
      </html>
    `;
  }
  
  // Function to close the invoice preview window
  function closeInvoice() {
    document.getElementById('invoice').innerHTML = '';
    document.getElementById('invoice').style.display = 'none';
  }
  