import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartsService } from '../../Services/carts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/Services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  constructor(private service:CartsService,private build:FormBuilder,private porductService:ProductsService){}
  cartProducts:any[]=[];
  sum:number = 0 ;
  sent:boolean=false;
  carts:any[]=[];
  form!:FormGroup;
  details:any={};
  ngOnInit(): void {
    this.getProducts();
    this.getSum();
    this.getAllCarts();
    this.form=this.build.group({
      start:[''],
      end:['']
    })
  }
  getProducts(){this.cartProducts=JSON.parse(localStorage.getItem("cart")!)}
  getSum(){
    this.sum=0;
    if(this.cartProducts != null){
      this.cartProducts.forEach(item => {
        this.sum += item.item.price * item.quantity;
      });
    }
  }
  deleteProduct(item:any){
    this.cartProducts=this.cartProducts.filter(el=>el.item.id != item.item.id);
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
    // console.log(item.item.id == this.cartProducts[0].item.id);
    // localStorage.removeItem("cart");
    // this.getProducts();
  };
  decreaseQuantity(item:any){
    item.quantity -= 1;
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
    this.getSum();
  }
  addQuantity(item:any){
    item.quantity +=1;
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
    this.getSum()
  }
  changeQuantity(item:any,value:any){
    item.quantity = value;
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
    this.getSum();
  }
  clearStorage(){localStorage.clear();this.cartProducts=[];this.sum=0}
  sendCart(){

    let products = this.cartProducts.map(
      item =>
        {
          // ,
          // 
          return {productId:item.item.id,quantity:item.quantity}
        }
    );
    let model = {
      userId:5,
      Date:new Date(),
      products:products
    };
    this.service.sendCart(model).subscribe(res=>this.sent=true)
  }
  getAllCarts(){ this.service.getCarts().subscribe((res:any)=>{this.carts=res})}

  ApplyFilter(){
    let date = this.form.value;
    this.service.getCarts(date).subscribe((res:any)=>{this.carts=res})
    //console.log(this.form.value);
  }
  deleteCart(id:number){
    this.service.deleteCart(id).subscribe((res:any)=>{
      this.getAllCarts();
      alert("cart deleted Successfully!!");
    })
  }
  view(index:number){
    this.details=this.carts[index];
    this.cartProducts=[];
    for(let x in this.details.products){
      this.porductService.getProductById(this.details.products[x].productId).subscribe(res => this.cartProducts.push({item:res,quantity:this.details.quantity}))
    }
  }
}
