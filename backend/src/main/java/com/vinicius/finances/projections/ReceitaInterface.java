package com.vinicius.finances.projections;

import java.time.LocalDate;

public interface ReceitaInterface extends MovimentacaoInterface {


    Long getCategoriaReceitaId();
    String getNome();
}
