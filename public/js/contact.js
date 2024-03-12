// Contact Page

function loadPage() {
    loadPexelsImage();
}

function loadPexelsImage() {
    let img = new Image()
    img.src = 'https://images.pexels.com/photos/414136/pexels-photo-414136.jpeg?'
    img.width = 400
    img.height = 300
    let imgContainer = document.getElementById('pexel-image')
    imgContainer.appendChild(img)
}