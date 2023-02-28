import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  isChecked: boolean = false;
  mode: string = 'nightlight_round';
  title = 'FE-CRUDMascotaas';


constructor(){

  this.obtener_locaalStorage();

}

obtener_locaalStorage() {
    let darkMode = localStorage.getItem('darkMode');
    if (darkMode == 'true') {
      this.isChecked = true;
      this.mode = 'wb_sunny';
      document.body.classList.add('darkMode');
    } else {
      this.isChecked = false;
      this.mode = 'nightlight_round';
      document.body.classList.remove('darkMode');
    }
  }

  load(){

    const darkMode = localStorage.getItem('darkMode');
    if(!darkMode){this.store('false');}
    else if (darkMode == 'true'){

  }
  }
  store(value:any){
    localStorage.setItem('darkMode', value);
  }


  changed(event:MatSlideToggleChange): void{
    this.mode = event.checked ? 'nightlight_round' : 'wb_sunny';
    document.body.classList.toggle('darkMode');
  }



}
