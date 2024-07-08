import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title :string = "";
  description : string = "";

  constructor(private dataService : DataService){}

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

}
