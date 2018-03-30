import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[isEmail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailDirective, multi: true }]
})
export class EmailDirective implements Validator {
  public constructor() { }

  public validate(control: AbstractControl): { [key: string]: any } {
    let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    let valid = emailRegEx.test(control.value);
    if (control.value === null || control.value === undefined) {
      return { 'isEmail': true };
    }
    else {
      if (control.value.trim().length > 100) {
        return { 'isEmailMaxLength': true };
      }
      else {
        return control.value < 1 || valid ? null : { 'isEmail': true };
      }
    }

  }
}