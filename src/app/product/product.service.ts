import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl + '/products';

  constructor( private http: HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl);
  }
}
