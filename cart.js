function renderCartItems() {
    var productCartData = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItem = document.querySelector(".cart__list");
    var htmls = productCartData.map((data) => {
        return `
        <div class="cart__item">
        <div class="cart__item__img">
            <img src="${data.img}" alt="" srcset="">
        </div>
        <div class="cart__item__info">
            <h5>${data.name}</h5>
            <span>${data.description}</span>
        </div>
        <div class="cart__item__quantity">
            <h4>1</h4>
        </div>
        <div class="cart__item__price">
            <h4>$${data.price}</h4>
        </div>
        <div class="cart__item__btn-delete">
            <button onclick="handleDeleteCartItem(${data.id})">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    </div>
`;
    });
    cartItem.innerHTML = htmls.join("");
}

window.onload = function() {
    renderCartItems();
};

function handleDeleteCartItem(id) {
    var productCartData = JSON.parse(localStorage.getItem('cart')) || [];
    for (i = 0; i < productCartData.length; i++) {
        if (productCartData[i].id === id) {

            productCartData.splice(i, 1);
            break;
        }

    }
    localStorage.setItem('cart', JSON.stringify(productCartData));
    renderCartItems();

}