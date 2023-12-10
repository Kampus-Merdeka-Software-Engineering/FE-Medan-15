const products = [
    {
        id: 'rooms1',
        name: 'Jelaja Hotel Room',
        image: 'image/r1.jpg',
        price: 899000,
    },
    {
        id: 'rooms2',
        name: 'Jelaja Hotel Twin Bedroom',
        image: 'image/r2.jpg',
        price: 999000,
    },
    {
        id: 'rooms3',
        name: 'Jelaja Hotel Superior Room',
        image: 'image/r3.jpg',
        price: 1499000,
    },
    {
        id: 'rooms4',
        name: 'Jelaja Hotel Suite Room',
        image: 'image/r4.jpg',
        price: 2499000,
    },
    {
        id: 'rooms5',
        name: 'Jelaja Hotel Terrace Room',
        image: 'image/r5.jpg',
        price: 1799000,
    },
    {
        id: 'rooms6',
        name: 'Jelaja Hotel Luxurious Room',
        image: 'image/r6.jpg',
        price: 1899000,
    },
];

// Function to set default values for productName and productPrice
function setProductInfo() {
    // Check if there are URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get the selected room ID from the URL parameters
    const selectedRoomId = urlParams.get('roomId');

    // Find the selected room in the products array
    const selectedProduct = products.find(product => product.id === selectedRoomId);

    // Set the values to the respective input fields
    if (selectedProduct) {
        document.getElementById('productName').value = selectedProduct.name;
        // Save the original product price as a data attribute
        document.getElementById('productPrice').setAttribute('data-original-price', selectedProduct.price);
        // Display the default room price without any calculation
        document.getElementById('productPrice').value = formatPrice(selectedProduct.price);
    } else {
        // Set default values or handle the case when no room is selected
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productPrice').removeAttribute('data-original-price');
    }
}

// Function to format price in Indonesian Rupiah (IDR)
function formatPrice(price) {
    return price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}

// Function to calculate total price based on quantity
function calculateTotalPrice() {
    const quantity = document.getElementById('quantity').value;
    const originalProductPrice = parseFloat(document.getElementById('productPrice').getAttribute('data-original-price'));
    
    // Use the original product price as the default if quantity is not provided
    const totalPrice = quantity ? quantity * originalProductPrice : originalProductPrice;

    // Display the calculated total price in the productPrice input
    document.getElementById('productPrice').value = formatPrice(totalPrice);
}


// Function to update minimum date value
function updateMinDate() {
    let today = new Date(); // Change const to let
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    // Set minimum value for date input elements
    document.getElementById('myDate').min = today;
    document.getElementById('myDate2').min = today;
}


// Call both functions when the page loads
window.onload = function () {
    setProductInfo();
    updateMinDate();
    // Add event listener after setting product information
    document.getElementById('quantity').addEventListener('input', calculateTotalPrice);
};
