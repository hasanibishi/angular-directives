import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FormNumericConfig } from 'src/app/_models/form-numeric-config.model';
import { ILocale } from 'src/app/_models/locale.model';

@Component({
  selector: 'numeric-format',
  templateUrl: './numeric-format.component.html',
  styleUrls: ['./numeric-format.component.scss']
})
export class NumericFormatComponent {
  /**
   * Form group, is filled into the constructor
   */
  form: FormGroup<FormNumericConfig>;

  /**
   * A dummy list for handling the minimum value of the input
   */
  minNumericValues: number[] = [-20, -5, 0, 10, 20];

  /**
  * A dummy list for handling the maximum value of the input
  */
  maxNumericValues: number[] = [5, 10, 50, 100, 100000000000];

  /**
   * A dummy list for handling the decimal spaces (digits)
   */
  decimalPlacesList: number[] = [1, 2, 3, 4, 5];

  /**
   * The decimal separator, it could be a "dot" or a "comma"
   */
  decimalSeparator: '.' | ',' = '.';

  /**
   * A dummy list for handling the locale format
   */
  localeList: ILocale[] = [
    { country: 'English', code: 'en-GB' },
    { country: 'Germany', code: 'de-DE' }
  ];

  constructor(fb: NonNullableFormBuilder) {
    this.form = fb.group({
      salary: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
      minNumericValue: new FormControl(-5, { nonNullable: true }),
      maxNumericValue: new FormControl(100000000000, { nonNullable: true }),
      allowDecimals: new FormControl(true, { nonNullable: true }),
      decimalPlaces: new FormControl(2, { nonNullable: true }),
      locale: new FormControl('en-GB', { nonNullable: true }),
      allowNegativeValue: new FormControl(true, { nonNullable: true })
    });
  }

  ngOnInit(): void {
    this.form.controls.locale.valueChanges
      .subscribe(value =>
        this.decimalSeparator = value === 'de-DE' ? ',' : '.'
      )
  }

  getErrorMessage(controlName: string, validationType: string) {
    return this.form.controls[controlName as keyof FormNumericConfig].hasError(validationType);
  }

  get salary() {
    return this.form.controls.salary;
  }

  get minNumericValue() {
    return this.form.controls.minNumericValue!;
  }

  get maxNumericValue() {
    return this.form.controls.maxNumericValue;
  }

  get allowDecimals() {
    return this.form.controls.allowDecimals;
  }

  get decimalPlaces() {
    return this.form.controls.decimalPlaces;
  }

  get allowNegativeValue() {
    return this.form.controls.allowNegativeValue;
  }

  get locale() {
    return this.form.controls.locale;
  }

  reset() {
    this.form.controls.salary.reset();
  }
}
