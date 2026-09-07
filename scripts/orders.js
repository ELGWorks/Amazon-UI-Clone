//18l
import {orders} from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {formatCurrency} from './utils/money.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import {cart} from '../data/cart-class.js';

async function renderOrderPage() {
    await loadProductsFetch();
    //show the html
    //call the orders[]
    //generate for each object
    
    let ordersHTML = '';

    orders.forEach((order) => {
        const orderTimeString = dayjs(order.orderTime).format('MMMM D');
        const totalCost = formatCurrency(order.totalCostCents);

          ordersHTML += `
          <div class="order-container">
            
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${orderTimeString}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${totalCost}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
              </div>
            </div>

            <div class="order-details-grid">
              ${renderOrderDetails(order)}
            </div>
          </div>`;
      });

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantity = 1;
      cart.addToCart(productId, quantity);
      window.location.href = 'checkout.html';
    });
  });
};

function renderOrderDetails(order) {

  let productDetailsHTML = '';

    order.products.forEach((product) => {

      const productDetails = getProduct(product.productId);

      const arrivingDate = dayjs(product.estimatedDeliveryTime).format('MMMM D');

      productDetailsHTML += `
      <div class="product-image-container">
          <img src="${productDetails.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${productDetails.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${arrivingDate}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>`;
  });

  return productDetailsHTML;
};

renderOrderPage();