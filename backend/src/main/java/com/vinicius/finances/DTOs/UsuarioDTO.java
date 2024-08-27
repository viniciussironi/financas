package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.Usuario;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class UsuarioDTO {

    private Long id;
    private String nome;
    private String sobrenome;
    private String email;

    public UsuarioDTO() {
    }

    public UsuarioDTO(Usuario usuario) {
        id = usuario.getId();
        nome = usuario.getNome();
        sobrenome = usuario.getSobrenome();
        email = usuario.getEmail();
    }
}
