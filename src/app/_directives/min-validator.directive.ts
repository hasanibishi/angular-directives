import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[minValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true }]
})
export class MinValidatorDirective implements Validator {

  @Input() minValidator!: number;

  validate(c: FormControl): any {
    const v = c.value;

    if (typeof this.minValidator === 'number' && v < +this.minValidator) {
      return { "minValidator": true }
    }
  }
}