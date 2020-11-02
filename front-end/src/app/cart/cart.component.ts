import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {Cart, Products} from "../models/Cart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  cartItems: Products[] = null;
  totalCost: Number = 0;

  constructor(private apiService: ApiService) { }

  async waitForThis(){
    this.apiService.getCart()
      .subscribe((data: any) => {
        console.log(data)
        this.totalCost = data.totalPrice
        this.cartItems = data.products
      })
  }

  ngOnInit() {
    this.waitForThis().then(r => console.log(r))
  }

}