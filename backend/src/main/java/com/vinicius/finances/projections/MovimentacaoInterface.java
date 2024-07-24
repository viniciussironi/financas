package com.vinicius.finances.projections;

import java.time.LocalDate;

public interface MovimentacaoInterface {

    Long getId();
    Double getValor();
    LocalDate getData();
}
