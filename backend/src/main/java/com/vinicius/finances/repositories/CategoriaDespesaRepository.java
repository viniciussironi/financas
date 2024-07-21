package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.despesa.CategoriaDespesa;
import com.vinicius.finances.projections.TotalCategoriaProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoriaDespesaRepository extends JpaRepository<CategoriaDespesa, Long> {


    @Query(
            nativeQuery = true,
            value = """
                        SELECT
                            cd.ID,
                            cd.Nome,
                            CAST(SUM(d.VALOR) AS DECIMAL(10, 2)) AS total
                        FROM
                            CATEGORIAS_DESPESAS cd
                        JOIN
                            DESPESAS d ON cd.ID = d.CATEGORIA_DESPESA_ID
                        WHERE
                           d.USUARIO_ID = :id
                        GROUP BY
                            cd.ID, cd.Nome
                        LIMIT  4    
                    """
    )
    List<TotalCategoriaProjection> buscarValorTotalPorCategoria(Long id);
}
