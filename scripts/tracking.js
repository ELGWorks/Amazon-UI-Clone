import {getProduct, loadProductsFetch} from '../data/products.js';
import {orders} from '../data/orders.js';
import {cart} from '../data/cart-class.js';

const url = new URL(window.location.href);

async function renderTrackingPage() {
    
    await loadProductsFetch();

    const productId = url.searchParams.get('productId');

    const product = getProduct(productId);

    const orderId = url.searchParams.get('orderId');
    const order = orders.find((order) => {
        return order.id === orderId;
    });

    const orderProduct = order.products.find((product) => {
        return product.productId === productId;
    });

    let trackingHTML = '';

    trackingHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderProduct.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `;

    document.querySelector('.js-order-tracking-container').innerHTML = trackingHTML;

    console.log('hello from tracking');
    console.log(url.searchParams.get('orderId'));
    console.log(url.searchParams.get('productId'));
};

function updateCartQuantity() {
    let cartQuantity = 0;

    cart.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

updateCartQuantity();
renderTrackingPage();