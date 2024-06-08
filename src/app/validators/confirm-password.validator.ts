import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.controls['password'];
    const confirmPassword = control.controls['confirm_password'];

    if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordsNotEqual: true });
    }

    return null;
};