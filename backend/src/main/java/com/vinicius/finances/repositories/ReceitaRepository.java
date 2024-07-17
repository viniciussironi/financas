package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.receita.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    @Query(
            value = "SELECT r FROM Receita r WHERE r.usuario.id = (:id)"
    )
    List<Receita> buscarReceitasPorMes(Long id);
}
