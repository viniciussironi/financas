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
                            cd.id,
                            cd.nome,
                            CAST(SUM(d.valor_total) AS DECIMAL(10, 2)) AS total
                        FROM
                            CATEGORIAS_DESPESAS cd
                        JOIN
                            DESPESAS d ON cd.id = d.categoria_despesa_id
                        WHERE
                           d.usuario_id = :id
                        GROUP BY
                            cd.ID, cd.nome
                        LIMIT  4
                    """
    )
    List<TotalCategoriaProjection> buscarValorTotalPorCategoria(Long id);
}
