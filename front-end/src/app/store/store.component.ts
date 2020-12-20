import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Coin} from "../models/Coin";
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {
  coins: Coin[] = [];

  constructor(private apiService: ApiService,
              private router: Router) {
  }

  async waitForThis(){
    this.apiService.getCoins()
      .subscribe((data: any) => {
        console.log(data)
        this.coins = data
      })
  }

  async ngOnInit() {
    // async
    await this.waitForThis().then(r => console.log(r))
  }

  onSubmit(coin: Coin) {
    console.log(coin);
    const userId = localStorage.getItem('user_id');

    const newCoin = {
      title: coin.title,
      price: coin.price,
      amount: coin.amount,
      imageURL: coin.imageURL,
      description: coin.description,
      userId: userId
    }
    
    this.apiService.buyCoin(newCoin)
    .subscribe(
      (data: Coin) => {
        console.log(data);
      }
    )
  }
}
