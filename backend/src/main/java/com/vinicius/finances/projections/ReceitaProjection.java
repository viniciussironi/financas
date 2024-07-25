package com.vinicius.finances.projections;

public interface ReceitaProjection extends MovimentacaoProjection {


    Long getCategoriaReceitaId();
    String getNome();
}
