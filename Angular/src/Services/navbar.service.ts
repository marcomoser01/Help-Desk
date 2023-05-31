import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  $mainNav: Subject<boolean> = new Subject();
  $libreriaNav: Subject<boolean> = new Subject(); 
  appComponentReload: boolean = false;


  constructor() {
    this.$mainNav.next(true);
    this.$libreriaNav.next(false);
  }

  get(bar: string) {
    switch (bar) {
      case "main": {
        return this.$mainNav;
        break
      }
      case "libreria": {
        return this.$libreriaNav;
        break
      }

    }
    return this.$mainNav;
  }

  sendNext(bar: string, valore: boolean) {
    switch (bar) {
      case "main": {
        return this.$mainNav.next(valore);
        break
      }
      case "libreria": {
        return this.$libreriaNav.next(valore);
        break
      }
    }
  }

  getMainNav() {
    return this.$mainNav;
  }

  getLibreriaNav() {
    return this.$libreriaNav;
  }

  checkNavbarServiceValue(caller: String) {
    
    if(caller != 'main') {
      if(this.$mainNav.observed) {
        this.$mainNav.next(false);
      }
    }

    if(caller != 'libreria') {
      if(this.$mainNav.observed) {
        this.$libreriaNav.next(false);
      }
    }

  }


}
