import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { HttpClient } from '@angular/common/http';




interface IAccount{
  _id:string;
  name:string;
  timezone:string;
  currency:string;
}

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  url:string = 'assets/grid-poc-main/data/accounts.json'
  themeClass =
    "ag-theme-quartz";
  accountList:IAccount[]=[];
  colDefs: ColDef<IAccount>[] = [
    { field: '_id' },
    { field: 'name' },
    { field: 'timezone' },
    { field: 'currency' },
  ];

  defaultColDef = {
    flex:1,
    minWidth:150
  }

  constructor(private http: HttpClient){
  }

  ngOnInit(): void {
    this.getAccounts();
    // throw new Error('Method not implemented.');
  }
  getAccounts() {
    this.http.get(this.url).subscribe((res:any)=>{
      this.accountList=res;
      console.log("account list:"+this.accountList)
    })
    
  }


}
