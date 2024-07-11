import { Component, inject, Input, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { increment, decrement, reset } from './actions/counter.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private store = inject(Store)
  
  count$?: Observable<number>;
  public submitForm!: FormGroup;

  constructor(private dataService : DataService){
    this.count$ = this.store.select('count')
  }

  ngOnInit(){
    this.submitForm = new FormGroup({
      Title : new FormControl('', Validators.required),
      Description : new FormControl('', Validators.required)
    })
  }

  submitTodo(){

    if(this.submitForm.invalid){
      return alert("Title Or Description are required!")
    }

    const title = this.submitForm.get('Title')?.value;
    const description = this.submitForm.get('Description')?.value
    
    this.dataService.postTodo(title, description).subscribe({
      next : (res) => {
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
