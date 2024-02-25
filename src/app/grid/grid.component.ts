import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { HttpClientModule } from '@angular/common/http';
import { ColDef,ICellRendererParams,ValueGetterParams } from 'ag-grid-community'; // Column Definition Type Interface
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import account from "../../assets/grid-poc-main/data/accounts.json";
import { HttpClient } from '@angular/common/http';
import { iTransaction } from '../../assets/grid-poc-main/data/transactionInterface';



@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [AgGridAngular,HttpClientModule,CommonModule],
  providers: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})

export class GridComponent implements OnInit{
  tansactionsData: iTransaction[] = [];
  url:string = 'assets/grid-poc-main/data/transactions.json'

  colDefs: ColDef[] = [
    { field: "_id", headerName:'ID',filter:'agTextColumnFilter' },
    { field: "direction" ,headerName:'Direction'},
    { field: "description" ,headerName:'Description'},
    { field: "accountId",headerName:'Account ID' },
    { field: "_revalTransaction",headerName:'Reval Transaction'},
    { field: "_quantity",headerName:'Quantity', },
    { field: "_valuation",headerName:'Valuation'},
    { field: "_transactionDate",headerName:'Transaction Date'},
    { field: "category",headerName:'Category'},
    { field: "classifications",headerName:'Classifications'}
  ];

  defaultColDef = {
    flex:1,
    minWidth:150
  }
  

  constructor(private http: HttpClient){
    console.log(account);
  }

  ngOnInit(): void {
    this.getTransaction();
    // throw new Error('Method not implemented.');
  }

  getTransaction() {
    this.http.get(this.url).subscribe((res:any) =>{
      this.tansactionsData = res;
      console.log(this.tansactionsData[0])
    })
  }
  
}
