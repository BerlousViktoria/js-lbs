// ==============================
// DOM
// ==============================
const tabsContainer = document.querySelector('#tabs');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const topLeft = document.querySelector('#top-left');
const topRight = document.querySelector('#top-right');
const bottomRight = document.querySelector('#bottom-right');
const bottomLeft = document.querySelector('#bottom-left');
const topLeftValue = document.querySelector('#top-left-value');
const topRightValue = document.querySelector('#top-right-value');
const bottomRightValue = document.querySelector('#bottom-right-value');
const bottomLeftValue = document.querySelector('#bottom-left-value');
const preview = document.querySelector('#preview');
const previewButton = document.querySelector('#preview-button');
const coordinates = document.querySelector('#coordinates');
const cssCode = document.querySelector('#css-code');
const copyButton = document.querySelector('#copy-button');
const copyMessage = document.querySelector('#copy-message');
const presetForm = document.querySelector('#preset-form');
const presetName = document.querySelector('#preset-name');
const presetError = document.querySelector('#preset-error');
const scrollTopButton = document.querySelector('#scroll-top');

// ==============================
// TABS
// ==============================
function hideTabs() {
    tabs.forEach(function (element) {
        tab.classList.remove('active');
    });
    tabContents.forEach(function (element) {
        tab.classList.remove('active');
    });
}

function showTab(tabName) {
    const dataTab = document.querySelector(`[data-tab="${tabName}"]`);
    const dataContent = document.querySelector(`[data-content="${tabName}"]`);

    if(dataTab){
        dataTab.classList.add('active');
    }
    if(dataContent){
        dataContent.classList.add('active');
    }
}

function tabsClickable(){
    tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {
        const tabName = event.currentTarget.dataset.tab;
        hideTabs();
        showTab(tabName);
    });
    });
}

// ==============================
// BORDER RADIUS
// ==============================
function generateBorderRadius() {
// Реалізувати відповідно до завдання
}

// ==============================
// COPY
// ==============================
function copyCSS() {
// Реалізувати відповідно до завдання
}

// ==============================
// FORM
// ==============================
function handlePresetSubmit(event) {
// Реалізувати відповідно до завдання
}

// ==============================
// KEYBOARD
// ==============================
function handleKeyDown(event) {
// Реалізувати відповідно до завдання
}

// ==============================
// SCROLL
// ==============================
function handleScroll() {
// Реалізувати відповідно до завдання
}