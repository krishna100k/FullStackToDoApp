import { Component, inject, Input, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { decrement, increment, reset } from '../../actions/counter.actions';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private store = inject(Store)
  
  count$?: Observable<number>;
  username!: string
  public submitForm!: FormGroup;

  constructor(private dataService : DataService, private authService : AuthService, private router : Router){
    this.count$ = this.store.select('count')
  }

  ngOnInit(){

    this.authService.getUserData().subscribe({
      next: (res) => {
        this.username = res?.username
        console.log(res)
      },
      error: (err) => {
        if(err){
          this.router.navigate(['login'])
        }
        console.log(err)
      }
    })

    this.submitForm = new FormGroup({
      Title : new FormControl('', Validators.required),
      Description : new FormControl('', Validators.required)
    })
  }

  logout(){
    localStorage.removeItem('JWT');
    this.router.navigate(['login']);
    alert("Logout Successfull!");
  }

  submitTodo(){

    if(this.submitForm.invalid){
      return alert("Title Or Description are required!")
    }

    const title = this.submitForm.get('Title')?.value;
    const description = this.submitForm.get('Description')?.value
    
    this.dataService.postTodo(title, description).subscribe({
      next : (res) => {
        alert("Todo Added Successfully")
        console.log( "Todo Created Successfully!", res);
      }, error : (err) => {
        console.log(err)
      }
    })
  }

  increment(){
    this.store.dispatch(increment())
  }

  decrement(){
    this.store.dispatch(decrement())
  }

  reset(){
    this.store.dispatch(reset())
  }



}
