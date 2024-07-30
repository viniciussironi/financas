package com.vinicius.finances.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UsuarioInserirDTO extends UsuarioDTO {

    @NotBlank(message = "Campo Obrigatório")
    @Size(min = 6, message = "Deve ter no mínimo 6 caracteres")
    private String senha;

    public UsuarioInserirDTO() {
        super();
    }
}
