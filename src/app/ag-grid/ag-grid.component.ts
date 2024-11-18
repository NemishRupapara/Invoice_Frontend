import { Component, OnInit } from '@angular/core';
import { Invoice } from '../add-invoice/invoice.interface';
import { DisplayInvoiceListService } from '../Services/display-invoice-list.service';
import { Router } from '@angular/router';
import { AddInvoiceService } from '../Services/add-invoice.service';
import { UserService } from '../Services/user.service';
import { RolePermissions } from '../Interfaces/RolePermission.interface';
import { GetUserPermissionService } from '../Services/get-user-permission.service';
import { AgGridAngular } from "@ag-grid-community/angular";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { CsvExportModule } from '@ag-grid-community/csv-export';
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  createGrid,
} from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule,CsvExportModule]);
// import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
// import { ColDef,GridReadyEvent,GridApi,ColGroupDef } from 'ag-grid-community'; // Column Definition Type Interface
@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css']
})
export class AgGridComponent implements OnInit{
  private gridApi!: GridApi<any>;
  InvoiceArray: any[];
  public rowGroupPanelShow: "always" | "onlyWhenGrouping" | "never" = "always";
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  // colDefs: ColDef[] = [
  //   { headerName: 'billDate', field: "billDate"},
  //   { headerName: 'customerName', field: "customerName" ,filter:"agTextColumnFilter"},
  //   { headerName: 'dueDate', field: "dueDate"},
  //   { headerName: 'gstNo', field: "gstNo" },
  //   { headerName: 'invoiceNo', field: "invoiceNo" ,
  //     cellRenderer:(item:any)=>{
  //       return "Custom-"+ item.value
  //     }
  //   },

  //   { headerName: 'paidAmount', field: "paidAmount" },
  //   { headerName: 'remainingAmount', field: "remainingAmount" },
  //   { headerName: 'remainingDays', field: "remainingDays" },
  //   { headerName: 'totalAmount', field: "totalAmount",editable:true },
  //   { headerName: 'userName', field: "userName" }
  // ];
  colDefs: ColDef[] = [
    { headerName: 'billDate', field: "billDate",rowGroup: true, enableRowGroup: true, hide: true  },
    { headerName: 'customerName', field: "customerName" ,filter:"agTextColumnFilter",rowGroup: true, enableRowGroup: true, hide: true },
    { headerName: 'dueDate', field: "dueDate",rowGroup: true, enableRowGroup: true, hide: true },
    { headerName: 'gstNo', field: "gstNo" },
    { headerName: 'invoiceNo', field: "invoiceNo" ,
      cellRenderer:(item:any)=>{
        return "Custom-"+ item.value
      }
    },
    
    { headerName: 'paidAmount', field: "paidAmount" },
    // { headerName: 'remainingAmount', field: "remainingAmount" },
    // { headerName: 'remainingDays', field: "remainingDays" },
    { headerName: 'totalAmount', field: "totalAmount",editable:true },
    { headerName: 'userName', field: "userName" },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params: any) => {
        return `<button class="btn btn-danger btn-sm">Delete</button>`;
      },
      onCellClicked: (params: any) => this.deleteInvoice(params.data)
    }
  ];

  constructor(private InvoiceList: DisplayInvoiceListService, private router: Router, private invoiceservice: AddInvoiceService, private Userservice: UserService, private Perm: GetUserPermissionService) { }

  ngOnInit() {
    this.GetInvoiceList();
  }
  onBtExport() {
    this.gridApi.exportDataAsCsv();
  }
  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }


  GetInvoiceList() {
    this.InvoiceList.GetInvoiceList().subscribe(
      (data: any) => {

        this.InvoiceArray = data;
        console.log(this.InvoiceArray);

      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  }
  deleteInvoice(data:any){
    console.log(data);
    alert(data.invoiceNo)
  }
}





