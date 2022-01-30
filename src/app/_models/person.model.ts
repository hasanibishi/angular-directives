import { Validators } from '@angular/forms';

export class Person {
    constructor(
        private tall: [number | null, Validators] = [null, Validators.required],
        private minNumericValue: number = 0,
        private maxNumericValue: number = 50,
        private allowDecimals: boolean = true,
        private decimalPlaces: number = 2,
        private decimalSeparator: string = '.',
        private allowNegativeValue: boolean = true
    ) { }
}