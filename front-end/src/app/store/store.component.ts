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

  @ViewChild('title', {static: false}) titleRef: ElementRef;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    let btc = {
      title: "BTC",
      price: 10000,
      imageURL: "../assets/btc.jpg",
      description: "money"
    }
    let eth = {
      title: "ETH",
      price: 380,
      imageURL: "../assets/eth.jpg",
      description: "money"
    }
    let band = {
      title: "BAND",
      price: 16,
      imageURL: "../assets/band.jpg",
      description: "money"
    }

    this.coins.push(btc, eth, band);
  }

  onSubmit(coin: Coin) {
    console.log(coin.title);
    const title = this.titleRef.nativeElement.innerHTML;
    //const title1 = this.component
    console.log(title);
    this.apiService.addNewCoin(title).subscribe(
      (data: Coin) => {
        console.log(data);
      }
    )
  }

}
