import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnChanges {
  @Input() pieData:Map<string,number>=new Map<string,number>;
  @Input() accName:string="Acc1";
  ngOnChanges(changes: SimpleChanges): void {
      this.updateChartOptions();
    
  }
  
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options={};
  private updateChartOptions(): void {
    this.chartOptions = {
      chart: {
        type: 'pie',
        height: 325
      },
      title: {
        text: 'Category of '+this.accName+' Transaction'
      },
      subtitle: {
        text: 'Choose Single Account.'
    },
      xAxis: {
        categories: Array.from(this.pieData.keys())
      },
      yAxis: {
        title: {
          text: 'Category in %'
        }
      },
      series: [
        {
          type: 'pie',
          data: Array.from(this.pieData, ([categories, num]) => ({
            name: categories,
            y: num,
            color: this.getRandomColor()
          }))
        }
      ],
      credits: {
        enabled: false
      }
    };
  }
  getRandomColor(): string {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return color;
  }
    

}
