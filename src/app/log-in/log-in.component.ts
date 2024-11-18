import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartsService } from '../service/carts.service';
import { Login } from '../model/login';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  

  LogInForm = new FormGroup ({
    user: new FormControl('',[Validators.required, Validators.minLength(4)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  })

  constructor(private logins: CartsService){}

  logIn() {
    if(!this.LogInForm.valid){
      return;
    }

    const request : Login = this.LogInForm.value as unknown as Login;
    this.logins.logIn(request).subscribe({next: (res) => {
      this.LogInForm.reset();   
    }})
  }
}
