import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class Validation {

    static requiredField(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return control.value ? null : { required: true };
        };
    }

    // Check if the input contains only Persian characters
    static persianOnly(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) return null; // Ignore empty values
            const persianOnlyPattern = /^[\u0600-\u06FF\s]+$/; // Persian/Arabic characters range
            const hasNumbers = /[0-9۰-۹]/.test(control.value); // Numbers range
            return persianOnlyPattern.test(control.value) && !hasNumbers
                ? null
                : { persianOnly: true };
        };
    }

    // Check if the input contains only non-Persian characters (English letters and numbers)
    static englishOnly(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) return null; // Ignore empty values
            const englishOnlyPattern = /^[a-zA-Z][a-zA-Z\d_]*$/;
            return englishOnlyPattern.test(control.value) ? null : { 'englishOnly': true };
        }

    }

    // Check if the input contains only non-Persian Number
    static numberOnly(): ValidatorFn {
        const numericRegex = /^[0-9]*$/;
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value || '';
            return numericRegex.test(value) ? null : { numeric: true };
        };
    }

    static phoneOnly(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value || '';
            let cleanedValue = value.replace(/[^\d]/g, '');
            if (/^\d{10}$/.test(cleanedValue)) {
                return null;
            }
            return { phoneOnly: true };
        };
    }

    // Validate Iranian National ID
    static NationalCode(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value || typeof value !== 'string') return null; // Ignore empty or non-string values

            // Ensure the value is exactly 10 digits
            if (!/^\d{10}$/.test(value)) {
                return { NationalCode: true };
            }

            // Algorithm to validate Iranian National ID
            const check = parseInt(value[9], 10);
            const sum = Array.from(value.substr(0, 9))
                .map((num, index) => parseInt(num, 10) * (10 - index))
                .reduce((acc, curr) => acc + curr, 0);
            const remainder = sum % 11;

            const isValid =
                (remainder < 2 && remainder === check) ||
                (remainder >= 2 && 11 - remainder === check);

            return isValid ? null : { NationalCode: true };
        };
    }

    static Percentage(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (value === null || value === undefined || value === '') return null;

            if (!/^\d{1,3}$/.test(value) || +value > 100) {
                return { percentageInvalid: true };
            }

            return null;
        };
    }

    static matchField(field1: string, field2: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const parent = control.parent;
            if (parent) {
                const field1Control = parent.get(field1);
                const field2Control = parent.get(field2);
                if (field1Control && field2Control && field1Control.value !== field2Control.value) {
                    return { matchField: true };
                }
            }
            return null;
        };
    }

}
