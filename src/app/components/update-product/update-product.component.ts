import { Component,OnInit  } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{
  products: Product[] = [];
  selectedProductId: number | null = null;
  updatedProduct: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    image: '',
    category: ''
  };

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    this.loadProducts();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: { [x: string]: string | number; }) => {
      this.selectedProductId  = +params['id'];

    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  getProductProperty(productId: number, property: string): any {
    const product = this.products.find(p => p.id === productId);
    return product ? product[property] : null;
  }

  updateProduct() {
    if (this.selectedProductId) {
      const url = `https://fakestoreapi.com/products/${this.selectedProductId}`;
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(this.updatedProduct)
      })
        .then(res => res.json())
        .then(json => {
          // Show success dialog
          console.log(this.updateProduct)
          this.openDialog('Exito', 'Producto actualizado exitosamente.');
        })
        .catch(error => {
          // Show error dialog
          this.openDialog('Error', 'Falló la actualización del producto.');
        });
    }
  }

  openDialog(title: string, message: string) {
    this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message
      }
    });
  }
}
