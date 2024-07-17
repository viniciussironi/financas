import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResumoComponent } from './pages/resumo/resumo.component';
import { AppComponent } from './app.component';
import { ReceitasComponent } from './pages/receitas/receitas.component';
import { DespesasComponent } from './pages/despesas/despesas.component';
import { FinancesComponent } from './pages/finances/finances.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'finances', component: FinancesComponent, children: 
        [
            {path: 'resumo', component: ResumoComponent},
            {path: 'receitas', component: ReceitasComponent},
            {path: 'despesas', component: DespesasComponent},
        ]
    },
    
];
