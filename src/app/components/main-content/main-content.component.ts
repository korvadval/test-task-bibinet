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

  filter: any = {};
  dictionary: any = [];

  constructor() {}

//refresh access_token when it is deprecated
  async refreshToken() {
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

  requestCompanyList() {
    const help = {
      help: true,
    };
    const body = {
      filter: this.filter,
      fields: [
        'company__id',
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
        this.fillCompanyList(data.response);
      })
      .catch(async (err) => {
        if (err.not_auth) {
          await this.refreshToken();
          this.requestCompanyList();
        }
        console.error(err);
      });
  }

//combine data for show
  fillCompanyList(data: any) {
    this.companyList = [];
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

//controll filter view show/hide
  toggleFilter() {
    this.needFilter = !this.needFilter;
  }

  showFilteredData(newFilter: any) {
    this.filter = newFilter;
    this.requestCompanyList();
  }

//get data for selectors on filter view
  async loadDictionary(url: string, name: string, filterField: string) {
    const help = {
      help: true,
    };
    const body = { fields: [] };
    sendRequest('POST', url, body, this.access_token)
      .then((data) => {
        this.dictionary.push({
          name: name,
          data: data.response,
          value: '',
          filterField: filterField,
        });
      })
      .catch(async (err) => {
        if (err.not_auth) {
          await this.refreshToken();
          this.loadDictionary(url, name, filterField);
        }
        console.error(err);
      });
  }

//combine data for selectors on filter view
  async fillDictionary(){
    await this.loadDictionary(
      '/references/CompanyState/',
      'Статус компании',
      'company_state'
    );
    await this.loadDictionary(
      '/references/CompanyType/',
      'Тип компании',
      'company_type'
    );
    await this.loadDictionary(
      '/references/District/',
      'Область, край',
      'district'
    );
    await this.loadDictionary(
      '/references/Region/',
      'Регион',
      'region'
    );
  }

//get tokens for future 
  ngOnInit(): void {
    let access_token = localStorage.getItem('access_token') || '';
    let refresh_token = localStorage.getItem('refresh_token') || '';
    if (access_token) {
      this.isLogin = true;
      this.access_token = access_token;
      this.refresh_token = refresh_token;
    }

    this.fillDictionary();

    this.requestCompanyList();
  }
}
