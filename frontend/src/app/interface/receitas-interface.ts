export interface ReceitaInterface {

    id: number;
    data: string;
    valor: number;
    categoriaReceita: {
      id: number,
      nome: string
    },
}