// first you check if js is ready and the scripts have been read 
if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    // loop and function for removing items from cart 
    for(var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    // loop for updating quantity 
    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // loop for adding products to cart 
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for(var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    // event for purchasing the products 
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}


// code for removing cart item 
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updatecartTotal();
}

// code for changing quantity 
function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatecartTotal()
}

// code for adding products to cart 
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updatecartTotal()
}

// purchase the products and clear the cut after purchase 
function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updatecartTotal()
}



// function for creating th row for the added item 
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    // add style to the row 
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    // check if product is already added and prevent it from adding again 
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            // this return will take us back to the same page 
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="50" height="50" alt="">
        <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>

        <div class="cart-quantity cart-column">
            <input type="number" value="1" class="cart-quantity-input">
            <button class="btn btn-danger" type="button">Remove</button>
        </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    // add the remove button 
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    // update the quantity of the new added product 
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

}


// function for updating total of the cart 
// call this function inside the remove items function 
function updatecartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for(var i = 0; i< cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        
        // get the actual price inside the price element and remove the dollar sign then convert it to a string 
        var price  = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity  = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total)
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}