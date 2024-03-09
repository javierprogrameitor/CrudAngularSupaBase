import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Moto } from '../../../shared/interfaces/moto';
import { RouterLinkWithHref } from '@angular/router';



@Component({

  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'

})

export class ListComponent {
[x: string]: any;

  private supabaseService = inject(SupabaseService);
  listProducts = this.supabaseService.listProducts;
  

  nameValidator = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });

  priceValidator = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });

  fechValidator = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });


  countryValidator = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });

  imgValidator = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });



  ngOnInit() {
   
     this.supabaseService.getProducts().subscribe({
      next: (data) => {
        this.listProducts = data;
      }
    });
  }

  insertarMoto(){
    event?.preventDefault();
    if (this.nameValidator.valid && this.priceValidator.valid && this.countryValidator.valid && this.imgValidator.valid) {
      let nameInput= this.nameValidator.value;
      let priceInput= this.priceValidator.value;
      let countryInput= this.countryValidator.value;
      let imgInput= this.imgValidator.value;
      let moto: Moto = {
        name: nameInput,
        price: priceInput,
        country: countryInput,
        img: imgInput
        }
       this.supabaseService.insertProducts(moto).subscribe({
      next: (data) => {
        this.supabaseService.getProducts().subscribe({
          next: (data) => {
            this.listProducts = data;
          }
        });
      }
    });


  }

}
}

