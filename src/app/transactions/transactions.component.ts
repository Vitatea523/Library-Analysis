import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef, ColGroupDef, GridApi,GridReadyEvent, ICellRendererParams, ValueGetterParams } from 'ag-grid-community'; // Column Definition Type Interface
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import account from "../../assets/grid-poc-main/data/accounts.json";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { iTransaction } from '../../assets/grid-poc-main/data/transactionInterface';
import './transactions.component.css'



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
    { field: "_id", headerName: 'ID', filter: 'agTextColumnFilter',width: 300 },
    { field: "direction", headerName: 'Direction' ,width: 100},
    { field: "description", headerName: 'Description', width: 300},
    { field: "accountId", headerName: 'Account ID' },
    { field: "_revalTransaction", headerName: 'Reval Transaction',width: 150 },
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
        { columnGroupShow: 'open', field: '_quantity._actualQuantity._amount', headerName: 'Amount' },
        { columnGroupShow: 'open', field: '_quantity._actualQuantity._symbol', headerName: 'Symbol' },
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
        { columnGroupShow: 'open', field: '_valuation._value._amount', headerName: 'Amount' },
        // {columnGroupShow: 'open',field:'_quantity._actualQuantity._precision',headerName:'Precision'},
        { columnGroupShow: 'open', field: '_valuation._value._symbol', headerName: 'Symbol' },
        { columnGroupShow: 'open', field: '_valuation._normalizedValue._amount', headerName: 'Normalized Amount' },
        { columnGroupShow: 'open', field: '_valuation._normalizedValue._symbol', headerName: 'Normalized Symbol' },
      ]
    },
    { field: "_transactionDate", headerName: 'Transaction Date',width: 250 },
    { field: "category", headerName: 'Category',width: 100 },
    { field: "classifications", headerName: 'Classifications',width: 250}
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
