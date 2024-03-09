import { Component, Input, inject, signal } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Moto } from '../../../shared/interfaces/moto';


@Component({
  selector: 'app-update',
  standalone: true,
  imports: [RouterLinkWithHref, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  @Input() id!: string;
  private supabaseService = inject(SupabaseService)
  moto = signal<Moto | null>(null)
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


  countryValidator = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });


  ngOnInit() {
    this.supabaseService.getMotoById(this.id).subscribe({
      next: (data) => {
        console.log(data)
        this.moto.set(data)
      }
    })
  }

  actualizar() {

    if (this.nameValidator.valid && this.priceValidator.valid && this.countryValidator.valid) {
      let nameInput = this.nameValidator.value;
      let countryInput = this.countryValidator.value;
      let priceInput = this.priceValidator.value;
      let moto: Moto = {
        name: nameInput,
        country: countryInput,
        price: priceInput,
      }
      this.supabaseService.updateMoto(parseInt(this.id), moto).subscribe({
        next: (data) => {
          this.supabaseService.getProducts().subscribe({
            next: (data) => {
              this.listProducts = data;
            }
          });
        
        }
      })
    }
  }
}
  