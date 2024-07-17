package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.despesa.CategoriaDespesa;
import com.vinicius.finances.entities.receita.CategoriaReceita;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaReceitaRepository extends JpaRepository<CategoriaReceita, Long> {
}
