package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.Acesso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcessoRepository extends JpaRepository<Acesso, Long> {
}
