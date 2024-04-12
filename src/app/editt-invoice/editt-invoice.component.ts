import { Component,OnInit } from '@angular/core';
import { Invoice } from '../add-invoice/invoice.interface';
import { Item } from '../add-invoice/item.interface';
import { CombineInvoice } from '../add-invoice/CombineInvoice.interface';
import { AddInvoiceService } from '../Services/add-invoice.service';
import { Customer } from '../Interfaces/Customer.interface';
import { CustomerService } from '../Services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-editt-invoice',
  templateUrl: './editt-invoice.component.html',
  styleUrls: ['./editt-invoice.component.css']
})
export class EdittInvoiceComponent  implements OnInit {
  addFlag:number=1;
  updateFlag:number=0;
  EditIndex:number=0;
  InvoiceId;
  paidAmount;
  constructor(private addInvoiceService: AddInvoiceService,private customer:CustomerService,private router: Router,private activatedroute:ActivatedRoute) { }
 
 // CustomerArray:Customer[]=[];
 CustomerArray:any=[];
 temparray:any;
 ItemArray:any=[];
   NewInvoice: CombineInvoice = {
     Invoice:{
     InvoiceID: 0,
     InvoiceNo: 0,
     CustomerName: '',
     GSTNo: '',
     BillDate: '',
     DueDate: '',
     RemainingDays: 0,
     Totalitem: 0,
     TotalAmount: 0,
     UserID: 3,
     UserName: ''
   },
   Item:[]
   };
   InvID!:number;
   SingleItem:Item ={ID:0,Item:'',Quantity:0,Rate:0,Amount:0,InvoiceID:this.InvID};
   
   minDate!: string;
   ngOnInit() {
   this.InvoiceId= this.activatedroute.snapshot.paramMap.get('InvoiceId');
   console.log(this.InvoiceId);

  //  this.addInvoiceService.EditInvoice(this.InvoiceId).subscribe(
  //   (data: CombineInvoice) => {
  //     this.temparray = data;
  //     console.log(this.temparray);
     

      
  //   },
  //   (error) => {
  //     console.error('Error fetching customer list:', error);
  //   }
  // ); 




  this.addInvoiceService.GetEditInvoiceDetail(this.InvoiceId).subscribe((data: any) => {
    this.paidAmount=data.invoice.paidAmount;
  this.InvID=data.invoice.invoiceID;
  this.SingleItem.InvoiceID=data.invoice.invoiceID;
    this.NewInvoice = {
      Invoice: {
        InvoiceID: data.invoice.invoiceID,
        InvoiceNo: data.invoice.invoiceNo,
        CustomerName: data.invoice.customerName,
        GSTNo: data.invoice.gstNo,
        BillDate: data.invoice.billDate,
        DueDate: data.invoice.dueDate,
        RemainingDays: data.invoice.remainingDays,
        Totalitem: 0,
        TotalAmount: data.invoice.totalAmount,
        UserID: data.invoice.userID,
        UserName: data.invoice.userName,
      },
      Item: data.item.map((item: any) => ({
        ID: item.id,
        Item: item.item,
        Quantity: item.quantity,
        Rate: item.rate,
        Amount: item.amount,
        InvoiceID: item.invoiceID,
      })),
    };

  });
  
     const today = new Date();
     const minDate = today.toISOString().split('T')[0];
     this.NewInvoice.Invoice.BillDate = minDate;
     this.NewInvoice.Invoice.DueDate = minDate;
     this.NewInvoice.Invoice.RemainingDays = 0;
     this.setMinDate(); 
     
     this.customer.GetCustomerList().subscribe(
       (data:Customer[]) => {
         this.CustomerArray = data;
        console.log(this.CustomerArray);

        
 
         
       },
       (error) => {
         console.error('Error fetching customer list:', error);
       }
     ); 
   
   
     this.customer.GetItemList().subscribe(
       (data: Item[]) => {
         this.ItemArray = data;
        
 
         
       },
       (error) => {
         console.error('Error fetching customer list:', error);
       }
     ); 
   }
    
   setMinDate() {
     const today = new Date();
     this.minDate = today.toISOString().split('T')[0];
   }
   updateDueDate() {
     const billDateObj = new Date(this.NewInvoice.Invoice.BillDate);
     if (!isNaN(this.NewInvoice.Invoice.RemainingDays) && billDateObj instanceof Date && !isNaN(billDateObj.getTime())) {
       const dueDate = new Date(billDateObj);
       dueDate.setDate(billDateObj.getDate() + this.NewInvoice.Invoice.RemainingDays);
       this.NewInvoice.Invoice.DueDate = dueDate.toISOString().split('T')[0];
     }
   }
 
   calculateDays() {
     const billDateObj = new Date(this.NewInvoice.Invoice.BillDate);
     const dueDateObj = new Date(this.NewInvoice.Invoice.DueDate);
     if (billDateObj instanceof Date && !isNaN(billDateObj.getTime()) &&
       dueDateObj instanceof Date && !isNaN(dueDateObj.getTime())) {
       const timeDifference = dueDateObj.getTime() - billDateObj.getTime();
       const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
       this.NewInvoice.Invoice.RemainingDays = daysDifference;
     }
   }
 
   testfunc(){
     this.CalculateTotalItem();
     this.CalculateTotalAmount();
    //  console.log(this.NewInvoice);
 
 
     const dataToSend: CombineInvoice = {
       Invoice: this.NewInvoice.Invoice,
       Item: this.NewInvoice.Item
     };
     console.log("DataTOSEND");
     console.log(dataToSend);
 
     this.addInvoiceService.EditInvoice(dataToSend).subscribe(
       response => {
         console.log('API response:', response);
       },
       error => {
         console.error('API error:', error);
       }
     );
 
    
     this.SingleItem={ID:0,Item:'',Quantity:0,Rate:0,Amount:0,InvoiceID:this.InvID};
     this.NewInvoice = {
       Invoice:{
         InvoiceID: 0,
         InvoiceNo: 0,
         CustomerName: '',
         GSTNo: '',
         BillDate: '',
         DueDate: '',
         RemainingDays: 0,
         Totalitem: 0,
         TotalAmount: 0,
         UserID: 0,
         UserName: ''
       },
       Item:[]
     };
     // this.router.navigate(['/DisplayInvoiceList']);
 setTimeout(() => {
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate(['/DisplayInvoiceList']));
 }, 200);
    
   }
   AddItem(){
     this.NewInvoice.Item.push(this.SingleItem);
     this.SingleItem={ID:0,Item:'',Quantity:0,Rate:0,Amount:0,InvoiceID:this.InvID};
     this.addFlag=1;
     this.updateFlag=0;
     this.CalculateTotalAmount();
 
   }
   Qtychange(){
     this.SingleItem.Amount=this.SingleItem.Quantity!*this.SingleItem.Rate!;
   }
 
   AmountChange(){
     this.SingleItem.Rate=this.SingleItem.Amount!/this.SingleItem.Quantity!;
   }
 
   Deleteitem(Index:number){
     this.NewInvoice.Item.splice(Index,1);
     this.CalculateTotalAmount();
   }
 
   Edititem(Index:number){
     this.addFlag=0;
     this.updateFlag=1;
     this.EditIndex=Index;
     this.SingleItem={...this.NewInvoice.Item[Index]};
     this.CalculateTotalAmount();
   }
 
   UpdateItem(){
 this.NewInvoice.Item[this.EditIndex]=this.SingleItem;
 this.SingleItem={ID:0,Item:'',Quantity:0,Rate:0,Amount:0,InvoiceID:this.InvID};
 this.addFlag=1;
     this.updateFlag=0;
     this.CalculateTotalAmount();
   }
 
   CalculateTotalItem(){
     this.NewInvoice.Item.forEach(()=>{
 this.NewInvoice.Invoice.Totalitem=this.NewInvoice.Invoice.Totalitem +1;
     });
   }
 
   CalculateTotalAmount() {
     this.NewInvoice.Invoice.TotalAmount = this.NewInvoice.Item.reduce((total, item) => {
       return total + (item.Amount || 0);
     }, 0);
   }
 }
 