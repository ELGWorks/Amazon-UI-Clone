//17a
class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    //17b and 17c for speed
    displayInfo() {
        const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';

        console.log(`Brand: ${this.#brand}\nModel: ${this.#model}\nSpeed: ${this.speed} km/h\nTrunk: ${trunkStatus}`);
    }

    go() {
        if (this.isTrunkOpen) {
            return;
        } else {
            this.speed += 5;

            if (this.speed >= 200) {
                this.speed = 200;
            }
        }
    }

    brake() {
        this.speed -= 5;

        if (this.speed <= 0) {
            this.speed = 0;
        }
    }

    //17d
    openTrunk() {
        if (this.speed > 0) {
            return;
        }
        this.isTrunkOpen = true;
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

const car1 = new Car({
    brand: 'Toyota',
    model: 'Corolla'
});

const car2 = new Car ({
    brand: 'Tesla',
    model: 'Model 3'
});

// console.log(car1);
// console.log(car2);

const dataset = [{
    brand: 'Toyota',
    model: 'Corolla'
}, {
    brand: 'Tesla',
    model: 'Model 3'
}, {
    brand: 'Toyota',
    model: 'AE86'
}].map((carDetails) => {
    return new Car(carDetails);
})

// console.log(dataset);

// car1.displayInfo();

//17c
car1.go();
car1.go();
car1.openTrunk();
// car1.closeTrunk();
// car1.brake();
// car1.brake();
// car1.displayInfo();

//17e
class RaceCar extends Car {
    acceleration;

    constructor(carDetails) {
        super(carDetails)
        this.acceleration = carDetails.acceleration;
    }

    go() {
        this.speed += this.acceleration;

        if (this.speed > 300) {
            this.speed = 300;
        }
    }

    openTrunk() {
        console.log('Race cars do not have a trunk.')
    }

    closeTrunk() {
        console.log('Race cars do not have a trunk.')
    }
}

//Racecars dataset
const racecars = [
    {
        brand: 'Toyota',
        model: 'AE86',
        acceleration: 20
    },
    {
        brand: 'Nissan',
        model: 'Skyline',
        acceleration: 50
    },
    {
        brand: 'Hyundai',
        model: 'Tiburon',
        acceleration: 30
    },
    {
        brand: 'Subaru',
        model: 'Impreza WRX STI',
        acceleration: 40
    }
].map((carDetails) => {
    return new RaceCar(carDetails);
});

// racecars[0].brake();
// racecars[0].openTrunk();
// racecars[0].displayInfo();