let masonry;
let currClass = 'image';
let currImg
let currentIndex = 0
let canPress = true
let images = []
const allImageTrue = Array.from(document.querySelectorAll('img.image'));

const lightbox = document.createElement("div")
lightbox.id="lightbox"
document.body.appendChild(lightbox)

const rightButton = document.createElement("button")
rightButton.id = 'right-button'
rightButton.style.position = 'fixed'
rightButton.style.width = '10%'
rightButton.style.height = '10%'
rightButton.style.display = 'none'
rightButton.style.top = '50%'
rightButton.style.transform = 'translateY(-50%)'
rightButton.style.right = '0%'
rightButton.style.background = "url('images/rightarrow.svg') no-repeat center center"
rightButton.style.backgroundSize = 'contain';
rightButton.style.outline = '0px';
rightButton.style.border = '0px';
rightButton.style.zIndex = '150';
rightButton.style.cursor = 'pointer';
document.body.appendChild(rightButton)
const leftButton = document.createElement("button")
leftButton.id = 'left-button'
leftButton.style.position = 'fixed'
leftButton.style.width = '10%'
leftButton.style.height = '10%'
leftButton.style.display = 'none'
leftButton.style.top = '50%'
leftButton.style.transform = 'translateY(-50%)'
leftButton.style.right = '90%'
leftButton.style.background = "url('images/leftarrow.svg') no-repeat center center"
leftButton.style.backgroundSize = 'contain';
leftButton.style.outline = '0px';
leftButton.style.border = '0px';
leftButton.style.zIndex = '150';
leftButton.style.cursor = 'pointer';
document.body.appendChild(leftButton);

const exitButton = document.createElement("button")
exitButton.style.position = 'fixed'
exitButton.id = 'exit-button'
exitButton.style.zIndex = '1000'
exitButton.style.top = '50%'
exitButton.style.left = '0px'
exitButton.style.maxWidth = '15vw'
exitButton.style.maxHeight = '15vw'
exitButton.style.height = '15%'
exitButton.style.width = '15%'
exitButton.style.cursor = 'pointer'
exitButton.style.display = 'none'
exitButton.style.background = "url('images/x.svg') no-repeat center center"
exitButton.style.backgroundSize = 'contain'
exitButton.style.border = '0px'
exitButton.outline = '0px';
exitButton.style.margin='0';

document.body.appendChild(exitButton)

imagesLoaded(document.querySelectorAll('img'), function() {

    document.querySelectorAll('img.image').forEach(img => img.style.display = '');
    
    const grid = document.querySelector('.image-row');
    masonry = new Masonry(grid, {
        columnWidth: getImagesByClass(currClass)[0],
        itemSelector: '.image',
        percentPosition: true,
        transitionDuration: "0s"
    });

    var dropdown = document.getElementById("country");
    var value = dropdown.value;
    filter(value)
    masonry.reloadItems();
    masonry.layout();
});

function getImagesByClass(image) {
    return Array.from(document.querySelectorAll(`img.image.${image}`))
        .sort((a, b) => Number(a.id) - Number(b.id));
}

function showImagesByClass(className) {
    const container = document.querySelector('.image-row');
    const allImages = document.querySelectorAll('img.image');
    allImages.forEach(img => {
        if(container.contains(img)) {
            container.removeChild(img)
        }
    });
    const filtered = allImageTrue.filter(img => img.classList.contains(className));
    filtered.forEach(img => {
        container.appendChild(img);
    });
    console.log(allImages);
    masonry.reloadItems();
    masonry.layout();
}

function filter(currClass) {
    showImagesByClass(currClass)
    images = getImagesByClass(currClass);
    lightboxSetup();
}

if(window.innerWidth <= 1060){
    document.body.classList.remove('noscroll');
}

function lightboxSetup() {
    images.forEach((image, index) => {
        image.addEventListener('click', e => {
            //if(window.innerWidth <= 1060) return
            lightbox.classList.add('active');
            document.body.classList.add('noscroll');
            currImg = document.createElement('img')
            currImg.src = image.src;
            while(lightbox.firstChild){
                lightbox.removeChild((lightbox.firstChild))
            }
            lightbox.appendChild(currImg);
            currentIndex = index;
            if(window.innerWidth <= 1060){
                currImg.addEventListener('load', () => {
                    rightButton.style.display = 'none';
                    leftButton.style.display = 'none';
                    var x = 1;
                    var y = null;

                    setTimeout(function() {
                        exitButton.style.top = currImg.offsetTop + 'px';
                        exitButton.style.left = currImg.offsetLeft + 'px';
                        exitButton.style.display = 'block';
                    }, 100);

                });
            } else {
                rightButton.style.display = 'block';
                leftButton.style.display = 'block';
            }
        })
    })
}

lightbox.addEventListener('click', e => {
    if(e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
    document.body.classList.remove('noscroll');
    rightButton.style.display = 'none'
    leftButton.style.display = 'none'
    exitButton.style.display = 'none'
})

exitButton.addEventListener('click', e => {
    lightbox.classList.remove('active')
    document.body.classList.remove('noscroll');
    rightButton.style.display = 'none'
    leftButton.style.display = 'none'
    exitButton.style.display = 'none'
});

leftButton.addEventListener('click', e => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    currImg.src = images[currentIndex].src
    lightbox.removeChild(lightbox.firstChild)
    lightbox.appendChild(currImg)
    canPress = false
})

rightButton.addEventListener('click', e => {
    currentIndex = (currentIndex + 1) % images.length;
    currImg.src = images[currentIndex].src
    lightbox.removeChild(lightbox.firstChild)
    lightbox.appendChild(currImg)
    canPress = false
})

document.addEventListener('keydown', (e) => {
    if(!canPress) return
    switch (e.key) {
        case 'ArrowRight':
            currentIndex = (currentIndex + 1) % images.length;
            currImg.src = images[currentIndex].src
            lightbox.removeChild(lightbox.firstChild)
            lightbox.appendChild(currImg)
            canPress = false
            break
    }
    switch (e.key) {
        case 'ArrowLeft':
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            currImg.src = images[currentIndex].src
            lightbox.removeChild(lightbox.firstChild)
            lightbox.appendChild(currImg)
            canPress = false
            break
    }
    switch (e.key) {
        case 'Escape':
            lightbox.classList.remove('active')
            document.body.classList.remove('noscroll');
            rightButton.style.display = 'none'
            leftButton.style.display = 'none'
            exitButton.style.display = 'none'
            break
    }
})

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            canPress = true
            break
        case 'ArrowLeft':
            canPress = true
            break
    }
})

document.getElementById('country').addEventListener('change', function () {
    const value = this.value;
    filter(value);
});