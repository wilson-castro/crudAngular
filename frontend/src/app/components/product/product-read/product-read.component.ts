import { Component, OnInit } from "@angular/core";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-read",
  templateUrl: "./product-read.component.html",
  styleUrls: ["./product-read.component.css"],
})
export class ProductReadComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = ["id", "name", "price"];

  constructor(private prodService: ProductService) {}

  ngOnInit(): void {
    this.prodService.read().subscribe((products) => {
      this.products = products;
    });
  }
}
