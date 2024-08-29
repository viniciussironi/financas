export interface DespesaAtualizarInterface {
   
    e_parcelada: boolean,
    valor: number,
    data: string,
    quantidadeDeParcelas: number
    categoriaDespesa: {
        id: number;
        nome: string;
    }
}