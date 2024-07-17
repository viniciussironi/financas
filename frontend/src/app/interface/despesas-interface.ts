import { MovimentacaoInterface } from "./movimentacao-interface";

export interface DespesaInterface extends MovimentacaoInterface {
    categoriaDespesa: {
        id: number,
        nome: string
    },
    parcelas: {
        id: number,
        dataDeVencimento: Date,
        valorParcela: number
    }
  }