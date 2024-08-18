package com.vinicius.finances.projections;

import java.time.LocalDate;

public interface DespesaProjection extends MovimentacaoProjection {

    Boolean getEParcelado();
    String getNome();
    Long getCategoriaDespesaId();
    Long getIdParcela();
    String getParcelaNome();
    LocalDate getDataDeVencimento();
    Double getValorParcela();
}
