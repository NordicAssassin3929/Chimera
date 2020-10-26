import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Coin} from "../models/Coin";
import {Cart} from "../models/Cart";

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
    console.log('Coin added: ' + coinAdded);
    return this.http.post<Coin>(`${this.COINS_URL}/add-to-cart`, coinAdded,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
      })
  }
}
