package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.despesa.Parcela;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface ParcelaRepository extends JpaRepository<Parcela, Long> {

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value = "DELETE FROM parcelas WHERE despesa_id = (:id)")
    void deleteByDespesaId(Long id);
}
