import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-catalogue-component',
  templateUrl: 'catalogue.component.html',
  styleUrls: ['catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService,private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  removeProduct(product: Product) {
    const index = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }
  redirectToUpdate(productId: number) {
    console.log(productId)
    this.router.navigate(['/update-product', productId]);
  }
  
  
}
