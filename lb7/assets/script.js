// ==============================
// DOM
// ==============================
const tabsContainer = document.querySelector("#tabs");
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");
const topLeft = document.querySelector("#top-left");
const topRight = document.querySelector("#top-right");
const bottomRight = document.querySelector("#bottom-right");
const bottomLeft = document.querySelector("#bottom-left");
const topLeftValue = document.querySelector("#top-left-value");
const topRightValue = document.querySelector("#top-right-value");
const bottomRightValue = document.querySelector("#bottom-right-value");
const bottomLeftValue = document.querySelector("#bottom-left-value");
const preview = document.querySelector("#preview");
const previewButton = document.querySelector("#preview-button");
const coordinates = document.querySelector("#coordinates");
const cssCode = document.querySelector("#css-code");
const copyButton = document.querySelector("#copy-button");
const copyMessage = document.querySelector("#copy-message");
const presetForm = document.querySelector("#preset-form");
const presetName = document.querySelector("#preset-name");
const presetError = document.querySelector("#preset-error");
const scrollTopButton = document.querySelector("#scroll-top");
const textColor = document.querySelector("#text-color");
const fontWeight = document.querySelector("#font-weight");

// ==============================
// TABS
// ==============================
function hideTabs() {
    tabs.forEach(function (tab) {
        tab.classList.remove("active");
    });
    tabContents.forEach(function (tab) {
        tab.classList.remove("active");
    });
}

function showTab(tabName) {
    const dataTab = document.querySelector(`[data-tab="${tabName}"]`);
    const dataContent = document.querySelector(`[data-content="${tabName}"]`);

    if (dataTab) {
        dataTab.classList.add("active");
    }
    if (dataContent) {
        dataContent.classList.add("active");
    }
}

function tabsClickable() {

//   tabs.forEach(function (tab) {
//     tab.addEventListener("click", function (event) {
//       console.log(event.type);
//       console.log(event.target);
//       console.log(event.currentTarget);

//       const tabName = event.currentTarget.dataset.tab;
//       hideTabs();
//       showTab(tabName);
//     });
//   });
}

// ==============================
// BORDER RADIUS
// ==============================

function generateBorderRadius() {
    const topLeftRadius = topLeft.value;
    const topRightRadius = topRight.value;
    const bottomRightRadius = bottomRight.value;
    const bottomLeftRadius = bottomLeft.value;

    const radius = `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`;
    preview.style.borderRadius = radius;

    topLeftValue.textContent = `${topLeftRadius} px`;
    topRightValue.textContent = `${topRightRadius} px`;
    bottomRightValue.textContent = `${bottomRightRadius} px`;
    bottomLeftValue.textContent = `${bottomLeftRadius} px`;

    preview.style.color = textColor.value;
    preview.style.fontWeight = fontWeight.value;

    cssCode.value = `border-radius: ${radius};\ncolor: ${textColor.value};\nfont-weight: ${fontWeight.value};`;
}

// ==============================
// COPY
// ==============================
function copyCSS() {
    navigator.clipboard.writeText(cssCode.value).then(function () {
        copyMessage.textContent = 'CSS-код скопійовано';

        setTimeout(function () {
            copyMessage.textContent = '';
        }, 2000);
    });
}

// ==============================
// FORM
// ==============================
function handlePresetSubmit(event) {
event.preventDefault();
    const name = presetName.value.trim();

    if (name === '') {
        presetName.classList.add('error');
        presetError.textContent = 'Введіть назву пресета';
        return;
    }

    presetName.classList.remove('error');
    presetError.textContent = '';
    console.log(`Пресет: ${name}`);
    console.log(cssCode.value);
}

// ==============================
// KEYBOARD
// ==============================
function handleKeyDown(event) {
    if (event.key === 'Escape') {

    topLeft.value = 0;
    topRight.value = 0;
    bottomRight.value = 0;
    bottomLeft.value = 0;

    generateBorderRadius();
    }
}

// ==============================
// SCROLL
// ==============================
function handleScroll() {
if (window.scrollY > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
}

// ========
// listeners
// =========
tabsContainer.addEventListener('click', function (event) {
    if (!event.target.classList.contains('tab')) {
        return;
    }

    const tabName = event.target.dataset.tab;
    hideTabs();
    showTab(tabName);
});

window.addEventListener('scroll', handleScroll);
copyButton.addEventListener('click', copyCSS);
topLeft.addEventListener("input", generateBorderRadius);
topRight.addEventListener("input", generateBorderRadius);
bottomRight.addEventListener("input", generateBorderRadius);
bottomLeft.addEventListener("input", generateBorderRadius);
textColor.addEventListener('input', generateBorderRadius);
fontWeight.addEventListener('change', generateBorderRadius);
presetForm.addEventListener('submit', handlePresetSubmit);
document.addEventListener('keydown', handleKeyDown);

scrollTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

preview.addEventListener('mousemove', function (event) {
    coordinates.textContent = `X: ${event.clientX}; Y: ${event.clientY}`;

    console.log(`pageX: ${event.pageX}, pageY: ${event.pageY}`);
});

preview.addEventListener('mouseover', function () {
    preview.classList.add('hovered');
});

preview.addEventListener('mouseout', function () {
    preview.classList.remove('hovered');
});

preview.addEventListener('mousemove', function (event) {
    coordinates.textContent = `X: ${event.offsetX}; Y: ${event.offsetY}`;
});

preview.addEventListener('click', function () {
    console.log('Preview click');
});

previewButton.addEventListener('click', function (event) {
    event.stopPropagation();

    console.log('Button click');
});

presetName.addEventListener('focus', function () {
    presetName.classList.add('focused');
});

presetName.addEventListener('blur', function () {
    presetName.classList.remove('focused');

    if (presetName.value.trim() === '') {
        presetName.classList.add('error');
        presetError.textContent = 'Введіть назву пресета';
    } else {
        presetName.classList.remove('error');
        presetError.textContent = '';
    }
});