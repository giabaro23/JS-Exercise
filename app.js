var urlAPI = "http://localhost:3000/products";

function loadProduct() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open("GET", urlAPI);
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        renderCard(ourData);
    };
    ourRequest.send();
}

window.onload = function() {
    loadProduct();
};

function renderCard(data) {
    console.log("render...");
    var cardItem = document.getElementById("main");
    var totalProduct = document.querySelector(".total__product");
    var htmls = data.map((data) => {
        return `
        <div id="card" class="card__item-${data.id} card__item card col-12 col-md-4" style="width: 18rem;">
            <img src="${data.img}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">${data.description}</p>
            <h5 class="card-title">${data.price} đ</h5>
            <a href="" class="btn btn-primary">Add to card</a>
            <button type="button" class="btn btn-danger" onclick="handleDeleteCard(this, ${data.id})">Remove</button>
            </div>
        </div>
        `;
    });
    cardItem.innerHTML = htmls.join("");
    totalProduct.innerHTML = data.length;
}

function createCard(data, callback) {
    var options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    };
    fetch(urlAPI, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            console.log(callback);
        })
        .catch((err) => {
            console.log(err);
        });
}

function handleCreateCard() {
    var name = document.querySelector("#name").value;
    var description = document.querySelector("#description").value;
    var price = document.querySelector("#price").value;
    var file = document.getElementById("imgFile").files[0];
    // let img = URL.createObjectURL(file);

    var reader = new FileReader();
    reader.onloadend = function() {
        var formData = {
            name: name,
            description: description,
            price: price,
            img: reader.result,
        };
        console.log(formData);

        createCard(formData);
    };
    reader.readAsDataURL(file);
}

function handleDeleteCard(e, id) {
    // var xhr = new XMLHttpRequest();

    // xhr.open("DELETE", urlAPI + "/" + id, true);
    // xhr.onload = function() {
    //     var res = JSON.parse(xhr.responseText);
    //     console.log(res);
    //     let cardItem = document.querySelector(".card__item-" + id);
    //     if (cardItem) {
    //         cardItem.remove();
    //     }
    //     // if (xhr.readyState == 4 && xhr.status == "200") {
    //     //     console.table(users);
    //     // } else {
    //     //     console.error(users);
    //     // }
    // };
    // xhr.send();
    var options = {
        method: "DELETE",

        headers: {
            "Content-type": "application/json",
        },
    };
    fetch(urlAPI + '/' + id, options)
        .then(function(response) {
            response.json();

        })
        .then(function() {
            let cardItem = document.querySelector('.card__item-' + id);
            if (cardItem) {
                cardItem.remove();
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

// cart modal

var btnOpenCart = document.querySelector(".open__cart");
var cartModal = document.querySelector(".cart__modal");
var btnCloseCart = document.querySelector(".btn__close__cart");

function toggleModal(e) {
    e.preventDefault();
    cartModal.classList.toggle("hide");
}

btnOpenCart.addEventListener("click", toggleModal);
btnCloseCart.addEventListener("click", toggleModal);
cartModal.addEventListener("click", function(e) {
    if (e.target == e.currentTarget) {
        toggleModal();
    }
});