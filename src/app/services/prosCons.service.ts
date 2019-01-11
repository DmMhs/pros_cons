import { EventEmitter } from '@angular/core';

export class ProsConsService {

  prosChanged = new EventEmitter();
  consChanged = new EventEmitter();

  pros = [];

  cons = [];

  addToPros(value: string) {
    this.pros.push(value);
    this.prosChanged.emit(this.pros.slice());
  }

  addToCons(value: string) {
    this.cons.push(value);
    this.consChanged.emit(this.cons.slice());
  }

  getPros() {
    return this.pros.slice();
  }

  getCons() {
    return this.cons.slice();
  }

  deleteConItem(val: string) {
    const newstr = val.slice(0, val.length - 1);
    this.cons.splice(this.cons.indexOf(newstr), 1);
    this.consChanged.emit(this.cons.slice());
  }

  deleteProItem(name: string) {
    const newstr = name.slice(0, name.length - 1);
    this.pros.splice(this.pros.indexOf(newstr), 1);
    this.prosChanged.emit(this.pros.slice());
  }

  isUnique(val: string) {
    if (this.pros.indexOf(val) === -1 && this.cons.indexOf(val) === -1) {
      return true;
    } else {
      return false;
    }
  }
}
