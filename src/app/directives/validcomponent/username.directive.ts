import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
@Directive({
  selector: '[isUserName]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UsernameDirective, multi: true }]
})
export class UsernameDirective {

  constructor() { }

  public validate(control: AbstractControl): { [key: string]: any } {
    // let emailRegEx = /^[a-zA-Z][a-zA-Z0-9]*[ ._-]?[a-zA-Z0-9]+$/;
    let userNameRegex =/^[a-z0-9_-]{3,50}$/
    if(control.value===null || control.value === undefined)
    {
      return { 'isUserName': true };
    }
    else
    {
      if(control.value.trim()=='')
      {
        return { 'isUserName': true };
      }
      else
      {
        let valid = userNameRegex.test(control.value.trim());
        return control.value < 1 || valid ? null : { 'isUserName': true };
      }
    }
  }
}
