import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { Utility } from '../_services/utility';

@Directive({
  selector: '[minValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true }]
})
export class MinValidatorDirective implements Validator {

  @Input() minValidator!: number;

  @Input() locale: string = '';

  validate(c: FormControl) {
    const value = Utility.formatNumberViaLocale(c.value, this.locale);

    if (typeof this.minValidator === 'number' && value < +this.minValidator) {
      return { "minValidator": true }
    } else {
      return null;
    }
  }
}