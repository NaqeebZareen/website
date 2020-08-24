import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  constructor() { }
  // receiving input data from other components
  @Input() public city: string;
  @Input() public cityColorFlag: boolean; // also if in future want to highlight city in listed cities
  @Output() public notify = new EventEmitter();

  ngOnInit() {
  }
  // user choice city fnc ....
  selectedCity = (city: any) => {
    this.notify.emit(city);
  }

}
