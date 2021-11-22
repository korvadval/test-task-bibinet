import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() sendToParent: EventEmitter<any> = new EventEmitter<any>();
  @Output() hideFilter: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  @Input() filter: any = {}; //get preview filters
  @Input() dictionary: any = []; //get data for render SELECTs

//contains info for render filters INPUTs and contains they state
  simpleFiltersList: any = [
    { name: 'id', value: '', filterField: 'company_id' }, //int
    { name: 'Наименование комании', value: '', filterField: 'company_name' }, //str
    { name: 'Телефон', value: '', filterField: 'phone' }, //str
    { name: 'Емайл', value: '', filterField: 'email' }, //str
    { name: 'Сайт', value: '', filterField: 'site' }, //str
    { name: 'Представитель', value: '', filterField: 'agents' }, //str
    { name: 'Адрес', value: '', filterField: 'address' }, //str
  ];

//contains info for render filters SELECTs and contains they state
  hardFiltersList: any = [
    { name: 'Статус комании', value: '', filterField: 'company_state' }, //int[]
    { name: 'Тип компании', value: '', filterField: 'company_type' }, //int
    { name: 'Регион', value: '', filterField: 'region' }, //int[]
    { name: 'Область, край', value: '', filterField: 'district' }, //int[]
  ];

 //create filter object and send to table
  sendData() {
    this.simpleFiltersList.forEach((el: any) => {
      if (el.value != '') {
        this.filter[el.filterField] = el.value;
      } else {
        delete this.filter[el.filterField];
      }
    });
    this.dictionary.forEach((el: any) => {
      if (el.value != '') {
        this.filter[el.filterField] = el.value;
      } else {
        delete this.filter[el.filterField];
      }
    });
    this.sendToParent.emit(this.filter);
  }

  clearFilters() {
    this.simpleFiltersList.forEach((el: any) => {
      el.value = '';
    });
    this.dictionary.forEach((el: any) => {
      el.value = '';
    });
    
    this.sendData();
  }

  showResults() {
    this.hideFilter.emit(true)
    this.sendData();
  }

//set preview filter params
  fillFilterList() {
    Object.keys(this.filter).forEach((filterKey: any) => {
      this.simpleFiltersList.forEach((el: any) => {
        if (el.filterField == filterKey) {
          el.value = this.filter[filterKey];
        }
      });
    });
  }

  ngOnInit(): void {
    this.fillFilterList();
  }
}
