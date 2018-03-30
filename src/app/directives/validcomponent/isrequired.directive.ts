import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[isRequired]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IsrequiredDirective, multi: true }]
})
export class IsrequiredDirective {

  constructor() { }
  public validate(control: AbstractControl): { [key: string]: any } {
    if (control.value === null || control.value === undefined) {
      return { 'isRequired': true };
    }
    else {
      if (control.value.trim().length == 0) {
        return { 'isRequired': true };
      }
      else {
        return null;
      }
    }
  }


}
