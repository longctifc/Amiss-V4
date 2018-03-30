import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[isDefaultSelect]',
  providers: [{ provide: NG_VALIDATORS, useExisting: SelectdefautDirective, multi: true }]
})
export class SelectdefautDirective {

  constructor() { }
  public validate(control: AbstractControl): { [key: string]: any } {
    if(control.value === 0 || control.value===-1)
    {
      return { 'isDefaultSelect': true };
    }
    else 
    {
      return null
    }
  }
}
