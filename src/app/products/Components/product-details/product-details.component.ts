import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id:number;
  data:any;
  loading:boolean=true;
  constructor(private route:ActivatedRoute,private service:ProductsService){
    this.id=Number(this.route.snapshot.paramMap.get("id"));
    console.log(this.id);
  }
  ngOnInit(): void {
    this.getProduct();
  }
  
  getProduct(){
    this.loading=true;
    this.service.getProductById(this.id).subscribe((res:any)=>{this.data=res;this.loading=false});
  }
}
