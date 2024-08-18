export class MovimentacaoClass {

    id: number
    categoria: string
    data: string
    valor: number
    parcelaNome: string
    
    constructor(id: number, categoria: string, data: string, valor:number, parcelaNome: string) {
      this.id = id;
      this.categoria = categoria;
      this.data = data;
      this.valor = valor;
      this.parcelaNome = parcelaNome;
    }
}