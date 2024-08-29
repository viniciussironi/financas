export interface DespesaInterface  {
    id: number,
    valorParcela: number,
    vencimentoParcela: string,
    nomeParcela: string,
    despesa: {
        id: number,
        valorTotal: number,
        categoriaDespesa: {
            id: number,
            nome: string
        }
    }
}