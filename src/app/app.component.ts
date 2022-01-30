import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaxFractionalDigitsDirective } from './_directives/max-fractional-digits.directive';
import { Person } from './_models/person.model';
import { ISeparator } from './_models/separator.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MaxFractionalDigitsDirective) decimalDirective!: MaxFractionalDigitsDirective;

  form: FormGroup;

  minNumericValues: number[] = [-5, 0, 10, 20];
  maxNumericValues: number[] = [5, 10, 50, 100];

  decimalPlaces: number[] = [1, 2, 3, 4, 5];

  decimalSeparator: ISeparator[] = [
    { sign: '.', label: 'Dot (.)' },
    { sign: ',', label: 'Comma (,)' }
  ];

  constructor(fb: FormBuilder) {
    this.form = fb.group(new Person());
  }

  getErrorMessage(controlName: string, validationType: string) {
    return this.form.controls[controlName].hasError(validationType);
  }

  getControlValue(controlName: string) {
    return this.form.controls[controlName].value;
  }

  reset() {
    this.form.controls['tall'].reset();
  }
}
