let allProducts = [
    {
        id: "1",
        name: "сушильна машинка",
        discount: null,
        price: 0,
        amount: 0,
        image: "https://content.rozetka.com.ua/category_tiles/images/original/595563695.jpg"
    },
    {
        id: "2",
        name: "інвенторна машинка",
        discount: 14999,
        price: 12999,
        amount: 0,        
        image: "https://content1.rozetka.com.ua/category_tiles/images/original/595564097.jpg"
    },
    {
        id: "3",
        name: "машинка напівавтомат",
        discount: null,
        price: 2499,
        amount: 0,        
        image: "https://content2.rozetka.com.ua/category_tiles/images/original/595563758.jpg"
    },
    {
        id: "4",
        name: "вузька пральна машинка",
        discount: null,
        price: 16199,
        amount: 0,        
        image: "https://content2.rozetka.com.ua/category_tiles/images/original/595563029.jpg"
    }
];

let currentProducts = new Set();

const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
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


// повернення до магазину / івент лістенери

backToShopBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    });
});


// додавання / івент лістенери
let foundItem;
addToCartBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        let itemId = button.closest('.container').getAttribute('data-id');
        foundItem = allProducts.find(item => item.id == itemId);

        if (foundItem) {
            if (!currentProducts.has(foundItem)) {
                foundItem.amount = 1;
                currentProducts.add(foundItem);
                createItem(foundItem);
            } else {
                foundItem.amount += 1;
                
                const itemRow = cartItems.querySelector(`.item[data-id="${foundItem.id}"]`);
                if (itemRow) {
                    const input = itemRow.querySelector('.amount-input');
                    const totalPriceEl = itemRow.querySelector('.item-total-price');
                    if (input) {
                        input.value = foundItem.amount
                    };
                    if (totalPriceEl) {
                        totalPriceEl.textContent = (foundItem.price * foundItem.amount).toLocaleString();
                    }
                }
            }

            updateCartTotal();
            quantityModal.classList.add('active');
        }
    });
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


// корзина / івент лістенери

cartHeaderIcon.addEventListener('click', (event) => {
    event.preventDefault();

    cartPage.classList.remove('hidden');
});

backToShopBtn.addEventListener('click', (event) => {
    event.preventDefault();

    cartPage.classList.add('hidden');
});

cartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const itemCard = event.target.closest('.item');
        const itemId = itemCard.getAttribute('data-id');

        itemCard.remove();

        const itemToDelete = Array.from(currentProducts).find(item => item.id == itemId);
        if (itemToDelete) {
            itemToDelete.amount = 0;
            currentProducts.delete(itemToDelete);
            updateCartTotal();
        }
    }
});

cartItems.addEventListener('keydown', (event) => {
    if (event.target.classList.contains('amount-input') && event.key === 'Enter') {
        event.target.blur();
    }
});

cartItems.addEventListener('change', (event) => {
    if (event.target.classList.contains('amount-input')) {
        const input = event.target;
        const productId = input.dataset.id;
        let newAmount = parseInt(input.value);

        if (isNaN(newAmount) || newAmount < 1 || newAmount > 99) {
            newAmount = 1;
        }

        input.value = newAmount;

        const product = allProducts.find(item => item.id == productId);
        if (product) {
            product.amount = newAmount;
            
            const itemRow = input.closest('.item');
            const totalPriceEl = itemRow.querySelector('.item-total-price');
            if (totalPriceEl) {
                totalPriceEl.textContent = (product.price * product.amount).toLocaleString();
            }
        }

        updateCartTotal();
    }
});


// генерації (продукт ітема, суми, заміна кількості)

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

function updateCartTotal() {
    let totalSum = 0;
    currentProducts.forEach(product => {
        if (product.amount > 0) {
            totalSum += product.price * product.amount;
        }
    });

    const totalSumElement = document.getElementById('totalPrice');
    if (totalSumElement) {
        totalSumElement.textContent = `${totalSum.toLocaleString()} грн`;
    }
}

// оплата

purchaseBtn.addEventListener('click', (event) => {
    event.preventDefault();

    cartPage.classList.add('hidden');
    afterPurchaseModal.classList.add('active');
})



