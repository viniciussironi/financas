import { MovimentacaoInterface } from "./movimentacao-interface";

export interface DespesaInterface extends MovimentacaoInterface {
    parcelas: {
        id: number,
        dataDeVencimento: Date,
        valorParcela: number
    }
}