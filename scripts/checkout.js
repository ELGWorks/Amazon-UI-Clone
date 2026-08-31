import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import '../data/car.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';


async function loadPage() {
    try {
        // throw 'error1';

        await loadProductsFetch();
        
        await new Promise((resolve, reject) => {
            // throw 'error2';

            loadCart(() => {
                // reject('error 3');
                resolve();
            });
        });
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