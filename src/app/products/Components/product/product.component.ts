import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Iproduct } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product!:Iproduct;
  @Output() item = new EventEmitter();
  amount:number=0;
  clicked:boolean=false;
  constructor(){}
  send(){
    this.item.emit({item:this.product,quantity:this.amount});
  }
}