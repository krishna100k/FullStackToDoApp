import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent  {
 title = "Angular"
 
 constructor(private authService : AuthService, private router : Router){

 }

//  ngOnInit(){
//   this.authService.getUserData().subscribe({
//     next: (res) => {
//       console.log(res)
//     },
//     error: (err) => {
//       if(err){
//         this.router.navigate(['login'])
//       }
//       console.log(err)
//     }
//   })
//  }

}
