package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.despesa.CategoriaDespesa;
import com.vinicius.finances.entities.despesa.Despesa;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.Getter;
import lombok.NonNull;

import java.time.LocalDate;

@Data
@Getter
public class DespesaInsertDTO extends MovimentacaoGenericoDTO {

    @NotNull(message = "Não pode estar vazio")
    private Boolean e_parcelado;
    @Positive(message = "Valor deve ser positivo")
    private Integer qtdParcelas;
    private LocalDate primeiraParcela;

    private CategoriaDTO categoria;

    public DespesaInsertDTO() {
    }

    public DespesaInsertDTO(Despesa entidade) {
        super(entidade);
        e_parcelado = entidade.getEParcelado();
        qtdParcelas = entidade.getQtdParcelas();
        primeiraParcela = entidade.getPrimeiraParcela();
        categoria = new CategoriaDTO(entidade.getCategoriaDespesa());
    }
}
