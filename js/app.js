import {salesOrders, purchaseOrders} from "./products.js";
import buildTable from './buildTable.js';
const sorted = (array, dateKey) => array.sort((a, b) => new Date(a[dateKey]) - new Date(b[dateKey]));
let salesbyDate = [];


const allocate = (salesOrders, purchaseOrders) => {
    const salesOrdersSorted = sorted(salesOrders, "created"); //get sorted sales products
    const purchaseOrderSorted = sorted(purchaseOrders, "receiving"); //get sorted pruchased products
    salesOrdersSorted.map((sales) => {
        if (purchaseOrderSorted.length) {
            let supply = purchaseOrders[0].quantity - sales.quantity; //get the inventory of the product 
            const { id } = sales;
            let date = purchaseOrderSorted[0].receiving;
            if (supply === 0) { 
                salesbyDate.push({ id, date })
                purchaseOrderSorted.shift(); //remove from array when there is no supply 
            } else if (supply > 0) {
                salesbyDate.push({ id, date })
                purchaseOrderSorted[0].quantity = supply
            } else {
                while (supply < 0) {
                    purchaseOrderSorted.shift(); //remove from array when there is no supply 
                    supply = supply + purchaseOrderSorted[0].quantity;
                }
                date = purchaseOrderSorted[0].receiving; // update date with new element
                salesbyDate.push({ id, date })
                purchaseOrderSorted.shift();
            }
        }
    
    });
    return salesbyDate;
}


buildTable(allocate(salesOrders, purchaseOrders))

