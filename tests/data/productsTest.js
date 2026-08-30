//17i
import {Product, Clothing, Appliance} from "../../data/products.js";

describe('Test suite: Product', () => {
    let sampleData;

    beforeEach(() => {
        sampleData = new Product({
            id: 1,
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "boots",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: [
                "socks",
                "sports",
                "apparel"
            ],
            type: "product"
        });
    });

    it('verifies the name of an existing product', () => {
        expect(sampleData.name).toEqual('boots');
        // console.log(sampleData);
        expect(sampleData.id).toEqual(1);
    });

    it('verifies the methods', () => {
        expect(sampleData.getStarsUrl()).toEqual('images/ratings/rating-45.png');
        expect(sampleData.getPrice()).toEqual(`$10.90`);
    });
})

describe('Test suite: Appliance', () => {
    let sampleData;

    beforeEach(() => {
        sampleData = new Appliance({
            id: 1,
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Rice cooker",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: [
                "socks",
                "sports",
                "apparel"
            ],
            type: "appliance",
            instructionsLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png"
        });
    });

    it('verifies related methods', () => {
        expect(sampleData.id).toEqual(1);
        expect(sampleData.name).toEqual('Rice cooker');
        expect(sampleData.rating).toEqual({
            stars: 4.5,
            count: 87
        });
        expect(sampleData.extraInfoHTML()).toContain('Warranty');
    });
});

describe('Test suite: Clothing', () => {
    let sampleData;

    beforeEach(() => {
        sampleData = new Clothing({
            id: 1,
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "T-shirt",
            rating: {
                stars: 5.0,
                count: 90
            },
            priceCents: 2090,
            keywords: [
                "socks",
                "sports",
                "apparel"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        });
    });

    it('verifies related methods', () => {
        expect(sampleData.id).toEqual(1);
        expect(sampleData.name).toEqual('T-shirt');
        expect(sampleData.rating).toEqual({
            stars: 5.0,
            count: 90
        });
        expect(sampleData.priceCents).toEqual(2090);
        expect(sampleData.extraInfoHTML()).toContain('Size');
    });
});