package com.vinicius.finances.entities;

import com.vinicius.finances.entities.despesa.Despesa;
import com.vinicius.finances.entities.receita.Receita;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Data
@Entity
@Table(name = "Usuarios")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String sobrenome;
    private String email;
    private String senha;

    @OneToMany(mappedBy = "usuario")
    private List<Despesa> despesas = new ArrayList<>();

    @OneToMany(mappedBy = "usuario")
    private List<Receita> receitas = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER) // Toda vez que buscar um usuário, já vai vir os Roles
    @JoinTable(
            name = "Usuario_Acesso",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "acesso_id"))
    private Set<Acesso> acessos = new HashSet<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return acessos;
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public void addAcesso(Acesso acesso) {
        acessos.add(acesso);
    }
}
