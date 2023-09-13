const apiUrl = 'https://makeup-api.herokuapp.com/api/v1/products.json';

async function fetchMakeupData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayMakeupProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = document.createElement('img');
        productImage.src = product.image_link;

        const productName = document.createElement('h2');
        productName.textContent = product.name;

        const productBrand = document.createElement('p');
        productBrand.textContent = `Brand: ${product.brand}`;

        const productPrice = document.createElement('p');
        productPrice.textContent = `Price: $${product.price}`;

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;

        const productLink = document.createElement('a');
        productLink.href = product.product_link;
        productLink.textContent = 'View Product';

        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productBrand);
        productCard.appendChild(productPrice);
        productCard.appendChild(productDescription);
        productCard.appendChild(productLink);

        productsContainer.appendChild(productCard);
    });
}

function filterProducts(products, query) {
    return products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
}

document.getElementById('searchInput').addEventListener('input', async (event) => {
    const searchQuery = event.target.value;
    const makeupData = await fetchMakeupData();
    const filteredProducts = filterProducts(makeupData, searchQuery);
    displayMakeupProducts(filteredProducts);
});

(async () => {
    const makeupData = await fetchMakeupData();
    displayMakeupProducts(makeupData);
})();