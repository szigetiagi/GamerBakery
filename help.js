// ellenőrzi, hogy a dokumentum még mindig betöltődik-e
if (document.readyState == 'loading') {
    // ha még betöltődik, eseményfigyelőt adunk hozzá a teljes dokumentum betöltésének várakozásához
    document.addEventListener('DOMContentLoaded', ready)
} else {
    // ha már betöltődött, hívja meg közvetlenül a ready függvényt
    ready()
}

//  oldal beállításához a dokumentum betöltése után
function ready() {
    // eseményfigyelők hozzáadása a törléshez
    const removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        const button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    // eseményfigyelők hozzáadása a mennyiségbevitelre
    const quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        const input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // eseményfigyelő hozzáadása a kosárba helyezéshez
    const addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        const button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    // eseményfigyelő hozzáadása a vásárlás gombhoz
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Köszönjük a vásárlást') // figyelmeztető üzenetet
    const cartItems = document.getElementsByClassName('cart-items')[0] 
    //  összes  elem eltávolítása
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal() // kosár  frissítése
}


function removeCartItem(event) {
    const buttonClicked = event.target 
    buttonClicked.parentElement.parentElement.remove() 
    updateCartTotal() // kosár  frissítése
}

function quantityChanged(event) {
    const input = event.target //  megváltozott bevitelt gets
    // ha a beviteli érték nem szám, vagy kisebb vagy egyenlő nullával, állítsa be 1-re
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal() // kosár teljes összegének frissítése 
}

// Funkció a kosárba helyezés gomb kattintásának kezelésére
function addToCartClicked(event) {
    const button = event.target //az eseményt kiváltó elemet adja vissza, azaz azt az elemet, amelyen az esemény ténylegesen bekövetkezett. Például ha egy 
    //gombra kattintunk, akkor az event.target értéke az adott gomb lesz
    const shopItem = button.parentElement.parentElement // Megszerzi az őse üzleti elemet
    // getting a címet, az árat és a kép forrását 
    const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    //az src attribútum az elem forrását tartalmazza
    addItemToCart(title, price, imageSrc) 
    updateCartTotal() // kosár teljes összegének frissítése 
}

function addItemToCart(title, price, imageSrc) {
    const cartRow = document.createElement('div') // új kosár sor 
    cartRow.classList.add('cart-row') // hozzáadja az  osztályt
    const cartItems = document.getElementsByClassName('cart-items')[0] // Kosár elemek konténerének megszerzése
    const cartItemNames = cartItems.getElementsByClassName('cart-item-title') // Megszerzi a kosár elem címeit
    // ellenőrzi, hogy az elem már benne van-e a kosárban
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Ezt az elemet már hozzáadták a kosárhoz') // megjelenít a figyelmeztető üzenetet
            return
        }
    }
    // HTML tartalom létrehozása 
    const cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">ELTÁVOLÍTÁS</button>
        </div>`
// template stringet A template string az újabb JavaScript szintaxis egyik része, amely lehetővé teszi a változók beillesztését egy szövegbe.
//A cartRowContents változóban egy HTML kódot definiálunk, amely egy kosár elemet ábrázol. 
//A ${...} részek helyére a változók értékei kerülnek behelyettesítésre.
//ezt a HTML kódot használja a weboldal a kosárba helyezett elemek megjelenítésére.

    cartRow.innerHTML = cartRowContents // beállítja az HTML tartalmat az új kosár sorhoz
    cartItems.append(cartRow) // appends az új kosár sort a kosár elemek konténeréhez
    // add a törlési gombhoz és a mennyiségbevitelhez
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

// kosár teljes összege:
function updateCartTotal() {
    const cartItemContainer = document.getElementsByClassName('cart-items')[0] // Kosár  konténer
    const cartRows = cartItemContainer.getElementsByClassName('cart-row') 
    let total = 0 // teljes összeg  
    // végigmegy a kosár sorokon
    for (let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i]
        const priceElement = cartRow.getElementsByClassName('cart-price')[0] // Ár  getter
        const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] // mennyiség getter 
        const price = parseFloat(priceElement.innerText.replace('$', '')) // ár getting floatként
        //parseFloat: is a built-in JavaScript function that parses a string argument and returns a floating-point number. 
        //It attempts to convert the string into a floating-point number, discarding any whitespace characters at the 
        //beginning of the string. If the first character cannot be converted to a number, parseFloat returns Not a Number
        const quantity = quantityElement.value // mennyiség értékének megszerzése
        total = total + (price * quantity) //  aktuális tétel összeg számol
    }
    total = Math.round(total * 100) / 100 // Az összeg kerekítése 2 tizedesjegyre
    // Math.round: Rounds the result of the multiplication to the nearest integer.
    //total:This is commonly used to ensure that currency or other values are represented with only two digits after the decimal point.
    
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total // teljes összeg megjelenítése
}
