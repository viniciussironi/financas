package com.vinicius.finances.projections;

import java.time.LocalDate;

public interface MovimentacaoProjection {

    Long getId();
    Double getValor();
    LocalDate getData();
}
