const navBarList = document.querySelectorAll('.nav-link');

// nav bar activation
const navbarArray = [...navBarList];
function makeActive() {
    let index = 0;
    for (let i = 0; i < navbarArray.length; i++) {
        navbarArray[i].addEventListener('click', (e) => {
            e.currentTarget.classList.add('active');
            index = navbarArray.indexOf(navbarArray[i]);          
            removeActive(index)
        })
    }
}
function removeActive(_index) {
    for (let i = 0; i < navbarArray.length; i++) {
        if (_index != i ) {
            navbarArray[i].classList.remove('active');
        }                
    }
}
makeActive()