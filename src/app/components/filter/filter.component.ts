import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() sendToParent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  @Input() filtersList=[ {name: '',value: ''}]

  sendData() {
    this.sendToParent.emit({countTrans:this.filtersList})    
  }

  clearFilters() {
    this.filtersList.forEach((el: any) => {
      el.value = '';
    });
    this.sendData();
  }

  showResults(){
    this.sendData();
  }

  ngOnInit(): void {}
}
