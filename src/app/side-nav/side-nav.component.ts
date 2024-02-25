import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faDashboard,
  faUser,
  faMoneyBill,
  faArrowRightArrowLeft,
  faChartBar,
  faHand,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {

  faDashboard = faDashboard;
  faUser = faUser;
  faArrowRightArrowLeft = faArrowRightArrowLeft;
  faMoneyBill = faMoneyBill;
  faChartBar = faChartBar;
  faHand = faHand;
}
