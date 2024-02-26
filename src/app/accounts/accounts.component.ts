import { Component,Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { HttpClient } from '@angular/common/http';
import { TransactionsComponent } from '../transactions/transactions.component';




interface IAccount{
  _id:string;
  name:string;
  timezone:string;
  currency:string;
}

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [AgGridAngular,TransactionsComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  accountMap:Map<string, string> =new Map<string,string>();
  accNow:string="Acc1";
  url:string = 'assets/grid-poc-main/data/accounts.json';
  themeClass =
    "ag-theme-quartz";
  accountList:IAccount[]=[];
  colDefs: ColDef<IAccount>[] = [
    { field: 'name' },
    { field: '_id' ,headerName:"ID"},
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
    this.http.get(this.url).subscribe((res:IAccount[]|any)=>{
      this.accountList=res;
      this.accountMap=new Map<string,string>();
      res.forEach((res:any) => {
        this.accountMap.set(res.name,res._id);
      });
      console.log(this.accountMap.get('Acc1'))
      console.log("account list:"+this.accountList)
    })
    
  }


}
