import { Component, OnInit } from '@angular/core';

import sendRequest from 'src/assets/js/requester.js';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  companyList: any = [];
  isLogin = false;
  access_token = '';
  refresh_token = '';
  needFilter = false;
  filtersList = [
    { name: 'id', value: '' },
    { name: 'Наименование комании', value: '' },
    { name: 'Юр наименование', value: '' },
    { name: 'Статус комании', value: '' },
    { name: 'Тип компании', value: '' },
    { name: 'Телефон', value: '' },
    { name: 'Емайл', value: '' },
    { name: 'Сайт', value: '' },
    { name: 'Представитель', value: '' },
    { name: 'Содержание действия', value: '' },
    { name: 'Регион', value: '' },
    { name: 'Область: край', value: '' },
    { name: 'Адрес', value: '' },
  ];
  filter={
    'company_id':'',
    'company_state':'',
    'email':'',

    'address':'',
    'company_name':'',
    'company_type':'',
    'site':'',
    'region':'',
    'company_switch_name.firm':'',
    'phone':'',
    'agents':'',
    'district':'',
  }

  constructor() {}

  refreshToken() {
    const body = {
      data: {
        access_token: this.access_token,
        refresh_token: this.refresh_token,
      },
    };
    sendRequest('POST', '/accounts/token/refresh/', body, this.access_token)
      .then((data) => {
        localStorage.setItem('access_token', data.response.access_token);
        localStorage.setItem('refresh_token', data.response.refresh_token);
        this.access_token = data.response.access_token;
        this.refresh_token = data.response.refresh_token;

        console.log(data);
      })
      .catch((err) => console.error(err));
  }

  requestCompanyList(filter: any = {}) {
    const help = {
      help: true,
    };
    const body = {
      filter: filter,
      fields: [
        'company__name',
        'company__company_state__name',
        'address',
        'city__name',
        'branch_phones',
        'task_last',
        'is_has_import',
      ],
      sort: [],
      limit: 30,
      offset: 0,
    };
    sendRequest('POST', '/company/', body, this.access_token)
      .then((data) => {
        // this.fillCompanyList(data.response);
        console.log(data);
      })
      .catch(async (err) => {
        await this.refreshToken();
        this.requestCompanyList();
        console.error(err);
      });
  }

  fillCompanyList(data: any) {
    for (let el of data) {
      let bufCompany = {
        company: el.company.name,
        status: el.company.company_state.name,
        address: el.city.name + '\n' + el.address,
        phone: [...el.branch_phones].toString().replace(/,/gi, '\n'),
        taskLast: el.task_last,
        import: el.is_has_import ? 'Открыть' : '',
      };
      this.companyList.push(bufCompany);
    }
  }

  toggleFilter() {
    this.needFilter = !this.needFilter;
  }

  fillFilter(newFilter:any){
    this.filter.address
  }

  showFilteredData(data:any) {
    console.log("filtered")
    
    this.requestCompanyList();
  }

  ngOnInit(): void {
    let access_token = localStorage.getItem('access_token') || '';
    let refresh_token = localStorage.getItem('refresh_token') || '';
    if (access_token) {
      this.isLogin = true;
      this.access_token = access_token;
      this.refresh_token = refresh_token;
    }
    this.requestCompanyList();
  }
}
