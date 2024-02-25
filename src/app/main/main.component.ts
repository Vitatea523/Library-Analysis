import { Component } from '@angular/core';
import { TopWidgetsComponent } from '../top-widgets/top-widgets.component';
import { TransactionsComponent } from '../transactions/transactions.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TopWidgetsComponent,TransactionsComponent,AccountsComponent,PieChartComponent,LineChartComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
