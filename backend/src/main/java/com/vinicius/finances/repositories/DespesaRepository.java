package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.despesa.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DespesaRepository extends JpaRepository<Despesa, Long> {

    @Query(
            value = "SELECT d FROM Despesa d WHERE d.usuario.id = (:id)"
    )
    List<Despesa> buscarDespesasPorMes(Long id);
}
