package com.vinicius.finances.DTOs;

import com.vinicius.finances.entities.Usuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class UsuarioDTO {

    private Long id;
    @NotBlank(message = "Não pode estar vazio")
    private String nome;
    @NotBlank(message = "Não pode estar vazio")
    private String sobrenome;
    @NotBlank(message = "Não pode estar vazio")
    @Email(message = "Digite um email válido")
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
