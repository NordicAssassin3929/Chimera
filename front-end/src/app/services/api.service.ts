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

  getCars(): Observable<Coin[]> {
    return this.http.get<Coin[]>(`${this.COINS_URL}`);
  }

  addNewCoin(coinAdded: Coin): Observable<Coin> {
    console.log('Coin added: ' + coinAdded.title + ' ' + coinAdded.price);
    return this.http.post<Coin>(`${this.COINS_URL}/add-coin`, coinAdded,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
  }
}
