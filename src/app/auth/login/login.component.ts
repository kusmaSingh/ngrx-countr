import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{

  loginForm : FormGroup;

  constructor(private store: Store<AppState>) {

  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null , [Validators.required, Validators.email]),
      password: new FormControl(null , [Validators.required]),
    });
  }

  onLoginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(loginStart({email, password}));
    }

showEmailErros(){
  const emailFormObj = this.loginForm.get('email');
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
  const passwordObj = this.loginForm.get('password');
  if(passwordObj.touched && ! passwordObj.valid){
    if( passwordObj.errors['required'] ){
      return 'Password is required'
    }
  }
  return '';
}

}
