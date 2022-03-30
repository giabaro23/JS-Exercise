var urlAPI = "http://localhost:3000/products";

var ourRequest = new XMLHttpRequest();
ourRequest.open("GET", urlAPI);
ourRequest.onload = function() {
    var ourData = JSON.parse(ourRequest.responseText);
    renderCard(ourData);
    window.localStorage.setItem('products', JSON.stringify(ourData));

};
ourRequest.send();



function renderCard(data) {
    var cardItem = document.getElementById("main");
    var totalProduct = document.querySelector(".total__product");
    var htmls = data.map((data) => {
        return `
        <div id="card" class="card__item-${data.id} card__item card col-12 col-md-4" style="width: 18rem;">
            <img src="${data.img}" class="card-img-top card__img" alt="...">
            <div class="card-body card__item__body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">${data.description}</p>
            <h5 class="card-title">${data.price} VND</h5>
            <button type='button' class="btn btn-primary card__btn__add" onclick='addToCart(${data.id})'>Add to card</button>
            <button type="button" class="btn btn-danger card__btn__remove disabled" onclick="handleDeleteCard(this, ${data.id})">Remove</button>
            </div>
        </div>
        `;
    });
    cardItem.innerHTML = htmls.join("");
    totalProduct.innerHTML = data.length;
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
    let productData = JSON.parse(localStorage.getItem('products'))
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
        console.log(productData);
        renderCard(productData);
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
    fetch(urlAPI + "/" + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            let cardItem = document.querySelector(".card__item-" + id);
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
var productCartData = [];

// function addToCart(id) {
//     var ourRequest = new XMLHttpRequest();
//     ourRequest.open("GET", urlAPI);
//     ourRequest.onload = function() {
//         var ourData = JSON.parse(ourRequest.responseText);
//         for (i = 0; i < ourData.length; i++) {
//             if (ourData[i].id === id) {
//                 productCartData.push(ourData[i]);
//                 console.log(productCartData);
//                 localStorage.setItem("a", JSON.stringify(productCartData));
//                 var cardItem = document.querySelector('.cart__modal__body');
//                 var htmls = productCartData.map((data) => {
//                     return `
// <table class="table">

//   <tbody>

//     <tr>

//       <td colspan="2">${data.name}</td>
//       <td>${data.description}</td>
//     </tr>
//   </tbody>
// </table>
// `
//                 });
//                 cardItem.innerHTML = htmls.join("");
//             }
//         }
//     };
//     ourRequest.send();
// }