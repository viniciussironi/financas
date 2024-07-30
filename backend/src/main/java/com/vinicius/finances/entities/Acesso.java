package com.vinicius.finances.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

@Data
@Entity
@Table(name = "Acessos")
public class Acesso implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String authority;

    @Override
    public String getAuthority() {
        return authority;
    }

    public Acesso(Long id, String authority) {
        this.id = id;
        this.authority = authority;
    }
}





