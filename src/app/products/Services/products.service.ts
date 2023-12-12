import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl:string=environment.apiUrl;
  category:string="";
  constructor(private http:HttpClient) { }
  getAllProducts(){
    const productsData = this.http.get(this.baseUrl + '/products');
    return productsData;
  }
  getAllCategories(){
    const categoriesData = this.http.get(this.baseUrl + "/products/categories");
    return categoriesData;
  }
  getProductByCategory(){
    const categoryData = this.http.get(this.baseUrl + "/products/category/"+ this.category);
    return categoryData;
  }
  getProductById(id:any){
      const productData=this.http.get(this.baseUrl+"/products/"+id);
      return productData;
  }
  createProduct(model:any){
    return this.http.post(this.baseUrl+"/products/",model);
  }
}
