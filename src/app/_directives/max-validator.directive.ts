import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { Utility } from '../_services/utility';

@Directive({
  selector: '[maxValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxValidatorDirective, multi: true }]
})
export class MaxValidatorDirective implements Validator {

  @Input() maxValidator!: number;

  @Input() locale: string = '';

  validate(c: FormControl) {
    const value = Utility.formatNumberViaLocale(c.value, this.locale);

    if (typeof this.maxValidator === 'number' && value > +this.maxValidator) {
      return { "maxValidator": true }
    } else {
      return null;
    }
  }
}