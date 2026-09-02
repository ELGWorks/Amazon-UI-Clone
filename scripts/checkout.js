import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import '../data/car.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart, loadCartFetch} from '../data/cart.js';

//18h
async function loadPage() {
    try {
        // throw 'error1';

    //18i
    await Promise.all([
        loadProductsFetch(),
        loadCartFetch()
    ]);

    } catch (error) {
        console.log('error.please try again!!');
    }

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     })

// ]).then((value) => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });


// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve('value1');
//     });

// }).then((value) => {
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//         console.log(value);
//     });

// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// });