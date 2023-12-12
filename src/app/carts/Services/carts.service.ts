import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }
  sendCart(model:any){
    return this.http.post(environment.apiUrl + "/carts", model)
  }
  getCarts(param?:any){
    let params = new HttpParams();
    params=params.append("startDate",param?.start).append("endDate",param?.end);
    console.log(params)
    return this.http.get(environment.apiUrl +"/carts",{params})
  }
  deleteCart(id:number){
    return this.http.delete(environment.apiUrl +"/carts/" +id)
  }
}
