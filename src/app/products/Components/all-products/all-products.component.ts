import { Component,OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { Iproduct } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products:Iproduct[]=[];
  categories:string[]=[];
  category:string="";
  loading:boolean=false;
  cartProducts:Iproduct[]=[];
  base64:any="";
  form!:FormGroup;
  constructor(private productS:ProductsService,private build:FormBuilder){}
  ngOnInit(): void {
    this.form=this.build.group({
      title:['',[Validators.required]],
      price:['',[Validators.required]],
      description: ['',[Validators.required]],
      image: ['',[Validators.required]],
      category:['',[Validators.required]]
    })
    this.loading = true;
    this.productS.getAllProducts().subscribe((response:any)=>{this.products = response;this.loading=false;});
    this.productS.getAllCategories().subscribe((response:any)=>{this.categories = response;this.loading=false;});
  }
  getSelectValue(event:any){
    this.productS.category=event.target.value;
    this.loading=true
    if(event.target.value != "All"){
      this.productS.getProductByCategory().subscribe((response:any)=>{this.products = response;this.loading=false;});
    }else{
      this.productS.getAllProducts().subscribe((response:any)=>{this.products = response;this.loading=false;});
    }
  }
  sendData(e:any){ 
    if("cart" in localStorage){
      this.cartProducts=JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find((item:any) => item.item.id == e.item.id);
      if(exist){
        alert("this product is already Added!!");
      }else{
        this.cartProducts.push(e);
        localStorage.setItem("cart",JSON.stringify(this.cartProducts));
      }
    }else{
      this.cartProducts.push(e);
      localStorage.setItem("cart",JSON.stringify(this.cartProducts));
    }
  }
  getImagePath(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      this.base64=reader.result;
      this.form.get('image')?.setValue(this.base64);
      console.log(this.base64)
    }
  }
  getSelectedCategory(e:any){
    this.form.get('category')?.setValue(e.target.value);
    console.log(this.form);
  }

  addProduct(){
    this.productS.createProduct(this.form.value).subscribe(res=>{
      alert("Product added successfully!!")
    })
    console.log(this.form);
  }
  update(product:any){
    // this.form.get('description')?.setValue(product.description);
    // this.form.get('title')?.setValue(product.title);
    // this.form.get('price')?.setValue(product.price);
    // this.form.get('category')?.setValue(product.category);
    // this.form.get('image')?.setValue(product.price);
    this.form.patchValue({
      description:product.description,
      title:product.title,
      price:product.price,
      category:product.category,
      image:product.image
    })
    this.base64=product.image
    console.log(product.image);
  }
}
