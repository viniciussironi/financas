import { MovimentacaoInterface } from "./movimentacao-interface";

export interface DespesaAtualizarInterface extends MovimentacaoInterface {
   
    e_parcelado: boolean,
    qtdParcelas: number,
    primeiraParcela: string,
}