const backToShopBtns = document.querySelectorAll('.btn-secondary');
const modals = document.querySelectorAll('.modal-overlay');
const quantityModal = document.getElementById('quantityModal');
const addToCardConfirm = document.getElementById('confirmAddToCartBtn');
const successModal = document.getElementById('successModal');
const goToCartBtn = document.getElementById('goToCartBtn');
const cartPage = document.getElementById('cartPage');
const cartHeaderIcon = document.getElementById('cartHeaderIcon');
const backToShopBtn = document.getElementById('backToShopBtn');
const cartItems = document.getElementById('cartItems');
const purchaseBtn = document.getElementById('makePurchase');
const afterPurchaseModal = document.getElementById('afterPurchaseModal');


// заглушки

async function loadProducts() {
    // TODO: GET /api/products -> завантажити товари з БД та відмалювати картки
}

async function loadCart() {
    // TODO: GET /api/cart -> завантажити кошик з БД, викликати createItem() та updateCartTotal()
}

async function addToCart(productId) {
    // TODO: POST /api/cart -> додати товар у БД або збільшити кількість
}

async function updateCartItemQuantity(cartItemId, newAmount) {
    // TODO: PATCH /api/cart/:id -> оновити кількість товару в БД
}

async function removeFromCart(cartItemId) {
    // TODO: DELETE /api/cart/:id -> видалити позицію з кошика в БД
}

async function createOrder() {
    // TODO: POST /api/orders -> оформити замовлення та очистити кошик у БД
}


// обробники подій

// модальні вікна (закриття)
backToShopBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        modals.forEach(modal => modal.classList.remove('active'));
    });
});

// "у корзину"
document.addEventListener('click', async (event) => {
    const button = event.target.closest('.add-to-cart-btn');
    if (!button) return;

    event.preventDefault();
    const itemId = button.closest('.container').getAttribute('data-id');

    await addToCart(itemId);
    quantityModal.classList.add('active');
});

addToCardConfirm.addEventListener('click', (event) => {
    event.preventDefault();
    quantityModal.classList.remove('active');
    successModal.classList.add('active');
});

goToCartBtn.addEventListener('click', (event) => {
    event.preventDefault();
    successModal.classList.remove('active');
    cartPage.classList.remove('hidden');
});

// кошик (закритя / відкриття)
cartHeaderIcon.addEventListener('click', (event) => {
    event.preventDefault();
    cartPage.classList.remove('hidden');
});

backToShopBtn.addEventListener('click', (event) => {
    event.preventDefault();
    cartPage.classList.add('hidden');
});

// видалення товару з кошика
cartItems.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const itemCard = event.target.closest('.item');
        const itemId = itemCard.getAttribute('data-id');

        await removeFromCart(itemId);
    }
});

// зміна кількості товарів в кошику
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

// "оплатити"
purchaseBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    await createOrder();
    cartPage.classList.add('hidden');
    afterPurchaseModal.classList.add('active');
});


// розмітка

function createItem(item) {
    const itemTotal = item.price * item.amount;

    const itemHTML = `
    <div class="item d-flex" data-id="${item.id}">
        <a class="mini-image image_link" href="#" target="_blank">
            <img src="${item.image}" alt="${item.name}">
        </a>                
        <div class="mini-name name">
            <a href="#" class="link" target="_blank">${item.name}</a>
        </div>
        <div class="mini-price price">
            <span class="discount">${item.discount ? item.discount + ' ' : ''}</span>${item.price} грн
        </div>
        <input type="number" class="amount-input" data-id="${item.id}" value="${item.amount}" min="1" max="99">
        <div class="item-sum">
            <span class="item-total-price">${itemTotal.toLocaleString()}</span> грн
        </div>
        <button class="delete-btn">Вилучити</button>
    </div>    
    `;

    cartItems.insertAdjacentHTML('beforeend', itemHTML);
}

function updateCartTotal(totalSum = 0) {
    const totalSumElement = document.getElementById('totalPrice');
    if (totalSumElement) {
        totalSumElement.textContent = `${totalSum.toLocaleString()} грн`;
    }
}