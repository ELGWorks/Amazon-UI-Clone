//18l
import {orders} from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {formatCurrency} from './utils/money.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import {getDeliveryOption} from '../data/deliveryOptions.js';

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
};

function renderOrderDetails(order) {

  let productDetailsHTML = '';

    order.products.forEach((product) => {

      const productDetails = getProduct(product.productId);

      const productArrive = getDeliveryOption(product.deliveryOptionId);
      const arrivingDate = dayjs(order.orderTime).add(productArrive.deliveryDays, 'day').format('MMMM D');

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
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>`;
  });
  return productDetailsHTML;
};
renderOrderPage();