// select active class 
let as = document.querySelectorAll('.landing-page .links li a');

as.forEach((e) => {
    e.addEventListener('click', function () {
        as.forEach((a) => {
            a.classList.remove('active')
        });
        e.classList.add('active')
    })
})

// for random wallpaper 
let page = document.querySelector('.landing-page');

let images = ['imgs/desk-wallpaper-1920x1080.jpg',
    'imgs/dreams_dont_work_unless_you_do_2-wallpaper-1920x1080.jpg',
    'imgs/cpu_wireframe-wallpaper-1920x1080.jpg',
    'imgs/bitcoin_cryptocurrency_physical_coin-wallpaper-1920x1080.jpg',
    'imgs/digital_data-wallpaper-1920x1080.jpg'
];

// for show setting box 
let iconBox = document.querySelector('.setting-box .icon');
let icon = document.querySelector('.setting-box .bx');
let setting = document.querySelector('.setting-box');

iconBox.onclick = function () {
    setting.classList.toggle('show');
    icon.classList.toggle('play');
}

// for select color 
let colors = document.querySelectorAll('.setting-box .colors-list li');

if (window.localStorage.getItem('color')) {
    document.documentElement.style.setProperty('--main-color', window.localStorage.getItem('color'));
    colors.forEach((li) => {
        li.classList.remove('active');
        if (li.dataset.color === window.localStorage.getItem('color')) {
            li.classList.add('active');
        }
    })
}
colors.forEach((li) => {
    li.addEventListener('click', (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        handleActive(e);
        window.localStorage.setItem('color', e.target.dataset.color);
    })
})

// random backgrounds option 
let random = document.querySelectorAll('.setting-box .random-backgrounds span');
let randomImage = true;
let randomInterval;

if (window.localStorage.getItem('randomImgs')) {
    if (localStorage.getItem('randomImgs') === 'true') {
        randomImage = true;
    } else {
        randomImage = false;
    }
    random.forEach((span) => {
        span.classList.remove('active');
    });
    if (localStorage.getItem('randomImgs') === 'true') {
        document.querySelector('.setting-box .yes').classList.add('active');
    } else {
        document.querySelector('.setting-box .no').classList.add('active');
    }
}

random.forEach((span) => {
    span.addEventListener('click', (e) => {
        handleActive(e);
        if (span.dataset.random === 'yes') {
            randomImage = true;
            randomizImage();
        } else {
            randomImage = false;
            clearInterval(randomInterval);
        }
        window.localStorage.setItem('randomImgs', randomImage);
    })
});

function randomizImage() {
    if (randomImage === true) {
        randomInterval = setInterval(() => {
            let random = Math.floor(Math.random() * images.length);
            let randomImage = images[random];
            page.style.backgroundImage = `url(${randomImage})`;
        }, 10000);
    }
}

randomizImage();

// animation for skill section 
let skill = document.querySelector('.skills');
let spans = document.querySelectorAll('.skills .progress-box span');

window.onscroll = function () {
    if (window.scrollY >= skill.offsetTop - 200) {
        spans.forEach((span) => {
            span.style.width = span.dataset.width;
        })
    }
}

// for popup image 
let gallery = document.querySelector('.gallery');
let imgs = document.querySelectorAll('.gallery .box img');

imgs.forEach((img) => {
    img.addEventListener('click', function () {
        let overlay = document.createElement('div');
        overlay.className = 'overlay';
        gallery.appendChild(overlay);
        let popBox = document.createElement('div');
        popBox.className = 'pop-box';
        gallery.appendChild(popBox);
        let imgbox = document.createElement('div');
        imgbox.className = 'imgbox';
        let image = document.createElement('img');
        image.src = img.src;
        if (img.alt !== "") {
            let p = document.createElement('p');
            let pT = document.createTextNode(img.alt);
            p.appendChild(pT);
            popBox.appendChild(p);
        }
        imgbox.appendChild(image);
        let close = document.createElement('span');
        let closeText = document.createTextNode('X');
        close.appendChild(closeText);
        close.className = "close";
        popBox.appendChild(close);
        popBox.appendChild(imgbox);
    });
})

document.addEventListener('click', function (e) {
    if (e.target.className == "close") {
        document.querySelector('.pop-box').remove();
        document.querySelector('.gallery .overlay').remove();
    }
})

// bullets sections 
let bullets = document.querySelectorAll('.nav-bullets .bullet');
gotosetion(bullets);

// links sections 
let links = document.querySelectorAll('.links li a');
gotosetion(links);

// function to go to section 
function gotosetion(elements) {
    elements.forEach((ele) => {
        ele.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        })
    })
}

// bullets show 
let bulletSpans = document.querySelectorAll('.setting-box .bullets span');
let navBullets = document.querySelector('.nav-bullets');
let bulletLocalitem = window.localStorage.getItem('bullet-option');

if (bulletLocalitem !== null) {
    bulletSpans.forEach(span => {
        span.classList.remove('active');
        if (span.dataset.show == bulletLocalitem) {
            span.classList.add('active');
        }
    })
}

bulletSpans.forEach((span) => {
    span.addEventListener('click', (e) => {
        if (span.dataset.show == "show") {
            navBullets.style.display = 'block';
            window.localStorage.setItem('bullet-option', 'show');
        } else {
            navBullets.style.display = 'none';
            window.localStorage.setItem('bullet-option', 'hide');
        }
        handleActive(e);
    })
})

// handle class active 
function handleActive(element) {
    element.target.parentElement.querySelectorAll('.active').forEach(ele => {
        ele.classList.remove('active')
    });
    element.target.classList.add('active');
}

// reset button 
document.querySelector('.setting-box .reset').onclick = () => {
    window.localStorage.clear();
    window.location.reload();
}

// menu bar 
let linksClass = document.querySelector('.landing-page .links');
let buttomMenu = document.querySelector('.landing-page .links-container .bx');

buttomMenu.onclick = function () {
    linksClass.classList.toggle('open');
    buttomMenu.classList.toggle('menu-active');
}

document.addEventListener('click', function (e) {
    if (!e.target.classList.contains("bx")) {
        if (linksClass.classList.contains('open')) {
            linksClass.classList.toggle('open');
            buttomMenu.classList.toggle('menu-active');
        }
    }
});

linksClass.onclick = function (e) {
    e.stopPropagation();
}