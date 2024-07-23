import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ReceitasComponent } from './pages/app-financas/receitas/receitas.component';
import { DespesasComponent } from './pages/app-financas/despesas/despesas.component';
import { ContaComponent } from './pages/app-financas/conta/conta.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { AddReceitaComponent } from './pages/app-financas/receitas/add-receita/add-receita.component';
import { AddDespesaComponent } from './pages/app-financas/despesas/add-despesa/add-despesa.component';
import { AppFinancasComponent } from './pages/app-financas/app-financas.component';
import { VisaoGeralComponent } from './pages/app-financas/visao-geral/visao-geral.component';
import { ResumoReceitasComponent } from './pages/app-financas/receitas/resumo/resumo.component';
import { ResumoDespesasComponent } from './pages/app-financas/despesas/resumo/resumo.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'app-finances', component: AppFinancasComponent, children: [
        {path: 'visao-geral', component: VisaoGeralComponent},
        {path: 'receitas', component: ReceitasComponent, children: [
            {path: 'resumo', component: ResumoReceitasComponent},
            {path: 'add-receita', component: AddReceitaComponent},
        ]},
        {path: 'despesas', component: DespesasComponent, children: [
            {path: 'resumo', component: ResumoDespesasComponent},
            {path: 'add-despesa', component: AddDespesaComponent}, 
        ]},
        {path: 'conta', component: ContaComponent},
        {path: 'configuracoes', component: ConfiguracoesComponent},
    ]} 
];
