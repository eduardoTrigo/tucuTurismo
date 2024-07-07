document.addEventListener('DOMContentLoaded', () => {
    loadCategories(); // Cargar categorías al cargar la página
    loadRestaurants(); // Cargar restaurantes al cargar la página
});

document.getElementById('restaurantForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('categoryId', document.getElementById('categoryId').value);
    formData.append('image', document.getElementById('imagen').files[0]);

    try {
        const response = await fetch('https://tucuturismo-backend.onrender.com/restaurant', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);
        loadRestaurants(); // Recargar lista de restaurantes después de agregar uno nuevo
        document.getElementById('restaurantForm').reset(); // Limpiar el formulario
        alert('Restaurante cargado exitosamente');
    } catch (error) {
        console.error('Error:', error);
    }
});

async function loadRestaurants() {
    try {
        const response = await fetch('https://tucuturismo-backend.onrender.com/restaurant');
        const restaurants = await response.json();
        const restaurantsContainer = document.getElementById('restaurantsContainer');
        
        // Limpiar contenido existente
        restaurantsContainer.innerHTML = '';
        
        restaurants.forEach(restaurant => {
            const cardHtml = `
                <div class="col">
                    <div class="card">
                        <img src="${restaurant.imagen}" class="card-img-top" alt="${restaurant.name}">
                        <div class="card-body">
                            <h5 class="card-title">${restaurant.name}</h5>
                            <p class="card-text">${restaurant.description}</p>
                            <p class="card-text">${restaurant.address}</p>
                        </div>
                    </div>
                </div>
            `;
            restaurantsContainer.insertAdjacentHTML('beforeend', cardHtml);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para cargar las categorías en el select
async function loadCategories() {
    try {
        const response = await fetch('https://tucuturismo-backend.onrender.com/category');
        const categories = await response.json();
        const categorySelect = document.getElementById('categoryId');
        categorySelect.innerHTML = '<option value="" disabled selected>Seleccione una categoría</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category._id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
