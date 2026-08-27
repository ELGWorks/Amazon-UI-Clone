import {formatCurrency} from '../../scripts/utils/money.js';

describe('Test suite: formatCurrencyy', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with zero', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cent', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });

    //16a
    it('rounds down to the nearest cent', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00');
    });

    //16b
    it('works with negative numbers', () => {
        expect(formatCurrency(-100.00)).toEqual('-1.00');
    });
});

