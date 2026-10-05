let catsArray = [
    {
        path : 'assets/cat-pics/cat-1.jpg',
        title : 'Коти',
        description : 'Коти спокійні'
    },
    {
        path : 'assets/cat-pics/fanta-1.jpg',
        title : 'Фанта №1',
        description : 'Фанта на руках'
    },
    {
        path : 'assets/cat-pics/fanta-2.jpg',
        title : 'Фанта №2',
        description : 'Фанта спантеличена'
    },
    {
        path : 'assets/cat-pics/fanta-3.jpg',
        title : 'Фанта №3',
        description : 'Фанта агресивна'
    },
    {
        path : 'assets/cat-pics/fanta-4.jpg',
        title : 'Фанта №4',
        description : 'Фанта на полюванні'
    },
    {
        path : 'assets/cat-pics/masya-1.jpg',
        title : 'Мася №1',
        description : 'Мася грайлива'
    },
    {
        path : 'assets/cat-pics/masya-2.jpg',
        title : 'Мася №2',
        description : 'Мася кокетка'
    },
    {
        path : 'assets/cat-pics/masya-3.jpg',
        title : 'Мася №3',
        description : 'Мася тигруля'
    },
    {
        path : 'assets/cat-pics/masya-4.jpg',
        title : 'Мася №4',
        description : 'Мася соромиться'
    },
    {
        path : 'assets/cat-pics/pita-cat-1.jpg',
        title : 'Піта',
        description : 'Кішка з сюрпризом'
    },
    {
        path : 'assets/cat-pics/prinzesa-1.jpg',
        title : 'Прінцеса №1',
        description : 'Прінцеса дуже спокійна'
    },
    {
        path : 'assets/cat-pics/prinzesa-2.jpg',
        title : 'Прінцеса №2',
        description : 'Прінцеса занадто спокійна'
    },
    {
        path : 'assets/cat-pics/prinzesa-3.jpg',
        title : 'Прінцеса №3',
        description : 'Прінцеса історична'
    }
]


function initPhoto(containerId, ImgArr) {
    const container = document.getElementById(containerId);

    const rotatorHeader = document.createElement('div');
    rotatorHeader.className = 'rotator-header';
    rotatorHeader.textContent = `Фотографія 1 з ${ImgArr.length}`;
    
    const rotatorNavPrev = document.createElement('div');
    rotatorNavPrev.className = 'rotator-nav prev';
    const aBtnPrev = document.createElement('button');
    aBtnPrev.id = 'prevBtn';
    aBtnPrev.textContent = 'Назад';
    rotatorNavPrev.append(aBtnPrev);

    const rotatorImage = document.createElement('div');
    rotatorImage.className = 'rotator-image';
    const imgHolder = document.createElement('img');
    imgHolder.id = 'imgHolder';
    imgHolder.src = ImgArr[0].path;
    rotatorImage.append(imgHolder);

    const rotatorNavNext = document.createElement('div');
    rotatorNavNext.className = 'rotator-nav next';
    const aBtnNext = document.createElement('button');
    aBtnNext.id = 'nextBtn';
    aBtnNext.textContent = 'Вперед';
    rotatorNavNext.append(aBtnNext);

    const rotatorFooter = document.createElement('div');
    rotatorFooter.className = 'rotator-footer';
    const title = document.createElement('p');
    title.textContent = ImgArr[0].title;
    title.id = 'title';
    const description = document.createElement('p');
    description.textContent = ImgArr[0].description;
    description.id = 'description';
    rotatorFooter.append(title, description);

    container.append(
        rotatorHeader, 
        rotatorNavPrev, 
        rotatorImage, 
        rotatorNavNext, 
        rotatorFooter
    );

    let currentIndex = 0;
    aBtnPrev.style.visibility = 'hidden';

    aBtnPrev.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            imgHolder.src = ImgArr[currentIndex].path;
            title.textContent = ImgArr[currentIndex].title;
            description.textContent = ImgArr[currentIndex].description;
            rotatorHeader.textContent = `Фотографія ${currentIndex + 1} з ${ImgArr.length}`;

            aBtnNext.style.visibility = 'visible';

            if (currentIndex === 0) {
                aBtnPrev.style.visibility = 'hidden';
            }
        }
    });

    aBtnNext.addEventListener('click', function() {
        if (currentIndex < ImgArr.length - 1) {
            currentIndex++;
            imgHolder.src = ImgArr[currentIndex].path;
            title.textContent = ImgArr[currentIndex].title;
            description.textContent = ImgArr[currentIndex].description;
            rotatorHeader.textContent = `Фотографія ${currentIndex + 1} з ${ImgArr.length}`;

            aBtnPrev.style.visibility = 'visible';

            if (currentIndex === ImgArr.length - 1) {
                aBtnNext.style.visibility = 'hidden';
            }
        }
    });
}

initPhoto('rotator', catsArray);



