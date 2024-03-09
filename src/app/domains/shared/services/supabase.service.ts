import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { Moto } from '../interfaces/moto';



@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  //? Creamos el cliente
  private supabase: SupabaseClient;
  listProducts: any[] = [];
  

  //? Le asignamos los valores de nuestra BBDD
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  //? Obtener todos los datos de la tabla productos
  getProducts(): Observable<[]> {

    return from(this.supabase
      .from('MotoList')
      .select('*')
      .then(response => response.data as []));
  }

  getMotoById(id: string): Observable<any>{
    return from(this.supabase
      .from('MotoList')
      .select('*')
      .eq('id', id)
      .single()
      .then(response => response.data)
      );  
    }

    deleteMoto(id: string): Observable<any>{
      return from(this.supabase
        .from('MotoList')
        .delete()
        .eq('id', id)
        .then(response => response.data)
        );
    }


  insertProducts(moto: Moto): Observable<Moto[]> {
    return from(this.supabase.from('MotoList')
    .insert({name: moto.name, country: moto.country, price: moto.price , img: moto.img})
    .select()
    .then(response => response.data as Moto[]));

  }

  updateMoto(id: number, moto: Moto): Observable<any> {
    return from(this.supabase
      .from('MotoList')
      .update(moto)
      .eq('id', id)
      .then(response => response.data)
      );
  }

}
