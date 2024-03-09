import { Routes } from '@angular/router';
import { UpdateComponent } from './domains/main/pages/update/update.component';
import { ListComponent } from './domains/main/pages/list/list.component';
import { DeleteComponent } from './domains/main/pages/delete/delete.component';

export const routes: Routes = [
    {path: "", component: ListComponent},
    {path: "actualizar/:id", component: UpdateComponent},
    {path: "borrar/:id", component: DeleteComponent},
    {path: "**", redirectTo: ""},
    {path: "list", component: ListComponent}
];
