package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.despesa.Parcela;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParcelaRepository extends JpaRepository<Parcela, Long> {
}
