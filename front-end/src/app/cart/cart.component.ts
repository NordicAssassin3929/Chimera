import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {Cart, Product} from "../models/Cart";
import {Location} from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  cart: Cart[] = [];
  total: Number = 0;

  constructor(private apiService: ApiService,
    private location: Location) { }

  async waitForThis(){
    this.apiService.getCart()
      .subscribe((data: any) => {
        console.log(data)
        this.cart = data.products
        this.total = data.totalPrice
      })
  }

  backClicked() {
    this.location.back()
  }

  deleteItem(title: String) {
    console.log(title)
    this.apiService.deleteItem(title)
    .subscribe(
      (data: any) => {
        console.log(data)
      }
    )
  }

  async ngOnInit() {
    await this.waitForThis().then(r => console.log(r))
  }
}
