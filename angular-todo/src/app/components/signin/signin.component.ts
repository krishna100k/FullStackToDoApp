import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  registerForm !: FormGroup;
  constructor(private authService : AuthService, private router: Router){
  }

  ngOnInit(){
    this.registerForm = new FormGroup({
      Username : new FormControl('', Validators.required),
      Password : new FormControl('', Validators.required)
    })
  }

  submit(){
    const user = new User();
    user.username = this.registerForm.get("Username")?.value;
    user.password = this.registerForm.get("Password")?.value;
    this.authService.signIn(user.username, user.password).subscribe({
      next: (res) => {
        alert(res)
        this.router.navigate(['login'])
      },
      error: (err) => {
        alert(err.error)
        console.log(err);
      }
    });
  }

}
