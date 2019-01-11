import { Component, OnInit} from '@angular/core';
import { ProsConsService } from '../services/prosCons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProsConsService]
})
export class HomeComponent implements OnInit {

  prosLength: number;
  consLength: number;

  constructor(private pcService: ProsConsService) { }

  ngOnInit() {
    this.prosLength = this.pcService.getPros().length;
    this.consLength = this.pcService.getCons().length;
    this.pcService.prosChanged.subscribe(
      (pros) => {
        this.prosLength = pros.length;
      }
    );
    this.pcService.consChanged.subscribe(
      (cons) => {
        this.consLength = cons.length;
      }
    );
  }

}
