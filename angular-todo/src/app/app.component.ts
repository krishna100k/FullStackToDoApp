import { Component, inject } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { increment, decrement, reset } from './actions/counter.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private store = inject(Store)

  title :string = "";
  description : string = "";
  
  count$?: Observable<number>;

  constructor(private dataService : DataService){
    this.count$ = this.store.select('count')
  }

  submitTodo(){
    this.dataService.postTodo(this.title, this.description).subscribe({
      next : (res) => {
        console.log( "Todo Created Successfully!", res);
        this.title = "";
        this.description = "";
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
