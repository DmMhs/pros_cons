import { Component, OnInit } from '@angular/core';
import { ProsConsService } from 'src/app/services/prosCons.service';

@Component({
  selector: 'app-cons',
  templateUrl: './cons.component.html',
  styleUrls: ['./cons.component.css']
})
export class ConsComponent implements OnInit {

  cons;

  constructor(private pcService: ProsConsService) {}

  ngOnInit() {
    this.cons = this.pcService.getCons();
    this.pcService.consChanged.subscribe(
      (cons) => {
        this.cons = cons;
      }
    );
  }

  deleteItem($event) {
    const val = $event.target.parentElement.innerText;
    this.pcService.deleteConItem(val);
  }
}
