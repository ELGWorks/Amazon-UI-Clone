// import {addToCart, removeFromCart, cart, loadFromStorage, updateDeliveryOption} from '../../data/cart.js';
import {cart} from '../../data/cart-class.js';
import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadProductsFetch} from '../../data/products.js';

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

describe('Test suite: addToCart', () => {
    //16e
    beforeEach(() => {
        spyOn(Storage.prototype, 'setItem');
        cart.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }];
    })

    it('adds an existing product to the cart', () => {
        cart.addToCart(productId1);
        expect(cart.cartItems.length).toEqual(1);
        expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        cart.addToCart(productId1);
        expect(cart.cartItems[0].quantity).toEqual(3);
        //16c
        expect(Storage.prototype.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 3,
            deliveryOptionId: '1'
        }]));
    });

    it('adds a new product to the cart', () => {
        // console.log(localStorage.getItem('cart'));

        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems.length).toEqual(1);
        expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(2);
        //16d
        expect(Storage.prototype.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }]));
    });
});

//16i
describe('Test suite: removeFromCart', () => {

    beforeEach(() => {
        spyOn(Storage.prototype, 'setItem');
        cart.cartItems = [];
    });
    
    it('removes a productId that is in the cart', () => {
        cart.addToCart(productId1);
        cart.removeFromCart(productId1);
        expect(cart.cartItems.length).toEqual(0);
        expect(Storage.prototype.setItem).toHaveBeenCalledWith(
            'cart-oop',
            JSON.stringify([])
        );
    });

    it('remove a productId that is NOT in the cart', () => {
        cart.removeFromCart(productId2);
        expect(cart.cartItems.length).toEqual(0);
        expect(Storage.prototype.setItem).toHaveBeenCalledWith(
            'cart-oop',
            JSON.stringify([])
        );
    });
});

//16k
describe('updateDeliveryOption', () => {

    beforeAll(async () => {
        await loadProductsFetch();
    });

    beforeEach(() => {
        spyOn(Storage.prototype, 'setItem');
        cart.cartItems = [{
            productId: productId1,
            quantity: 1,
            deliveryOptionId: '1'
        }];

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;
    });

    it('updates the selected delivery option', () => {           
        renderOrderSummary();
        document.querySelector(`.js-delivery-option-${productId1}-3`).click();

        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
        expect(Storage.prototype.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: productId1,
            quantity: 1,
            deliveryOptionId: '3'
        }]))
    });

    it('should do nothing if received a non existend product ID', () => {
        cart.updateDeliveryOption('does-not-exist', '3');
        // console.log(cart);
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
        expect(Storage.prototype.setItem).toHaveBeenCalledTimes(0);
    });

    it('should do nothing if received a non existent delivery option', () => {
        cart.updateDeliveryOption(productId1, '5');
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
        expect(Storage.prototype.setItem).toHaveBeenCalledTimes(0);
    });
});
