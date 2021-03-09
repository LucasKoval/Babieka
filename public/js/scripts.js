// Boton de cantidad
let startingNumber = 1;

function increase(){
    let quantity = document.getElementById('quantity').value = ++startingNumber;
};

function decrease(){ 
    let quantity = document.getElementById('quantity').value = --startingNumber;
};
//************************/

// Cupón de descuento
let finaPrice = 0;
function discountCode(){
    if (document.getElementById('discountCode').value == '') {
        let popup = document.getElementById("myPopupEmpty");
        popup.classList.toggle("show");
    } else if (document.getElementById('discountCode').value == 'milanesa') {
        let discountCode = document.getElementById('finalPrice').innerHTML = `$ ${finaPrice}`;
        let popup = document.getElementById("myPopupGood");
        popup.classList.toggle("show");
    } else {
        let popup = document.getElementById("myPopupBad");
        popup.classList.toggle("show");
    }
};
//************************/

// Cambio de imagenes
function changeImg(id, img_1, img_2) {
    image = document.getElementById(id);
    if (image.src == img_2) {
        image.src = img_1;
    } else {
        image.src = img_2;
    }
}
//************************/

// Burger
window.addEventListener('load', () => {

    const burgerButton = document.querySelector('#boton-menu');
    const barraNav = document.querySelector('#barra-nav1');

    burgerButton.addEventListener('click', () => {
        barraNav.classList.toggle('d-block');
    });
})

//************************/