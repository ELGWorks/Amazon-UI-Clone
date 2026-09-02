import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
// import {loadFromStorage, cart, updateDeliveryOption} from '../../data/cart.js';
import {cart} from '../../data/cart-class.js';
import {loadProducts, loadProductsFetch} from '../../data/products.js';

describe('Test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeAll(async () => {
        await loadProductsFetch();
    });

    beforeEach(() => {
        spyOn(Storage.prototype, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>`;        

        cart.cartItems = [{
            productId: productId1,
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: productId2,
            quantity: 1,
            deliveryOptionId: '2'
        }];

        renderOrderSummary();
    });

    //16f
    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = ``;
    });

    it('displays the cart', () => {
        //16g
        expect(
            document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs'
        );
        expect(
            document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball'
        ); 

        //16h
        expect(
            document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual('$10.90'
        );

        expect(
            document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$20.95'
        );

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');

        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');
    });

    it('removes a product', () => {
        //16h
        expect(
            document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$20.95'
        );

        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);

        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);

        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId2);
    });
    //16j
    it('updates the delivery option', () => {
        // console.log(cart);
        document.querySelector(`.js-delivery-option-${productId1}-3`).click();

        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
        expect(document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked).toEqual(true);

        expect(cart.cartItems.length).toEqual(2);
        expect(cart.cartItems[0].productId).toEqual(productId1);
        console.log(cart.cartItems.deliveryOptionId);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
        console.log(cart);
        expect(document.querySelector('.js-shipping-price').innerText).toEqual('$14.98');
        expect(document.querySelector('.js-total-price').innerText).toEqual('$63.50');
    });
});