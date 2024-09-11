import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ReceitasComponent } from './pages/app-financas/receitas/receitas.component';
import { DespesasComponent } from './pages/app-financas/despesas/despesas.component';
import { AddReceitaComponent } from './pages/app-financas/receitas/add-receita/add-receita.component';
import { AddDespesaComponent } from './pages/app-financas/despesas/add-despesa/add-despesa.component';
import { AppFinancasComponent } from './pages/app-financas/app-financas.component';
import { VisaoGeralComponent } from './pages/app-financas/visao-geral/visao-geral.component';
import { ResumoReceitasComponent } from './pages/app-financas/receitas/resumo/resumo.component';
import { ResumoDespesasComponent } from './pages/app-financas/despesas/resumo/resumo.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { canActivateAdmin } from './constant/auth';
import { EditReceitaComponent } from './pages/app-financas/receitas/edit-receita/edit-receita.component';
import { EditDespesaComponent } from './pages/app-financas/despesas/edit-despesa/edit-despesa.component';
import { ContaComponent } from './pages/app-financas/conta/conta.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'app-finances', component: AppFinancasComponent, canActivate: [canActivateAdmin], children: [
        {path: 'visao-geral', component: VisaoGeralComponent},
        {path: 'receitas', component: ReceitasComponent, children: [
            {path: 'resumo', component: ResumoReceitasComponent},
            {path: 'add-receita', component: AddReceitaComponent},
            {path: 'edit-receita/:id', component: EditReceitaComponent},
        ]},
        {path: 'despesas', component: DespesasComponent, children: [
            {path: 'resumo', component: ResumoDespesasComponent},
            {path: 'add-despesa', component: AddDespesaComponent}, 
            {path: 'edit-despesa/:id', component: EditDespesaComponent},
        ]},
        {path: 'conta', component: ContaComponent}, 
    ]},
];
