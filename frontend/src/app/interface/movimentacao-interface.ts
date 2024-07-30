export interface MovimentacaoInterface {
    id: number;
    data: string;
    valor: number;
    categoria: {
      id: number,
      nome: string
    },
}