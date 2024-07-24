package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.receita.Receita;

import com.vinicius.finances.projections.ReceitaInterface;
import com.vinicius.finances.projections.TotalMesProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.time.LocalDate;
import java.util.List;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    @Query(nativeQuery = true, value =
            """
                SELECT receitas.id, receitas.data, receitas.valor, categorias_receitas.nome,  categorias_receitas.id AS categoria_receita_id 
                FROM receitas
                INNER JOIN categorias_receitas ON categorias_receitas.id = receitas.categoria_receita_id
                WHERE usuario_id = :idUsuario
                AND (categoria_receita_id IS NULL OR categoria_receita_id = :idCategoria)
                AND (:inicio IS NULL OR data >= :inicio)
                AND (:fim IS NULL OR data <= :fim)
                ORDER BY receitas.data DESC
            """,
            countQuery =
            """
                SELECT COUNT(*) FROM (
                    SELECT receitas.id, receitas.data, receitas.valor, categorias_receitas.nome, categorias_receitas.id AS categoria_receita_id 
                    FROM receitas
                    INNER JOIN categorias_receitas ON categorias_receitas.id = receitas.categoria_receita_id
                    WHERE usuario_id = :idUsuario
                    AND (categoria_receita_id IS NULL OR categoria_receita_id = :idCategoria)
                    AND (:inicio IS NULL OR data >= :inicio)
                    AND (:fim IS NULL OR data <= :fim)
                    ORDER BY receitas.data DESC
                )
            """
    )
    Page<ReceitaInterface> buscarReceitas(Long idUsuario, Long idCategoria, LocalDate inicio, LocalDate fim, Pageable pageable);

    @Query(nativeQuery = true, value =
            """
                SELECT MONTH(DATA) AS mes, CAST(SUM(VALOR) AS DECIMAL(10, 2)) AS total
                FROM RECEITAS
                WHERE USUARIO_ID = (:id)
                  AND DATA >= DATEADD(MONTH, -4, CURRENT_DATE)
                GROUP BY MONTH(DATA)
                ORDER BY mes
            """)
    List<TotalMesProjection> buscarTotalPorMes(Long id);
}
