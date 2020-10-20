import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Coin} from "../models/Coin";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {
  coin: Coin;
  coins: Coin[] = [];
  amount: string = '';

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    let btc = {
      title: "BTC",
      price: 10000,
      amount: 0,
      imageURL: "../assets/btc.jpg",
      description: "money"
    }
    let eth = {
      title: "ETH",
      price: 380,
      amount: 0,
      imageURL: "../assets/eth.jpg",
      description: "money"
    }
    let band = {
      title: "BAND",
      price: 16,
      amount: 0,
      imageURL: "../assets/band.jpg",
      description: "money"
    }

    this.coins.push(btc, eth, band)

    console.log(this.coins)
    for (let i of this.coins){
      console.log(i)
    }
  }

  onSubmit(coin: Coin) {
    console.log(coin);
    this.apiService.buyCoin(coin).subscribe(
      (data: Coin) => {
        console.log(data);
      }
    )
  }
}
