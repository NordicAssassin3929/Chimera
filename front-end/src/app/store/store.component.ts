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

  ngOnInit() {
    // async
    this.waitForThis().then(r => console.log(r))
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
