let dishes = ["Geisha Bento", "Rock n´Roll", "Maki Bento", "Maki-Sushi", "Nigiri", "Sashimi", "Sushi-Balls", "Temaki", "Samurai-Spezial", "Zen-Maki", "Lotus-Nigiri", "Sushi-Sinfonie", "Tempura-Temaki", "Drachen-Rolle", "Kimono-Maki", "Happen-Nigiri"];
let prices = [14.95, 11.95, 12.95, 15.95, 20.95, 19.95, 18.95, 21.95, 32.95, 18.95, 14.95, 19.95, 9.95, 10.95, 17.95, 25.95];
let dishDescriptions = ["6 Rolls 16 Maki 12 Nigiri", "12 Rock-Rolls 12 Maki 8 Nigiri", "8 Tiger-Rolls 24 Sake-Maki", "8 Maki 16 Sake-Maki", "16 Nigiri 6 Maki 12 Sashimi", "2 Sushi-Balls 20 Maki 8 Temaki", "4 Maki 6 Nigiri", "8 Maki 16 Sake-Maki", "6 Rolls", "16 Maki", "12 Nigiri", "12 Rock-Rolls, 12 Maki, 8 Nigiri", "8 Temaki", "8 Tiger-Rolls, 24 Sake-Maki", "8 Maki", "16 Nigiri, 6 Maki, 12 Sashimi"];
let dishesImgs = ["img/GeishaBento.jpg", "img/Rock´n´Roll.jpg", "img/MakiBento.jpg", "img/Maki-Sushi.jpg", "img/Nigiri-Rolls.jpg", "img/Sashimi.jpg", "img/Sushi-Balls.jpg", "img/Temaki.jpg", "img/dish9.jpg", "img/dish9.jpg", "img/dish10.jpg", "img/dish11.jpg", "img/dish12.jpg", "img/dish13.jpg", "img/dish14.jpg", "img/dish15.jpg", "img/dish16.jpg"];

let basketDishes = [];
let basketPrices = [];
let amounts = [];
let deliveryCost = 2.99;
let totalSum = 0;
let formattedTotalSum = totalSum.toFixed(2).replace(".", ",");
let calculateBasketSum = 0;
let formattedSubSum = calculateBasketSum.toFixed(2).replace(".", ",");

let minOrderSum = 30;

function render() {
    renderMenu();
    renderDishList();
    renderEmptyBasket();
    renderBasketButton();
}

function renderMenu() {
    document.getElementById("restaurant-menu").innerHTML = ``;
    for (let i = 0; i < dishes.length; i++) {
        let dish = dishes[i];
        let price = prices[i];
        let dishesImg = dishesImgs[i];
        let dishDescription = dishDescriptions[i];
        let formattedPrice = price.toFixed(2).replace(".", ",");
        document.getElementById("restaurant-menu").innerHTML += renderMenuHTML(dishesImg, dishDescription, formattedPrice, price, dish);
    }
}

function renderEmptyBasket() {
    document.getElementById("basket-container").innerHTML = /*html*/ `   
<div class="basket">
   <p class="basket-headline">Warenkorb</p>
   <img src="img/close.svg" alt="close" class="closeMobileBasketIcon, d-none" id="closeMobileBasketIcon" onclick="closeMobileBasket()">
   <div id="delivery-options">
      <div class="delivery-options">
         <div
            id="delivery"
            class="white-background"
            onclick="choseDeliveryOption(${totalSum})"
            >
            <img src="/Lieferando/img/bike.png" alt="bike" class="bike" />
            <div>
               <p class="delivery-options-text"><b>Lieferung</b></p>
               <p class="delivery-options-text">20-25 Min</p>
            </div>
         </div>
         <div id="pick-up" onclick="choosePickUpOption(${totalSum})">
            <img src="/Lieferando/img/pick-up.png" alt="bike" class="bike" />
            <div>
               <p class="delivery-options-text"><b>Abholung</b></p>
               <p class="delivery-options-text">15 Min</p>
            </div>
         </div>
      </div>
   </div>
   <div class="basket-elements-container">
      <div id="basket-content">
         <img
            src="/Lieferando/img/shopping-cart.png"
            alt="shopping-cart"
            class="shopping-cart-img"
            />
         <p class="call-to-action-basket">Fülle deinen Warenkorb</p>
         <div class="basket-content-text">
            Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle
            dein Essen
         </div>
      </div>
      <div id="minimumOrderValueContainer"></div>
      <div id="subSum"></div>
      <div id="deliveryCosts"></div>
      <div id="basketSum"></div>
      <div id="orderButton"></div>
   </div>
</div>
`;
    renderDeliveryCostYesOrNot();
}

function choosePickUpOption() {
    document.getElementById("delivery").classList.remove("white-background");
    document.getElementById("pick-up").classList.add("white-background");
    document.getElementById("deliveryCosts").classList.add("display-none");
    deliveryCost = 0;
    calculateSums();
}

function choseDeliveryOption() {
    document.getElementById("delivery").classList.add("white-background");
    document.getElementById("pick-up").classList.remove("white-background");
    document.getElementById("deliveryCosts").classList.remove("display-none");
    document.getElementById("minimumOrderValueContainer").classList.remove("display-none");
    deliveryCost = 2.99;
    calculateSums();
}

function renderDeliveryCostYesOrNot() {
    if (deliveryCost == 0) {
        document.getElementById("delivery").classList.remove("white-background");
        document.getElementById("pick-up").classList.add("white-background");
    } else {
        document.getElementById("delivery").classList.add("white-background");
        document.getElementById("pick-up").classList.remove("white-background");
    }
}

function addToBasket(dish, price) {
    let index = basketDishes.indexOf(dish);
    if (index == -1) {
        amounts.push(1);
        basketDishes.push(dish);
        basketPrices.push(price);
    } else {
        amounts[index]++;
    }
    calculateSums();
}

function deleteFromBasket(index, amount) {
    if (amount > 1) {
        amounts[index]--;
    } else {
        amounts.splice(index, 1);
        basketDishes.splice(index, 1);
        basketPrices.splice(index, 1);
    }
    calculateSums();
    deleteFromMobileBasket();
}

function calculateSums() {
    let calculateBasketSum = 0;
    document.getElementById("basket-content").innerHTML = ``;
    for (let i = 0; i < basketDishes.length; i++) {
        let amount = amounts[i];
        let basketDish = basketDishes[i];
        let price = basketPrices[i];
        let dishSum = amount * price;
        let formattedDishPrice = dishSum.toFixed(2).replace(".", ",");
        calculateBasketSum += dishSum;
        renderBasketContentHTML(i, amount, basketDish, price, formattedDishPrice);
    }
    totalSum = calculateBasketSum + deliveryCost;
    renderAllSums(calculateBasketSum);
    renderBasketButton();
    calculateBasketButton(calculateBasketSum);
}

function renderBasketContentHTML(index, amount, basketDish, price, formattedDishPrice) {
    document.getElementById("basket-content").innerHTML += /*html*/ `
    <div class="basketElements">
        <img src="img/add.png" alt="add" class="buttonsBasket" onclick="addToBasket('${basketDish}', ${basketPrices})"/>
        <img src="img/reduce.png" alt="reduce" class="buttonsBasket" onclick="deleteFromBasket(${index}, ${amount}, '${basketDish}')"/>
        <div class="fullShoppingBasket">
        <div class="sumsSeperator"><b>${amount} x ${basketDish} ${price}€ = <div>${formattedDishPrice}€</b></div></div>
        </div>
    </div>  
`;
}

function renderAllSums(calculateBasketSum) {
    let formattedDeliveryCosts = deliveryCost.toFixed(2).replace(".", ",");
    let formattedTotalSum = totalSum.toFixed(2).replace(".", ",");
    let formattedSubSum = calculateBasketSum.toFixed(2).replace(".", ",");
    let differenceToMinimumOrder = minOrderSum - calculateBasketSum;
    let formatteddifferenceToMinimumOrder = differenceToMinimumOrder.toFixed(2).replace(".", ",");
    calculateDeliveryCost(calculateBasketSum, formatteddifferenceToMinimumOrder);
    renderFormattedSums(formattedDeliveryCosts, formattedTotalSum, formattedSubSum, calculateBasketSum);
    checkBasketSum(calculateBasketSum);
    calculateBasketButton(calculateBasketSum);
}

function calculateDeliveryCost(calculateBasketSum, formatteddifferenceToMinimumOrder) {
    if (deliveryCost == 0) {
        //choosePickUpOption
        document.getElementById("minimumOrderValueContainer").classList.add("display-none");
        document.getElementById("deliveryCosts").classList.add("display-none");
    } else {
        //choseDeliveryOption
        checkMinOrderValue(calculateBasketSum, formatteddifferenceToMinimumOrder);
    }
}

function renderFormattedSums(formattedDeliveryCosts, formattedTotalSum, formattedSubSum, calculateBasketSum) {
    document.getElementById("subSum").innerHTML = /*html*/ `
<div class="sumsSeperator">Zwischensumme: <div>${formattedSubSum}€</div></div>`;
    document.getElementById("deliveryCosts").innerHTML = /*html*/ `
<div class="sumsSeperator">Lieferkosten: <div>${formattedDeliveryCosts}€</div></div>`;
    document.getElementById("basketSum").innerHTML = /*html*/ `<div class="sumsSeperator"><b>Gesamtsumme: <div>${formattedTotalSum}€</b></div></div>`;
    document.getElementById("orderButton").innerHTML = /*html*/ `<button id="orderButtonContent" onclick="submitOrder(${calculateBasketSum})"><b>Jetzt bestellen</b></button>`;
}

function checkBasketSum(calculateBasketSum) {
    if (calculateBasketSum == 0) {
        renderEmptyBasket();
    }
}

function submitOrder() {
    if (deliveryCost == 0) {
        orderForPickUp();
    } else {
        orderDelivery();
    }
}

function orderDelivery() {
    if (totalSum < minOrderSum) {
        alert("Du hast den Mindestbestellwert leider noch nicht erreicht");
    } else {
        alert("Vielen Dank für deine Bestellung!");
        amounts.splice(0, amounts.length);
        basketDishes.splice(0, basketDishes.length);
        basketPrices.splice(0, basketPrices.length);
        calculateSums();

        if (window.innerWidth < 950) {
            document.getElementById("basket-container").classList.add("d-none");
            renderBasketButton();
        } else {
            renderEmptyBasket();
        }
    }
}

function orderForPickUp() {
    alert("Vielen Dank für deine Bestellung!");
    amounts.splice(0, amounts.length);
    basketDishes.splice(0, basketDishes.length);
    basketPrices.splice(0, basketPrices.length);
    calculateSums();
    if (window.innerWidth < 950) {
        document.getElementById("basket-container").classList.add("d-none");
        renderBasketButton();
    } else {
        renderEmptyBasket();
    }
}

function checkMinOrderValue(calculateBasketSum, formatteddifferenceToMinimumOrder) {
    if (calculateBasketSum < minOrderSum) {
        document.getElementById("minimumOrderValueContainer").classList.remove("display-none");
        document.getElementById("minimumOrderValueContainer").innerHTML = /*html*/ `
        <div class="minimumOrderValue">Du benötigst noch ${formatteddifferenceToMinimumOrder}€ um den Mindestbestellwert zu erreichen</div>`;
    } else {
        document.getElementById("minimumOrderValueContainer").classList.add("display-none");
    }
}

function openSearchField() {
    document.getElementById("filterContainer").innerHTML = /*html*/ `
<div id="inputContainer">
   <input type="text" placeholder="Suche nach Gerichten, usw..." id="searchField" onkeypress="filterDishes()">
   <div id="inputSeperator"></div>
   <img src="img/close.svg" alt="close-search" onclick="closeSearchField()">
</div>
`;
}

function closeSearchField() {
    document.getElementById("restaurant-menu").innerHTML = ``;
    document.getElementById("filterContainer").innerHTML = /*html*/ `<img src="img/magnifier.png" alt="search" id="searchIcon" onclick="openSearchField()" />
<div id="dishListMainContainer">
   <img src="img/Left_arrow.svg.png" alt="leftArrow" class="listArrows" onclick="scrollListItemsLeft()" />
   <div id="dishListContainer"></div>
   <img src="img/Right_arrow.svg.png" alt="rightArrow" class="listArrows" onclick="scrollListItemsRight()" />
</div>
`;
    renderDishList();
    renderMenu();
}

function filterDishes() {
    document.getElementById("restaurant-menu").innerHTML = ``;
    let filterDish = document.getElementById("searchField").value;
    filterDish = filterDish.toLowerCase();
    for (let i = 0; i < dishes.length; i++) {
        let dish = dishes[i];
        let price = prices[i];
        let dishesImg = dishesImgs[i];
        let dishDescription = dishDescriptions[i];
        let formattedPrice = price.toFixed(2).replace(".", ",");
        if (dish.toLowerCase().includes(filterDish)) {
            document.getElementById("restaurant-menu").innerHTML += renderMenuHTML(dishesImg, dishDescription, formattedPrice, price, dish);
        }
    }
}

function renderMenuHTML(dishesImg, dishDescription, formattedPrice, price, dish) {
    return /*html*/ `
<div id="${dish}" class="dishes">
   <div>
      <div class="menu-and-info">
         <p class="dish-name">${dish}</p>
         <img
            src="/Lieferando/img/information.png"
            alt="information"
            class="dish-info"
            />
      </div>
      <p class="dishes-description">${dishDescription}</p>
      <p class="dish-price"><b>${formattedPrice}€</b></p>
   </div>
   <div class="menuimg-and-addbutton">
      <img
         src=${dishesImg}
         alt="dishes-img"
         class="dishes-imgs"
         />
      <img src="/Lieferando/img/add.png" alt="add" class="add-button" onclick="addToBasket('${dish}', ${price})"/>
   </div>
</div>`;
}

function renderDishList() {
    for (let i = 0; i < dishes.length; i++) {
        let dish = dishes[i];
        document.getElementById("dishListContainer").innerHTML += /*html*/ `
<ul class="dishListItem"><a href="#${dish}" class="linkStyles" >${dish}</a></ul>
`;
    }
}

function scrollListItemsLeft() {
    document.getElementById("dishListContainer").scrollLeft -= 140;
}

function scrollListItemsRight() {
    document.getElementById("dishListContainer").scrollLeft += 140;
}

function renderBasketButton() {
    document.getElementById("basketButtonContainer").innerHTML = /*html*/ `<button class="basketButton" onclick="openMobileBasket()">${formattedTotalSum}€</button>`;
}

function openMobileBasket() {
    if (totalSum === 0 || totalSum === 2.99) {
        alert("Bitte füge etwas in den Warenkorb hinzu!");
        return;
    }
    document.getElementById("basket-container").classList.remove("d-none");
    document.getElementById("basketButtonContainer").classList.add("d-none");
    if (calculateSums()) {
        document.getElementById("basketButtonContainer").classList.add("d-none");
    }
}

function deleteFromMobileBasket() {
    if (totalSum === 0 || totalSum === 2.99) {
        if (window.innerWidth < 950) {
            document.getElementById("basket-container").classList.add("d-none");
            document.getElementById("basketButtonContainer").classList.remove("d-none");
        }
        renderMenu();
    }
}

function closeMobileBasket() {
    document.getElementById("basket-container").classList.add("d-none");
    document.getElementById("basketButtonContainer").classList.remove("d-none");
}

function calculateBasketButton(calculateBasketSum) {
    let formattedSubSum = calculateBasketSum.toFixed(2).replace(".", ",");
    document.getElementById("basketButtonContainer").innerHTML = /*html*/ `<button class="basketButton" onclick="openMobileBasket()">${formattedSubSum}€</button>`;
}
