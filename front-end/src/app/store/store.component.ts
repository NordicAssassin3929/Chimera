import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { Coin } from "../models/Coin";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {
  coins: Coin[] = [];
  modalCoins: [] = [];
  addToCartForm: FormGroup;
  coin: Coin

  constructor(private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder) {
      this.initializeForm()
  }

  async waitForThis() {
    this.apiService.getCoins()
      .subscribe((data: any) => {
        console.log(data)
        this.coins = data
      })
  }

  getModalCoin(coin) {
    this.modalCoins = coin
  }

  async ngOnInit() {
    // async
    await this.waitForThis().then(r => console.log(r))
  }

  initializeForm() {
    this.addToCartForm = this.fb.group({
      amount: ['', [Validators.required, 
        Validators.min(1),
        Validators.pattern(/^[1-9]\d*$/)]]
    })
  }

  onSubmit(coin: Coin) {
    this.coin = this.addToCartForm.value;
    console.log(this.coin);
    // this.coin.title = 'TEST'
    // this.coin.price = 50
    const userId = localStorage.getItem('user_id');

    const newCoin = {
      // title: this.coin.title,
      // price: this.coin.price,
      title: coin.title,
      price: coin.price,
      amount: this.coin.amount,
      userId: userId
    }

    console.log('Status: ' + this.addToCartForm.status)
    
    if (this.addToCartForm.valid) {
    this.apiService.buyCoin(newCoin)
      .subscribe(
        (data: Coin) => {
          console.log(data);
        }
      )
    }
  }
}
