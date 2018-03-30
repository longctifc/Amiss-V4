import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validEqual][formControlName],[validEqual][formControl],[validEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => CompareDirective), multi: true }
    ]
})
export class CompareDirective implements Validator {

    constructor(@Attribute('validEqual') public validEqual: string,
        @Attribute('reverse') public reverse: string) {
    }

    private get isReverse() {
        if (!this.reverse) return false;
        return this.reverse === 'true' ? true : false;
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        let v = c.value;
        let password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/
        // control vlaue
        let e = c.root.get(this.validEqual);
        if (e && !password.test(c.value)) {
            c.setErrors({ validEqual: false });
            return {
                validEqual: false
            }
        }
        // value not equal
        if (e && v !== e.value && !this.isReverse) {
            return {
                validEqual: false
            }
        }

        // value equal and reverse
        if (e && v === e.value && this.isReverse) {
            delete e.errors['validEqual'];
            if (!Object.keys(e.errors).length) e.setErrors(null);
        }

        // value not equal and reverse
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({ validEqual: false });
        }
        return null;
    }
}
