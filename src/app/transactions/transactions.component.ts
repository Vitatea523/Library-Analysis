import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef, ColGroupDef, GridApi,GridReadyEvent, ICellRendererParams, ValueGetterParams } from 'ag-grid-community'; // Column Definition Type Interface
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import account from "../../assets/grid-poc-main/data/accounts.json";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { iTransaction } from '../../assets/grid-poc-main/data/transactionInterface';
import './transactions.component.css';
// import { ModuleRegistry } from '@ag-grid-community/core';
// import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
// import 'ag-grid-enterprise';



@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [AgGridAngular, HttpClientModule, CommonModule],
  providers: [],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})

export class TransactionsComponent implements OnInit {
  tansactionsData: iTransaction[] = [];
  url: string = 'assets/grid-poc-main/data/transactions.json'

  colDefs: (ColDef | ColGroupDef)[] = [
    { field: "_id", headerName: 'ID', width: 300 , filter: 'agTextColumnFilter' },
    { field: "direction", headerName: 'Direction' ,width: 100,filter: 'agTextColumnFilter'},
    { field: "description", headerName: 'Description', width: 300},
    { field: "accountId", headerName: 'Account ID',filter: 'agSetColumnFilter' },
    { field: "_revalTransaction", headerName: 'Reval Transaction',width: 150 ,filter: 'agTextColumnFilter'},
    {
      field: "_quantity._actualQuantity._symbol", headerName: 'Quantity',headerClass: 'quantity-group',marryChildren: true,
      children: [
        {
          columnGroupShow: 'closed',
          field: '_quantity._actualQuantity._amount',
          headerName: 'Amount',
          width: 150,
          filter: 'agNumberColumnFilter',
        },
        { columnGroupShow: 'open', field: '_quantity._actualQuantity._amount', headerName: 'Amount' ,filter: 'agNumberColumnFilter'},
        { columnGroupShow: 'open', field: '_quantity._actualQuantity._symbol', headerName: 'Symbol' ,filter: 'agTextColumnFilter'},
        { columnGroupShow: 'open', field: '_quantity._currency', headerName: 'Currency' },
      ]
    },
    {
      field: "_valuation", headerName: 'Valuation',headerClass: 'valuation-group',
      children: [
        {
          columnGroupShow: 'closed',
          field: '_valuation._value._amount',
          headerName: 'Amount',
          width: 150,
          filter: 'agNumberColumnFilter',
        },
        { columnGroupShow: 'open', field: '_valuation._value._amount', headerName: 'Amount',filter: 'agNumberColumnFilter' },
        { columnGroupShow: 'open', field: '_valuation._value._symbol', headerName: 'Symbol' ,filter: 'agTextColumnFilter'},
        { columnGroupShow: 'open', field: '_valuation._normalizedValue._amount', headerName: 'Normalized Amount' ,filter: 'agNumberColumnFilter'},
        { columnGroupShow: 'open', field: '_valuation._normalizedValue._symbol', headerName: 'Normalized Symbol',filter: 'agTextColumnFilter' },
      ]
    },
    { headerName: 'Transaction Date',
    filter: 'agDateColumnFilter',
    valueGetter: (params: ValueGetterParams) => {
      return typeof params.data._transactionDate=='string'?params.data._transactionDate:params.data._transactionDate.date;
    }, width: 250 },
    { field: "category", headerName: 'Category',width: 100 ,filter: 'agTextColumnFilter'},
    { field: "classifications", headerName: 'Classifications',width: 250,filter: 'agTextColumnFilter'}
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
      this.tansactionsData = res;
    })
  }
}
