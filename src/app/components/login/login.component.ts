import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = viewChild.required<NgForm>('form')
  destroyRef = inject(DestroyRef)

  constructor(){
    afterNextRender(() => {
      const loadedFormData = window.localStorage.getItem('login-info')
      if (loadedFormData) {
        const savedFormData = JSON.parse(loadedFormData)
        setTimeout(() => {
          this.form().controls['email'].setValue(savedFormData.email)          
        }, 1);
      }

      const subscription = this.form().valueChanges?.pipe(debounceTime(1000)).subscribe({
        next: (value) => window.localStorage.setItem('login-info', JSON.stringify({email: value.email})),
      });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  onSubmit(formdata: NgForm){
    if (formdata.form.invalid) {
      return;
    }

    console.log(formdata.form);
    const email = formdata.form.value.email;
    const password = formdata.form.value.password;
    formdata.form.reset()
  }
}
