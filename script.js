const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let photosArray = [];

let loadedImages = 0;
let totalImages = 0;
let ready = false;

// Unsplash API
const count = 10;
const apiKey = 'jAZEXDDetcByRLzmKOD4a3pxjOtClMySyCUzFOm-T_U'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Function to verify image load completion
function imageLoaded(){
    loadedImages++;
    if(loadedImages === totalImages){
        loader.hidden = true;
        ready = true
    }
}

// Helper Function to set Attributes on DOM Elements
function setAttribute(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links and photos, Add to DOM
function displayPhotos(){
    loadedImages = 0
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach(photo => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // Create image for photo
        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event listener for checking complete loading of each image
        img.addEventListener('load', imageLoaded);
        // Put <Img> inside <a>, then put both inside our imageContainer
        item.append(img);
        imageContainer.append(item);
    });
}

// Get Photos from Unsplash
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (e) {
        //Catch error here
    }
}

//Check to aee if we've gotten to bottom of page and load new images
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

// On load
getPhotos()