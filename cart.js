function renderCartItems() {
    var productCartData = JSON.parse(localStorage.getItem("cart")) || [];
    let cart = document.getElementById('cart__main');
    let progressBar = document.getElementById('progress__bar');
    let noProduct = document.getElementById('no__product');
    let cartItem = document.querySelector(".cart__list");
    let footer = document.getElementById('contact');
    if (productCartData.length > 0) {

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
        cart.classList.remove('hide');
        progressBar.classList.remove('hide');
        noProduct.classList.add('hide');
        footer.classList.remove('hide')
    } else {
        cart.classList.add('hide');
        progressBar.classList.add('hide');
        footer.classList.add('hide');
        noProduct.innerHTML = `
        <i class="fa-solid fa-face-frown-open"></i>
        <h1>Your cart currently has no products.</h1>
        <a href='index.html'>Back to homepage</a>
        `;
    }

}

window.onload = function() {
    renderCartItems();

};

function handleDeleteCartItem(id) {
    var productCartData = JSON.parse(localStorage.getItem("cart")) || [];
    for (i = 0; i < productCartData.length; i++) {
        if (productCartData[i].id === id) {
            productCartData.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("cart", JSON.stringify(productCartData));
    renderCartItems();
    renderPaymentCheckout();
}

function renderPaymentCheckout() {
    let totalPrice = 0;
    let productCartData = JSON.parse(localStorage.getItem("cart")) || [];
    let cartPayment = document.querySelector('.cart__payment');
    productCartData.map((data) => {
        totalPrice += parseInt(data.price);
        return totalPrice;
    });
    let totalPriceShip = totalPrice + 40;
    var html = `
    <div class="cart__payment__title">
    <h5>How you'll pay</h5>
</div>
<div class="cart__payment__method">
    <div class="cart__payment__method-visa">
        <img src="https://logowik.com/content/uploads/images/857_visa.jpg" alt="" srcset="">
    </div>
    <div class="cart__payment__method-card">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWPE0oysl3RjpM3XWv2fwBfrlmi9zl5H2MHvuq_A9J_Buc-86hNvdexSmyb193TR4-63o&usqp=CAU" alt="" srcset="">
    </div>
</div>
<div class="cart__payment__price">
    <h5>Item(s) total</h5>
    <p>$${totalPrice}</p>
</div>
<div class="cart__payment__ship">
    <h5>Shipping </h5>
    <p>$40</p>
</div>
<div class="cart__payment__total">
    <h5>Total</h5>
    <p>$${totalPriceShip}</p>
</div>
<div class="cart__payment__btn-checkout">
    <a href="checkout.html">Proceed to checkout</a>
</div>
    `;
    cartPayment.innerHTML = html;
    localStorage.setItem('totalPrice', JSON.stringify(totalPriceShip));
}

renderPaymentCheckout();