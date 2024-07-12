import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm !: FormGroup
  
  constructor(private authService : AuthService, private router : Router){

  }

  ngOnInit(){
    this.loginForm = new FormGroup({
      Username: new FormControl("", Validators.required),
      Password: new FormControl("", Validators.required)
    })
  }

  submit(){
    const user = new User;
    user.username = this.loginForm.get("Username")?.value;
    user.password = this.loginForm.get("Password")?.value;
    this.authService.login(user.username, user.password).subscribe({
      next: (res)=> {
        alert(res?.message)
        localStorage.setItem("JWT", res?.token);
        this.router.navigate(['/'])
        console.log(res)
      }, 
      error: (err) => {
        alert(err?.error)
        console.log(err)
      }
    })
  }



}
