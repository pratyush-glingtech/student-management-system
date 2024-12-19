import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

function areValuesEqual(value1: string, value2: string){
  return (control: AbstractControl) => {
    const val1 = control.get(value1)?.value;
    const val2 = control.get(value2)?.value;
    if (val1 === val2) {
      return null;
    }
    return { notSame: true };  
  }
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formData = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    name: new FormControl('',{
      validators: [Validators.required]
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)]
      }),
      confirmPassword: new FormControl('',{
        validators: [Validators.required, Validators.minLength(8)]
      })
    },{
      validators: [areValuesEqual('password', 'confirmPassword')]
    }),
  })

  get isEmail(){
    return this.formData.controls.email;
  }

  get isName(){
    return this.formData.controls.name;
  }

  get isPasswords(){
    return this.formData.controls.passwords;
  }

  get isPassword(){
    return this.isPasswords.controls;
  }

  onSubmit() {
    if (this.formData.invalid) {
      console.log('return');

      return; 
    }
    console.log(this.formData.value); 
    this.formData.reset(); 
  }  
}
