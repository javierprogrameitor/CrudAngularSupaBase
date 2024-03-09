import { Component, Input, inject, signal } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Moto } from '../../../shared/interfaces/moto';
import { SupabaseService } from '../../../shared/services/supabase.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './delete.component.html'
  
})
export class DeleteComponent {
@Input()id!: string;
private supabaseService=inject(SupabaseService)
moto=signal<Moto | null>(null)

ngOnInit(){
  this.supabaseService.getMotoById(this.id).subscribe({
    next: (data) => {
      console.log(data)
      this.moto.set(data)
    }
  })
}

borrarMoto(){
  this.supabaseService.deleteMoto(this.id).subscribe({
    next: (data) => {
      console.log(data)
    }
  })
}

}