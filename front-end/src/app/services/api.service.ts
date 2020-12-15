import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Coin} from "../models/Coin";
import {Cart} from "../models/Cart";
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  COINS_URL = environment.coinsUrl;

  constructor(private http: HttpClient) { }

  getCoins(): Observable<Coin[]> {
    return this.http.get<Coin[]>(`${this.COINS_URL}`);
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.COINS_URL}/cart`);
  }

  buyCoin(coinAdded: Coin): Observable<Coin> {
    return this.http.post<Coin>(`${this.COINS_URL}/add-to-cart`, coinAdded,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
      })
  }

  createUser(userAdded: User): Observable<User> {
    return this.http.post<User>(`${this.COINS_URL}/register`, userAdded,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
      })  
  }
  
  deleteItem(coinName: String) {
    console.log(`${this.COINS_URL}/delete/` + coinName)
    return this.http.delete<Cart>(`${this.COINS_URL}/delete/` + coinName);
  }
}
