import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor() {}

  filtersList = [
    {
      name: 'id',
      value: '',
    },
    {
      name: 'Наименование комании',
      value: '',
    },
    {
      name: 'Юр наименование',
      value: '',
    },
    {
      name: 'Статус комании',
      value: '',
    },
    {
      name: 'Тип компании',
      value: '',
    },
    {
      name: 'Телефон',
      value: '',
    },
    {
      name: 'Емайл',
      value: '',
    },
    {
      name: 'Сайт',
      value: '',
    },
    {
      name: 'Представитель',
      value: '',
    },
    {
      name: 'Содержание действия',
      value: '',
    },
    {
      name: 'Регион',
      value: '',
    },
    {
      name: 'Область, край',
      value: '',
    },
    {
      name: 'Адрес',
      value: '',
    },
  ];

  clearFilters(){
    this.filtersList.forEach(el => el.value='');
  }
  
  testInput = '';
  ngOnInit(): void {}
}
