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

function updateCartTotal(totalSum = 0) {
    const totalSumElement = document.getElementById('totalPrice');
    if (totalSumElement) {
        totalSumElement.textContent = `${totalSum.toLocaleString()} грн`;
    }
}