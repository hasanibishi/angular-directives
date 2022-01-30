import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[maxValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxValidatorDirective, multi: true }]
})
export class MaxValidatorDirective implements Validator {

  @Input() maxValidator!: number;

  validate(c: FormControl): any {
    const v = c.value;

    if (typeof this.maxValidator === 'number' && v > +this.maxValidator) {
      return { "maxValidator": true }
    }
  }
}