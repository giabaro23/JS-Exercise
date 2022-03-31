var urlAPI = "http://localhost:3000/products";

var ourRequest = new XMLHttpRequest();
ourRequest.open("GET", urlAPI);
ourRequest.onload = function() {
    var ourData = JSON.parse(ourRequest.responseText);
    renderCard(ourData);
    window.localStorage.setItem("products", JSON.stringify(ourData));
};
ourRequest.send();

function renderCard(data) {
    var listProduct = document.querySelector(".product");
    var totalProduct = document.querySelector(".total__product");
    var productCartData = JSON.parse(localStorage.getItem("cart")) || [];
    var htmls = data.map((data) => {
        return `
        <div class="product__item product__item-${data.id}">
        <div class="product__item__img">
            <img src="${data.img}" alt="">
        </div>
        <div class="product__item__name">
            <h5>${data.name}</h5>
        </div>
        <div class="product__item__description">
            <span>${data.description}</span>
        </div>
        <div class="product__item__price">
            <h4>$ ${data.price}</h4>
        </div>
        
        <div class="product__item__btn-add">
            <button onclick="addToCart(${data.id})"><i class="fa-solid fa-cart-plus"></i></button>
        </div>

    </div>

        `;
    });
    listProduct.innerHTML = htmls.join("");
    totalProduct.innerHTML = productCartData.length;
}

function createCard(data) {
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

    .catch((err) => {
        console.log(err);
    });
}

function handleCreateCard() {
    var name = document.querySelector("#name").value;
    var description = document.querySelector("#description").value;
    var price = document.querySelector("#price").value;
    var file = document.getElementById("imgFile").files[0];
    let productData = JSON.parse(localStorage.getItem("products"));
    // let img = URL.createObjectURL(file);

    var reader = new FileReader();
    reader.onloadend = function() {
        var formData = {
            name: name,
            description: description,
            price: price,
            img: reader.result,
        };

        createCard(formData);
        productData.push(formData);

        renderCard(productData);

    };
    reader.readAsDataURL(file);

}

function handleDeleteCard(id) {
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
    fetch(urlAPI + "/" + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            let cardItem = document.querySelector(".product__item-" + id);
            if (cardItem) {
                cardItem.remove();
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

// cart modal

// var btnOpenCart = document.querySelector(".open__cart");
// var cartModal = document.querySelector(".cart__modal");
// var btnCloseCart = document.querySelector(".btn__close__cart");

// function toggleModal(e) {
//     e.preventDefault();
//     cartModal.classList.toggle("hide");
// }

// btnOpenCart.addEventListener("click", toggleModal);
// btnCloseCart.addEventListener("click", toggleModal);
// cartModal.addEventListener("click", function(e) {
//     if (e.target == e.currentTarget) {
//         toggleModal();
//     }
// });

function addToCart(id) {
    var productCartData = JSON.parse(localStorage.getItem("cart")) || [];
    var listProducts = JSON.parse(localStorage.getItem("products"));
    for (i = 0; i < listProducts.length; i++) {
        if (listProducts[i].id === id) {
            productCartData.push(listProducts[i]);
        }
    }
    localStorage.setItem("cart", JSON.stringify(productCartData));
    var totalProduct = document.querySelector(".total__product");
    totalProduct.innerHTML = productCartData.length;
}