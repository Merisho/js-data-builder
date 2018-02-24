
# Simple Data Builder
Just data builder for using in tests. You should extend this builder for your own builders to have more expressive interfaces

# How it works
Example:

    const DataBuilder = require('smp-data-builder');

    class CarBuilder extends DataBuilder {
        withWheels(num) {
            return this.with('wheels', num);
        }

        withPassenger(passenger) {
	        // This will concatenate existing 'passengers' with new passenger every time
            return this.with('passengers', [ passenger ]);
        }

        withCharacteristics(charName, charVal) {
	        // This will merge existing 'characteristics' object with new object every time
            return this.with('characteristics', {
                [charName]: charVal
            });
        }
    }
    
	/* ... */
	
	const carBuilder = new CarBuilder();
	carBuilder.withWheels(2).withPassenger('John Doe').withCharacteristics({ speed: 100 });
	
	const car = carBuilder.build();
	/*
		{
			wheels: 2,
			passengers: [ 'John Doe' ],
			characteristics: {
				speed: 100
			}
		}
	*/
build() returns new object every time so:

	carBuilder.build() !== carBuilder.build()
**Note: when you call with() for existing property and both existing property and new value are objects they will be merged.**
Let's set up some data:
	
	this.with('someObject', { a: 1 });
Result:

	this.obj = {
		someObject: {
			a: 1
		}
	};
Using 'with' with object value again is going to merge objects:

	this.with('someObject', { b: 2 });
Result:

	this.obj = {
		someObject: {
			a: 1,
			b: 2
		}
	};

But after using 'with' with another value type, 'someObject' will be replaced
	
	this.with('someObject', 123);
Result:

	this.obj = {
		someObject: 123
	};
Same works for arrays but values will be concatenated.
# Simple Data Builder API
There are only 2 methods:

 - with(*propertyName*, *value*) — place given value under propertyName in data to be built, returns current DataBuilder instance;
 - build() — builds object, returns new object every time build() is called;
