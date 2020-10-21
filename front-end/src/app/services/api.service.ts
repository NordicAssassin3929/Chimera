import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Coin} from "../models/Coin";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  COINS_URL = environment.coinsUrl;

  constructor(private http: HttpClient) { }

  getCoins(): Observable<Coin[]> {
    return this.http.get<Coin[]>(`${this.COINS_URL}`);
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
