package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.despesa.CategoriaDespesa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaDespesaRepository extends JpaRepository<CategoriaDespesa, Long> {
}
