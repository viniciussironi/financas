import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ResumoComponent } from './pages/resumo/resumo.component';
import { ReceitasComponent } from './pages/receitas/receitas.component';
import { DespesasComponent } from './pages/despesas/despesas.component';
import { ContaComponent } from './pages/conta/conta.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'resumo', component: ResumoComponent},
    {path: 'receitas', component: ReceitasComponent},
    {path: 'despesas', component: DespesasComponent},
    {path: 'conta', component: ContaComponent},
        
    
];
