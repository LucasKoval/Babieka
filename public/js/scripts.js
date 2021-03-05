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
    if (document.getElementById('discountCode').value == 'milanesa') {
        let discountCode = document.getElementById('finalPrice').innerHTML = `$ ${finaPrice}`;
        let popup = document.getElementById("myPopupGood");
        popup.classList.toggle("show");
    } else {
        let popup = document.getElementById("myPopupBad");
        popup.classList.toggle("show");
    }
};
//************************/

/* function myFunction() {
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
} */