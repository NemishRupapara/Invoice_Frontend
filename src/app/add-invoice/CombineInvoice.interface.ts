    import { Invoice } from "./invoice.interface";
    import { Item } from "./item.interface";
    export interface CombineInvoice{
        
        Invoice:Invoice;
        Item:Item[];

    }