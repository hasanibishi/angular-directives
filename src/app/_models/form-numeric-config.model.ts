import { FormControl } from "@angular/forms";

export interface FormNumericConfig {
    salary: FormControl<number>;
    minNumericValue: FormControl<number>;
    maxNumericValue: FormControl<number>;
    allowDecimals: FormControl<boolean>;
    decimalPlaces: FormControl<number>;
    locale: FormControl<string>;
    allowNegativeValue: FormControl<boolean>;
}