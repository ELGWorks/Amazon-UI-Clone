import {addToCart, cart, loadFromStorage} from '../../data/cart.js';
console.log(cart);
describe('Test suite: addToCart', () => {
    //16e
    beforeEach(() => {
        spyOn(Storage.prototype, 'setItem');
    })

    it('adds an existing product to the cart', () => {
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        //16c
        expect(Storage.prototype.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }]));
    });

    it('adds a new product to the cart', () => {
        spyOn(Storage.prototype, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        
        loadFromStorage();

        console.log(localStorage.getItem('cart'));

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