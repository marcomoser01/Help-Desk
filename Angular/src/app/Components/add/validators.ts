import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export class Validators {
    constructor() { }

    static isNumber(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const val: number = control.value;

            if (control.pristine || control.pristine) {
                return null;
            }


            if (isNaN(Number(val))) {
                return { 'notNumber': false };
            } else {
                return null;
            }
        };
    }

    static ip(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const val: string = control.value;
            let i: number = 0;
            let continua: Boolean = true;

            if (control.pristine || control.pristine) {
                return null;
            }

            const bytes = val.split('.');
            if (bytes.length == 4) {
                
                do {
                    if (!isNaN(Number(bytes[i])) && Number(bytes[i]) < 256) {
                        i++;
                    } else {
                        console.log('vado in errore con: ' + Number(bytes[i]));
                        
                        continua = !continua;
                    }
                } while (continua && i < bytes.length);
                if (continua) {
                    return null;
                }
            }
            return { 'ip': false }

        };
    }
    static patient(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const val: number = control.value;

            if (control.pristine || control.pristine) {
                return null;
            }


            if (isNaN(Number(val))) {
                return { 'username': true };
            } else {
                return null;
            }
        };
    }

    static valid(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const val: number = control.value;

            if (control.pristine || control.pristine) {
                return null;
            }


            if (isNaN(Number(val))) {
                return { 'username': true };
            } else {
                return null;
            }
        };
    }


}