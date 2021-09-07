import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaxFractionalDigitsDirective } from './_directives/max-fractional-digits.directive';

class Person {
  constructor(
    private tall: [number | null, Validators] = [null, Validators.required],
    private minNumericValue: number = 0,
    private maxNumericValue: number = 50,
    private allowDecimals: boolean = true,
    private decimalPlaces: number = 2,
    private allowNegativeValue: boolean = true
  ) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(MaxFractionalDigitsDirective) decimalDirective!: MaxFractionalDigitsDirective;

  form: FormGroup;

  minNumericValues: number[] = [-5, 0, 10, 20];
  maxNumericValues: number[] = [5, 10, 50, 100];

  decimalPlaces: number[] = [1, 2, 3, 4, 5];

  constructor(fb: FormBuilder) {
    this.form = fb.group(new Person());
  }

  onDecimalChange(digits: number) {
    this.decimalDirective.generateRegex(digits);
    this.resetCurrentValue();
  }

  ngOnInit() { }

  getErrorMessage(controlName: string, validationType: string) {
    return this.form.controls[controlName].hasError(validationType);
  }

  getControlValue(controlName: string) {
    return this.form.controls[controlName].value;
  }

  resetCurrentValue() {
    this.form.controls['tall'].reset();
  }
}
