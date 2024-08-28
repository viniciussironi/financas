package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.despesa.Despesa;
import com.vinicius.finances.entities.despesa.Parcela;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ParcelaRepository extends JpaRepository<Parcela, Long> {

    @Query("SELECT d FROM Despesa d JOIN d.parcelas p WHERE p.id = :id")
    Despesa buscarDespesaPeloIdDaParcela(Long id);
}
