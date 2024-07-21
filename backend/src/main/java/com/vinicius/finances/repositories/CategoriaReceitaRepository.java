package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.receita.CategoriaReceita;
import com.vinicius.finances.projections.TotalCategoriaProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoriaReceitaRepository extends JpaRepository<CategoriaReceita, Long> {

    @Query(
            nativeQuery = true,
            value =
                    """
                        SELECT
                            cr.ID,
                            cr.Nome,
                            CAST(SUM(r.VALOR) AS DECIMAL(10, 2)) AS total
                        FROM
                            CATEGORIAS_RECEITAS cr
                        JOIN
                            RECEITAS r ON cr.ID = r.CATEGORIA_RECEITA_ID
                        WHERE
                           r.USUARIO_ID = :id
                        GROUP BY
                            cr.ID, cr.Nome
                        LIMIT  4
                    """
    )
    List<TotalCategoriaProjection> buscarValorTotalPorCategoria(Long id);

}
