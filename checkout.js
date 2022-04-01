function getCheckoutForm() {
    let firstName = document.getElementById('checkout__first-name').value;
    let lastName = document.getElementById('checkout__last-name').value;
    let email = document.getElementById('checkout__email').value;
    let address = document.getElementById('checkout__address').value;
    let phoneNumb = document.getElementById('checkout__phone').value;
    let checkoutInfo = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        phoneNumb: phoneNumb,
    }
    if (checkoutInfo) {
        localStorage.setItem('checkoutInfo', JSON.stringify(checkoutInfo));
    }

}