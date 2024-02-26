import { Component,Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent} from 'ag-grid-community';
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
  public rowSelection: 'single' | 'multiple' = 'single';
  gridApi!: GridApi<IAccount>;
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

  onGridReady(params: GridReadyEvent<IAccount>) {
    this.gridApi = params.api;
  }


  ngOnInit(): void {
    this.getAccounts();
  }

  onSelectionChanged() {
    if (this.gridApi) {
        const selectedRows = this.gridApi.getSelectedRows();
        this.accNow = selectedRows.length === 1 ? selectedRows[0].name : 'Acc1';
    }
}

  getAccounts() {
    this.http.get(this.url).subscribe((res:IAccount[]|any)=>{
      this.accountList=res;
      this.accountMap=new Map<string,string>();
      res.forEach((res:any) => {
        this.accountMap.set(res.name,res._id);
      });
    })
    
  }


}
