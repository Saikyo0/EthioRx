document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('category-filter');
    const storeFilter = document.getElementById('store-filter');
    const productList = document.getElementById('product-list');

    let products = JSON.parse(sessionStorage.getItem('products'));
    if (!products) {
        const products = [
            // Medications
            { name: 'Ibuprofen [250mg]', category: 'medication', price: '100 Birr', img: '../resources/images/medicene/ibuprofen.jpg', perscription: "false", stores: ['droga', 'arsho', 'amin'] },
            { name: 'Paracetamol [100mg]', category: 'medication', price: '80 Birr', img: '../resources/images/medicene/paracetamol.jpg', perscription: "false", stores: ['droga', 'gishen'] },
            { name: 'Amoxicillin [50mg]', category: 'medication', price: '150 Birr', img: '../resources/images/medicene/amoxicillin.jpg', perscription: "false", stores: ['droga', 'gishen', 'amin'] },
            { name: 'Loratadine [60mg]', category: 'medication', price: '120 Birr', img: '../resources/images/medicene/loratadine.jpg', perscription: "true", stores: ['amin'] },
            { name: 'Omeprazole [30mg]', category: 'medication', price: '200 Birr', img: '../resources/images/medicene/omeprazole.jpg', perscription: "true", stores: ['droga', 'gishen', 'sas'] },

            // Supplements
            { name: 'Vitamin C [30mg]', category: 'supplements', price: '80 Birr', img: '../resources/images/medicene/vitaminc.jpg', perscription: "false", stores: ['droga', 'gishen', 'arsho'] },
            { name: 'Vitamin D3 [10mg]', category: 'supplements', price: '100 Birr', img: '../resources/images/medicene/vitamind3.jpg', perscription: "false", stores: ['droga', 'gishen'] },
            { name: 'Omega-3 Fish Oil [3000 UI]', category: 'supplements', price: '150 Birr', img: '../resources/images/medicene/omega3.jpg', perscription: "false", stores: ['droga', 'amin', 'epss'] },
            { name: 'Multivitamins [60mg]', category: 'supplements', price: '120 Birr', img: '../resources/images/medicene/multivitamins.jpg', perscription: "false", stores: ['droga', 'gishen', 'amin'] },
            { name: 'Magnesium [60mg]', category: 'supplements', price: '90 Birr', img: '../resources/images/medicene/magnesium.jpg', perscription: "false", stores: ['droga', 'amin', 'epss'] },

            // Medical Equipment
            { name: 'Blood Pressure Monitor', category: 'equipment', price: '450 Birr', img: '../resources/images/medicene/bloodmonitor.jpg', perscription: "false", stores: ['gishen', 'arsho'] },
            { name: 'Thermometer', category: 'equipment', price: '150 Birr', img: '../resources/images/medicene/thermometer.jpg', perscription: "false", stores: ['gishen', 'amin', 'sas'] },
            { name: 'Pulse Oximeter', category: 'equipment', price: '300 Birr', img: '../resources/images/medicene/pulseoximeter.jpg', perscription: "false", stores: ['gishen', 'sas'] },
            { name: 'Nebulizer', category: 'equipment', price: '600 Birr', img: '../resources/images/medicene/nebulizer.jpg', perscription: "false", stores: [ 'gishen', 'amin', 'arsho'] },
            { name: 'First Aid Kit', category: 'equipment', price: '250 Birr', img: '../resources/images/medicene/firstaidkit.jpg', perscription: "false", stores: ['droga', 'amin', 'epss'] },
        ];
        sessionStorage.setItem('products', JSON.stringify(products));
    }

    products = JSON.parse(sessionStorage.getItem('products'));

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-category', product.category.toLowerCase());

            const productBox = document.createElement('div');
            productBox.id = 'product-box';

            const productIMGBox = document.createElement('div');
            const productImg = document.createElement('img');
            productImg.id = "prod-img";
            productImg.src = product.img;
            productIMGBox.appendChild(productImg);

            const storeLogosGroup = document.createElement('hgroup');
            storeLogosGroup.style.gap = "20px";
            storeLogosGroup.style.display = 'flex';
            storeLogosGroup.style.width = '200px';
            storeLogosGroup.style.height = '50px';
            storeLogosGroup.style.flexWrap = 'wrap';
            storeLogosGroup.style.justifyContent = 'flex-end';
            product.stores.forEach(store => {
              const storeIcon = document.createElement('img');
              storeIcon.id = "store-icon";
              storeIcon.src = `../resources/images/logos/mini/${store.toLowerCase()}.png`;
              storeIcon.style.filter = "grayscale(1)";
              storeLogosGroup.appendChild(storeIcon);
            });
            productIMGBox.appendChild(storeLogosGroup);
            productBox.appendChild(productIMGBox);
            
            const productNameTop = document.createElement('hgroup');
            productNameTop.style.display = "flex";
            productNameTop.style.gap = "20px";
            const productName = document.createElement('h3');
            productName.textContent = product.name;
            productNameTop.appendChild(productName);

            if(product.perscription == "true"){
                const productRxIcon = document.createElement('img');
                productRxIcon.id = "rx-icon";
                productRxIcon.src = "../resources/images/icons/rxicon.png";
                productRxIcon.alt = "Perscription Only";
                productNameTop.appendChild(productRxIcon);
            }
            productBox.appendChild(productNameTop);

            const productPrice = document.createElement('p');
            productPrice.textContent = product.price;
            productPrice.style.color = "green";
            productPrice.style.font = "monospace";
            productPrice.style.fontWeight = "bold";
            productBox.appendChild(productPrice);

            const productBtn = document.createElement('button');
            productBtn.textContent = "ADD TO CART";
            productBtn.className = "buy-button";
            productBtn.addEventListener('click', () => addToCart(product));
            productBox.appendChild(productBtn);

            productCard.appendChild(productBox);
            productList.appendChild(productCard);
        });

        const emptyp = document.createElement('p');
        emptyp.textContent = "No such product";
        emptyp.style.color = "white";
        products.length === 0 ? productList.appendChild(emptyp) : "none";
    }

    // Function to add product to cart
    function addToCart(product) {
        let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        const existingProduct = cart.find(p => p.name === product.name);

        if (existingProduct) {
            existingProduct.amount += 1;
        } else {
            product.amount = 1;
            cart.push(product);
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart');
        console.log('Product added to cart:', product);
    }

    function filterProducts() {
        const searchValue = searchInput.value.toLowerCase();
        const categoryValue = categoryFilter.value;
        const storeValue = storeFilter.value;

        const filteredProducts = products.filter(product => {
            const productName = product.name.toLowerCase();
            const productCategory = product.category.toLowerCase();
            const matchesSearch = productName.includes(searchValue);
            const matchesCategory =  productCategory === categoryValue.toLowerCase();
            const matchesStore = storeValue === 'all' || product.stores.includes(storeValue);

            return matchesSearch && matchesCategory && matchesStore;
        });
        displayProducts(filteredProducts);
    }

    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    storeFilter.addEventListener('change', filterProducts);

    // Initial display of products
    filterProducts();
});
