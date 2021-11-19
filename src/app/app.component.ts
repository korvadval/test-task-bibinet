import { Component, OnInit } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('expandedContent', [
      state('full', style({ width: '100%' })),
      state('half', style({ width: 'calc(100% - 220px)' })),
      transition('full<=>half', [animate('0.4s')]),
    ]),
    trigger('expandedPanel', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.4s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.4s', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'test-task-bibinet';
  faBars = faBars;
  faTimes = faTimes;
  faIcon = faBars;
  needPanel = false;
  needLogin = true;
  isExpandedContent: boolean = false;
  stateContent: string = 'full';
  

  ngOnInit(): void {
    let access_token=localStorage.getItem("access_token");
    if(access_token){
      this.needLogin=false;
    }
  }

  togglePanel(): void {
    this.needPanel = !this.needPanel;
    this.faIcon = this.needPanel ? faTimes : faBars;

    this.isExpandedContent = !this.isExpandedContent;
    this.stateContent = this.isExpandedContent ? 'half' : 'full';
  }
  toggleLogin(): void {
    this.needLogin = !this.needLogin;
  }
}
