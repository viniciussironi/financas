package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.Acesso;
import lombok.Data;

@Data
public class AcessoDTO {

    private Long id;
    private String authority;

    public AcessoDTO() {
    }

    public AcessoDTO(Acesso entidade) {
        id = entidade.getId();
        authority = entidade.getAuthority();
    }
}
