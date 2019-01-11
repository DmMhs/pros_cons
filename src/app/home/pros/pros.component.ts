import { Component, OnInit } from '@angular/core';
import { ProsConsService } from 'src/app/services/prosCons.service';

@Component({
  selector: 'app-pros',
  templateUrl: './pros.component.html',
  styleUrls: ['./pros.component.css']
})
export class ProsComponent implements OnInit {

  pros;

  constructor(private pcService: ProsConsService) { }

  ngOnInit() {
    this.pros = this.pcService.getPros();
    this.pcService.prosChanged.subscribe(
      (pros) => {
        this.pros = pros;
      }
    );
  }

  deleteItem($event) {
    const val = $event.target.parentElement.innerText;
    this.pcService.deleteProItem(val);
  }
}
