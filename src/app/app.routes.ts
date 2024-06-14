import { Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';

export const routes: Routes = [

    {
        path: '', component: ListaComponent
    },
    {
        path:'formulario', component: FormularioComponent
    },
    {
        path:':id/edit', component: FormularioComponent
    }
];
