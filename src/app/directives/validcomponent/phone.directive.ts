import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
@Directive({
  selector: '[isPhone]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PhoneDirective, multi: true }]
})
export class PhoneDirective {

  constructor() { }

  public validate(control: AbstractControl): { [key: string]: any } {
    // let emailRegEx = /(09|04|08|02|01[2|6|8|9])+([0-9]{8})\b/g;
    let phoneNumber = /^([0-9]+)$/;
    let valid = phoneNumber.test(control.value);
    if (control.value === null || control.value === undefined) {
      return { 'isPhone': true };
    }
    else {
      if (control.value.trim() == '') {
        return { 'isPhone': true };
      }
      else {
        let valid = phoneNumber.test(control.value.trim());
        if(valid)
        {
          return null;
        }
        else{
          control.setValue("");
          return { 'isPhone': true };
        }
      }
    }
  }
}

