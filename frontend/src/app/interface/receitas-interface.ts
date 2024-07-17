import { MovimentacaoInterface } from "./movimentacao-interface";

export interface ReceitaInterface extends MovimentacaoInterface {
    categoriaReceita: {
        id: number,
        nome: string
    };
  }