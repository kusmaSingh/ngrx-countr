import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { setLoadingSpinner } from '../../store/shared/shared.actions';
import { signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm : FormGroup;

  constructor(private store: Store<AppState>) {

  }
  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(null , [Validators.required, Validators.email]),
      password: new FormControl(null , [Validators.required]),
    });
  }

  onLoginSubmit() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    this.store.dispatch(setLoadingSpinner({status:true}))
    this.store.dispatch(signupStart({email, password}));
    }

showEmailErros(){
  const emailFormObj = this.signupForm.get('email');
  if(emailFormObj.touched && ! emailFormObj.valid){
    if( emailFormObj.errors['required'] ){
      return 'Email is required';
    }
    if(emailFormObj.errors['email']){
     return "Email is invalid";
    }
  }
  return '';
}

showPasswordErros(){
  const passwordObj = this.signupForm.get('password');
  if(passwordObj.touched && ! passwordObj.valid){
    if( passwordObj.errors['required'] ){
      return 'Password is required'
    }
  }
  return '';
}
}
