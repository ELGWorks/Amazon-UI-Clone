import {addToCart, removeFromCart, cart, loadFromStorage, updateDeliveryOption} from '../../data/cart.js';
import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

describe('Test suite: addToCart', () => {
    //16e
    beforeEach(() => {
        spyOn(Storage.prototype, 'setItem');
        spyOn(Storage.prototype, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        loadFromStorage();
    })

    it('adds an existing product to the cart', () => {
        addToCart(productId1);
        expect(cart.length).toEqual(1);
        expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        addToCart(productId1);
        expect(cart[0].quantity).toEqual(2);
        //16c
        expect(Storage.prototype.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }]));
    });

    it('adds a new product to the cart', () => {
        // console.log(localStorage.getItem('cart'));

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        //16d
        expect(Storage.prototype.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }]));
    });
});

//16i
describe('Test suite: removeFromCart', () => {

    beforeEach(() => {
        spyOn(Storage.prototype, 'setItem');
        spyOn(Storage.prototype, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        loadFromStorage();
    });
    
    it('removes a productId that is in the cart', () => {
        addToCart(productId1);
        removeFromCart(productId1);
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
    });

    it('remove a productId that is NOT in the cart', () => {
        removeFromCart(productId2);
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
    });
});

//16k
describe('updateDeliveryOption', () => {
    beforeEach(() => {
        spyOn(Storage.prototype, 'setItem');
        spyOn(Storage.prototype, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });

        loadFromStorage();

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;
    });

    it('updates the selected delivery option', () => {           
        renderOrderSummary();
        document.querySelector(`.js-delivery-option-${productId1}-3`).click();

        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(Storage.prototype.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: productId1,
            quantity: 1,
            deliveryOptionId: '3'
        }]))
    });

    it('should do nothing if received a non existend product ID', () => {
        updateDeliveryOption('does-not-exist', '3');
        // console.log(cart);
        expect(cart.length).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(Storage.prototype.setItem).toHaveBeenCalledTimes(0);
    });

    it('should do nothing if received a non existent delivery option', () => {
        updateDeliveryOption(productId1, '5');
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(Storage.prototype.setItem).toHaveBeenCalledTimes(0);
    });
});
