import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ProsConsService } from 'src/app/services/prosCons.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: []
})
export class FormComponent implements OnInit {
  @ViewChild('inputVal') inputVal: ElementRef;
  @ViewChild('f') formInput: NgForm;
  constructor(private pcService: ProsConsService) { }

  unique = true;

  ngOnInit() {
  }

  onProsClicked() {
    const val = this.formInput.value.argument;
    this.unique = this.pcService.isUnique(val);

    if (this.formInput.valid && this.unique) {
      this.pcService.addToPros(val);
      this.formInput.reset();
    }
  }

  onConsClicked() {
    const val = this.formInput.value.argument;
    this.unique = this.pcService.isUnique(val);

    if (this.formInput.valid && this.unique) {
      this.pcService.addToCons(val);
      this.formInput.reset();
    }
  }
}
