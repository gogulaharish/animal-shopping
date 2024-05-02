import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[]=[];
  filterProducts: Product[]=[];
  sortOrder: string = '';

  constructor(private productService : ProductService,
    private cartService: CartService,
  private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(res=>{
      this.products=res;
      this.filterProducts=res;
    })
  }

  addToCart(product: Product):void{
    this.cartService.addToCart(product).subscribe({
      next:()=>{
        this.snackBar.open('Product added to cart!','',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      }
    });
  }

  applyFilter(event:Event):void{
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filterProducts = this.products.filter(
      product =>product.name.toLocaleLowerCase().includes(searchTerm)
    )
    this.sortProducts(this.sortOrder);
  }

  sortProducts(sortValue: string):void{
    this.sortOrder = sortValue;
    if(sortValue === 'priceLowHigh'){
      this.filterProducts.sort((a,b)=>a.price - b.price);
    }else if(sortValue === 'priceHighLow'){
      this.filterProducts.sort((a,b)=>b.price - a.price);
    }
  }

}
