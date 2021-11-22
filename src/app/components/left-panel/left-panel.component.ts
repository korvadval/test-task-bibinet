import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
})
//navigation site menu
export class LeftPanelComponent implements OnInit {
  sections = [
    {
      name: 'РАЗДЕЛЫ',
      sectionId:0,
      items: [
        {itemId:0, name:'Компании', selectedStyle:"selectedItem"},
        {itemId:1, name:'Заказы', selectedStyle:""},
        {itemId:2, name:'Регистрации', selectedStyle:""},
        {itemId:3, name:'Изменение данных компании', selectedStyle:""},
        {itemId:4, name:'Ошибки импорта', selectedStyle:""},
      ],
    },
    {
      name: 'СПРАВОЧНИКИ',
      sectionId:1,
      items: [
        {itemId:0, name:'Номенклатура', selectedStyle:""},
        {itemId:1, name:'Автомобили', selectedStyle:""},
        {itemId:2, name:'Шины и диски', selectedStyle:""},
        {itemId:3, name:'Регионы и города', selectedStyle:""},
        {itemId:4, name:'Справочники компании', selectedStyle:""},
      ],
    },
    {
      name: 'ПРОДАЖИ И УСЛУГИ',
      sectionId:2,
      items: [
        {itemId:0, name:'Заказы', selectedStyle:""},
        {itemId:1, name:'Цены на услуги', selectedStyle:""},
        {itemId:2, name:'Подключения услуг', selectedStyle:""},
        {itemId:3, name:'Акты на услуги', selectedStyle:""},
        {itemId:4, name:'Прочие продажи', selectedStyle:""},
      ],
    },
    {
      name: 'ПРОЧЕЕ',
      sectionId:3,
      items: [
        {itemId:0, name:'Список работников', selectedStyle:""},
        {itemId:1, name:'Список клиентов', selectedStyle:""},
        {itemId:2, name:'Прочее №1', selectedStyle:""},
        {itemId:3, name:'Прочее №2', selectedStyle:""},
        {itemId:4, name:'Прочее №3', selectedStyle:""},
        {itemId:5, name:'Прочее №4', selectedStyle:""},
      ],
    },
  ];
  curItem={section:0,item:0}  
  constructor() {}

  ngOnInit(): void {}


  setSelectedItemStyle(itemId:number, sectionId:number){
    this.sections[this.curItem.section].items[this.curItem.item].selectedStyle="";
    this.curItem={section:sectionId,item:itemId};
    this.sections[sectionId].items[itemId].selectedStyle="selectedItem";
  }
}
