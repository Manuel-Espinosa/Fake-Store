import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-add-product-component',
  templateUrl: './add-product-component.component.html',
  styleUrls: ['./add-product-component.component.css'],
})
export class AddProductComponentComponent {
  productForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  addProduct() {
    if (this.productForm.invalid) {
      return;
    }

    const product = this.productForm.value;

    this.http.post('https://fakestoreapi.com/products', product).subscribe(
      (response: any) => {
        console.log(response);
        this.productForm.reset();
        // Show success dialog
        this.openDialog('Exito', 'Producto agregado exitosamente.');
      },
      (error: any) => {
        console.error(error);
        // Show error dialog
        this.openDialog('Error', 'Producto no agregado.');
      }
    );
  }

  openDialog(title: string, message: string) {
    this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message,
      },
    });
  }
}
