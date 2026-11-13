const API_URL = 'http://localhost:3000/api';

const backToShopBtns = document.querySelectorAll('.btn-secondary');
const modals = document.querySelectorAll('.modal-overlay');
const quantityModal = document.getElementById('quantityModal');
const quantityInput = document.getElementById('productQuantity');
const addToCardConfirm = document.getElementById('confirmAddToCartBtn');
const successModal = document.getElementById('successModal');
const goToCartBtn = document.getElementById('goToCartBtn');
const cartPage = document.getElementById('cartPage');
const cartHeaderIcon = document.getElementById('cartHeaderIcon');
const backToShopBtn = document.getElementById('backToShopBtn');
const cartItems = document.getElementById('cartItems');
const purchaseBtn = document.getElementById('makePurchase');
const afterPurchaseModal = document.getElementById('afterPurchaseModal');

let selectedProductId = null; // Зберігаємо ID обраного товару перед підтвердженням у модалці


// ================= API-ЗАПИТИ =================

async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error('Не вдалося завантажити товари');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Помилка завантаження товарів:', error);
    }
}

async function loadCart() {
    try {
        const response = await fetch(`${API_URL}/cart`);
        if (!response.ok) throw new Error('Не вдалося завантажити кошик');
        const items = await response.json();
        renderCart(items);
    } catch (error) {
        console.error('Помилка завантаження кошика:', error);
    }
}

async function addToCart(productId, quantity = 1) {
    try {
        const response = await fetch(`${API_URL}/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: Number(productId), quantity: Number(quantity) })
        });
        if (!response.ok) throw new Error('Помилка при додаванні товару');
        await loadCart(); // Оновлюємо кошик та лічильник на іконці
    } catch (error) {
        console.error(error);
    }
}

async function updateCartItemQuantity(cartItemId, newAmount) {
    try {
        const response = await fetch(`${API_URL}/cart/${cartItemId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: Number(newAmount) })
        });
        if (!response.ok) throw new Error('Помилка при оновленні кількості');
        await loadCart();
    } catch (error) {
        console.error(error);
    }
}

async function removeFromCart(cartItemId) {
    try {
        const response = await fetch(`${API_URL}/cart/${cartItemId}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Помилка при видаленні товару');
        await loadCart();
    } catch (error) {
        console.error(error);
    }
}

async function createOrder() {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST'
        });
        const data = await response.json();
        if (!response.ok) {
            alert(data.message || 'Помилка при оформленні замовлення');
            return false;
        }
        await loadCart(); // Після оформлення кошик у БД очистився — оновлюємо інтерфейс
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


// ================= ОБРОБНИКИ ПОДІЙ =================

// Модальні вікна (закриття)
backToShopBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        modals.forEach(modal => modal.classList.remove('active'));
    });
});

// Клік на "у корзину" на картці товару -> відкриваємо модалку вибору кількості
document.addEventListener('click', (event) => {
    const button = event.target.closest('.add-to-cart-btn');
    if (!button) return;

    event.preventDefault();
    selectedProductId = button.closest('.container').getAttribute('data-id');
    if (quantityInput) quantityInput.value = 1;
    quantityModal.classList.add('active');
});

// Підтвердження додавання у модалці -> відправляємо POST /api/cart
addToCardConfirm.addEventListener('click', async (event) => {
    event.preventDefault();
    if (!selectedProductId) return;

    let qty = quantityInput ? parseInt(quantityInput.value) : 1;
    if (isNaN(qty) || qty < 1 || qty > 99) qty = 1;

    await addToCart(selectedProductId, qty);
    quantityModal.classList.remove('active');
    successModal.classList.add('active');
});

goToCartBtn.addEventListener('click', (event) => {
    event.preventDefault();
    successModal.classList.remove('active');
    cartPage.classList.remove('hidden');
});

// Кошик (відкриття / закриття)
cartHeaderIcon.addEventListener('click', (event) => {
    event.preventDefault();
    cartPage.classList.remove('hidden');
});

backToShopBtn.addEventListener('click', (event) => {
    event.preventDefault();
    cartPage.classList.add('hidden');
});

// Видалення товару з кошика
cartItems.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const itemCard = event.target.closest('.item');
        const itemId = itemCard.getAttribute('data-id');
        await removeFromCart(itemId);
    }
});

// Зміна кількості товарів в кошику
cartItems.addEventListener('keydown', (event) => {
    if (event.target.classList.contains('amount-input') && event.key === 'Enter') {
        event.target.blur();
    }
});

cartItems.addEventListener('change', async (event) => {
    if (event.target.classList.contains('amount-input')) {
        const input = event.target;
        const itemId = input.dataset.id;
        let newAmount = parseInt(input.value);

        if (isNaN(newAmount) || newAmount < 1 || newAmount > 99) {
            newAmount = 1;
        }

        input.value = newAmount;
        await updateCartItemQuantity(itemId, newAmount);
    }
});

// "Оплатити"
purchaseBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    const isSuccess = await createOrder();
    if (isSuccess) {
        cartPage.classList.add('hidden');
        afterPurchaseModal.classList.add('active');
    }
});


// ================= РОЗМІТКА =================

function renderProducts(products) {
    const wrapper = document.querySelector('.wrapper');
    const leftArrow = wrapper.querySelector('.slide__left');

    wrapper.querySelectorAll('.container').forEach(card => card.remove());

    products.forEach(product => {
        let badgeHTML = '';
        if (product.badge === 'new') {
            badgeHTML = `<div class="bage new">новинка</div>`;
        } else if (product.badge === 'sales') {
            badgeHTML = `<div class="bage sales">хіт продажу</div>`;
        }

        let priceHTML = '';
        if (product.in_stock && product.price) {
            const discountSpan = product.discount 
                ? `<span class="discount">${Number(product.discount).toLocaleString()}₴</span>` 
                : `<span class="discount"></span>`;
            priceHTML = `${discountSpan}${Number(product.price).toLocaleString()}₴`;
        }

        const buttonHTML = product.in_stock
            ? `<div class="button"><a href="#" class="btn add-to-cart-btn">у корзину</a></div>`
            : `<div class="button not_available"><a href="#" class="btn">незабаром у продажі</a></div>`;

        const cardHTML = `
            <div class="container" data-id="${product.id}">
                ${badgeHTML}
                <div class="title">
                    <a href="${product.category_url}" target="_blank">${product.category}</a>
                </div>
                <div class="image">
                    <a href="${product.image_url}" class="image_link" target="_blank">
                        <img src="${product.image_url}" alt="фотографія пральної машинки">
                    </a>
                    <div class="name">
                        <a href="${product.product_url}" class="link" target="_blank">${product.name}</a>
                    </div>
                </div>
                <div class="price">${priceHTML}</div>
                ${buttonHTML}
            </div>
        `;

        leftArrow.insertAdjacentHTML('beforebegin', cardHTML);
    });
}

function renderCart(items) {
    cartItems.innerHTML = '';
    let totalSum = 0;
    let totalCount = 0;

    items.forEach(item => {
        const itemPrice = Number(item.price);
        const itemTotal = itemPrice * item.amount;
        totalSum += itemTotal;
        totalCount += item.amount;

        const discountHTML = item.discount 
            ? `<span class="discount">${Number(item.discount).toLocaleString()}₴</span>` 
            : '';

        const itemHTML = `
            <div class="item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${discountHTML}${itemPrice.toLocaleString()}₴</div>
                </div>
                <input type="number" class="amount-input" data-id="${item.id}" value="${item.amount}" min="1" max="99">
                <button class="delete-btn">Вилучити</button>
            </div>
        `;
        cartItems.insertAdjacentHTML('beforeend', itemHTML);
    });

    updateCartTotal(totalSum);

    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        cartBadge.textContent = totalCount;
    }
}

function updateCartTotal(totalSum = 0) {
    const totalSumElement = document.getElementById('totalPrice');
    if (totalSumElement) {
        totalSumElement.textContent = `${totalSum.toLocaleString()} грн`;
    }
}

// Ініціалізація при завантаженні сторінки
loadProducts();
loadCart();