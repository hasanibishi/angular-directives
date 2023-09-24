import { FormControl } from "@angular/forms";

export interface FormDateConfig {
    format: FormControl<string>;
    selectedDate: FormControl<Date>;
}