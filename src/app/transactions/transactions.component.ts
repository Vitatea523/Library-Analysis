import { Component, OnInit,Input, } from '@angular/core';
import { CommonModule, getCurrencySymbol } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef, ColGroupDef, GridApi, GridReadyEvent, ICellRendererParams, ValueGetterParams } from 'ag-grid-community'; // Column Definition Type Interface
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import account from "../../assets/grid-poc-main/data/accounts.json";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { iTransaction } from '../../assets/grid-poc-main/data/transactionInterface';
import './transactions.component.css';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
// import { ModuleRegistry } from '@ag-grid-community/core';
// import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
// import 'ag-grid-enterprise';



@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [AgGridAngular, HttpClientModule, CommonModule,PieChartComponent],
  providers: [],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})

export class TransactionsComponent implements OnInit {
  transactionsData: iTransaction[] = [];
  url: string = 'assets/grid-poc-main/data/transactions.json';
  categoryCountMap: Map<string, number> = new Map<string, number>(); 
  @Input() accNow:string="Acc1";
  @Input() accountMap: Map<string, string>=new Map<string, string>;
  

  colDefs: (ColDef | ColGroupDef)[] = [
    { field: "_id", headerName: 'ID', width: 300, filter: 'agTextColumnFilter' },
    { field: "direction", headerName: 'Direction', width: 100, filter: 'agTextColumnFilter' },
    { field: "description", headerName: 'Description', width: 300 },
    { field: "accountId", headerName: 'Account ID', filter: 'agSetColumnFilter' },
    { field: "_revalTransaction", headerName: 'Reval Transaction', width: 150, filter: 'agTextColumnFilter' },
    {
      field: "_quantity._actualQuantity._symbol", headerName: 'Quantity', headerClass: 'quantity-group', marryChildren: true,
      children: [
        {
          columnGroupShow: 'closed',
          field: '_quantity._actualQuantity._amount',
          headerName: 'Amount',
          width: 150,
          filter: 'agNumberColumnFilter',
          valueGetter: (params: ValueGetterParams) => {
            return params.data._quantity._actualQuantity._amount + ' ' + getCurrencySymbol(params.data._quantity._actualQuantity._symbol, 'wide');
          },
        },
        {
          columnGroupShow: 'open', field: '_quantity._actualQuantity._amount',

          headerName: 'Amount', filter: 'agNumberColumnFilter'
        },
        {
          columnGroupShow: 'open', field: '_quantity._actualQuantity._symbol',
          valueGetter: (params: ValueGetterParams) => {
            return getCurrencySymbol(params.data._valuation._value._symbol, 'wide');
          },
          headerName: 'Symbol', filter: 'agTextColumnFilter'
        },
        { columnGroupShow: 'open', field: '_quantity._currency', headerName: 'Currency' },
      ]
    },
    {
      field: "_valuation", headerName: 'Valuation', headerClass: 'valuation-group',
      children: [
        {
          columnGroupShow: 'closed',
          field: '_valuation._value._amount',
          headerName: 'Amount',
          width: 150,
          filter: 'agNumberColumnFilter',
          valueGetter:(params:ValueGetterParams)=>{
            return params.data._valuation._value._amount+' '+getCurrencySymbol(params.data._valuation._value._symbol,'wide');
          },
        },
        { columnGroupShow: 'open', field: '_valuation._value._amount', headerName: 'Amount', filter: 'agNumberColumnFilter' },
        {
          columnGroupShow: 'open', field: '_valuation._value._symbol',headerName:'Currency',
          
           filter: 'agTextColumnFilter'
        },
        { columnGroupShow: 'open', field: '_valuation._normalizedValue._amount', headerName: 'Normalized Amount', filter: 'agNumberColumnFilter' },
        { columnGroupShow: 'open', field: '_valuation._normalizedValue._symbol', headerName: 'Normalized Symbol', 
      
        filter: 'agTextColumnFilter' },
      ]
    },
    {
      headerName: 'Transaction Date',
      filter: 'agDateColumnFilter',
      valueGetter: (params: ValueGetterParams) => {
        return typeof params.data._transactionDate == 'string' ? params.data._transactionDate : params.data._transactionDate.date;
      }, width: 250
    },
    { field: "category", headerName: 'Category', width: 100, filter: 'agTextColumnFilter' },
    { field: "classifications", headerName: 'Classifications', width: 250, filter: 'agTextColumnFilter' }
  ];

  defaultColDef = {
    minWidth: 150
  }


  constructor(private http: HttpClient) {
    console.log(account);
  }

  ngOnInit(): void {
    this.getTransaction();
    // throw new Error('Method not implemented.');
  }

  getTransaction() {
    this.http.get(this.url).subscribe((res: any) => {
      this.transactionsData = res;
      //他竟然是同步进行的如果放在外面
      this.categoryCountMap=this.getCategoryPie(this.accountMap.get(this.accNow));

    })
  }

  getCategoryPie(acc:string| undefined):Map<string, number> {
    let categoryCountMap: Map<string, number> = new Map<string, number>();
    console.log("Transaction data length:", this.transactionsData.length);
    this.transactionsData.forEach(transaction => {
      console.log(transaction+"aaaaaa")
      if (transaction.accountId === acc) {
        let category = transaction.category;
        if (categoryCountMap.has(category)) {
          categoryCountMap.set(category, categoryCountMap.get(category)! + 1);
        } else {
          categoryCountMap.set(category, 1);
        }
      }
    });
    console.log(categoryCountMap.get('Category 2'))
    return categoryCountMap;
  }
}
