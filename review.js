function renderCheckoutForm() {
    let checkoutInfo = JSON.parse(localStorage.getItem("checkoutInfo"));
    let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
    let review = document.querySelector(".review");
    htmls = `
    
        <h2>Your payment</h2>
        <div class="review__info review__first-name">
            <h5>Full name:</h5>
            <p>${checkoutInfo.firstName} ${checkoutInfo.lastName}</p>
        </div>
        <div class="review__info review__first-name">
            <h5>Email:</h5>
            <p>${checkoutInfo.email}</p>
        </div>
        <div class="review__info review__first-name">
            <h5>Address:</h5>
            <p>${checkoutInfo.address}</p>
        </div>
        <div class="review__info review__first-name">
            <h5>Phone number:</h5>
            <p>${checkoutInfo.phoneNumb}</p>
        </div>
        <div class="review__info review__first-name">
            <h5>Total price:</h5>
            <p>$${totalPrice}</p>
        </div>
        <div class="review__btn">
            <button type="button" onclick="deleteCartInfo()" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Payment</button>
        </div>

        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title" id="staticBackdropLabel">Message</h5>
  </div>
      <div class="modal-body">
        Payment success
      </div>
      <div class="modal-footer message__btn">
        <a href="index.html"  >Ok</button>
       
      </div>
    </div>
  </div>
</div>
  

    `;
    review.innerHTML = htmls;
}

window.onload = function() {
    renderCheckoutForm();
};

function deleteCartInfo() {
    localStorage.removeItem("checkoutInfo");
    localStorage.removeItem("cart");
}