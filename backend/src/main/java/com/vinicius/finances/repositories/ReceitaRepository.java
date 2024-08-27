package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.receita.Receita;

import com.vinicius.finances.projections.TotalMesProjection;
import com.vinicius.finances.projections.ValorTotalMovimentacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.time.LocalDate;
import java.util.List;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    @Query(value = """
                SELECT r
                FROM Receita r
                JOIN r.categoriaReceita cr
                WHERE 
                    r.usuario.id = :idUsuario
                    AND (:idCategoria IS NULL OR cr.id = :idCategoria)
                    AND (:inicio IS NULL OR r.data >= :inicio)
                    AND (:fim IS NULL OR r.data <= :fim)
                ORDER BY 
                    r.data DESC
            """,
            countQuery = """
                SELECT COUNT(r) 
                FROM Receita r
                JOIN r.categoriaReceita cr
                WHERE 
                    r.usuario.id = :idUsuario
                    AND (:idCategoria IS NULL OR cr.id = :idCategoria)
                    AND (:inicio IS NULL OR r.data >= :inicio)
                    AND (:fim IS NULL OR r.data <= :fim)
            """
    )
    Page<Receita> buscarReceitas(Long idUsuario, Long idCategoria, LocalDate inicio, LocalDate fim, Pageable pageable);

    @Query(nativeQuery = true, value =
            """
                SELECT MONTH(DATA) AS mes, CAST(SUM(VALOR) AS DECIMAL(10, 2)) AS total
                FROM RECEITAS
                WHERE USUARIO_ID = (:id)
                  AND DATA >= DATEADD(MONTH, -4, CURRENT_DATE)
                GROUP BY MONTH(DATA)
                ORDER BY mes DESC
                LIMIT  4
            """)
    List<TotalMesProjection> buscarTotalPorMes(Long id);

    @Query(nativeQuery = true, value =
            """
                SELECT CAST(SUM(VALOR) AS DECIMAL(10, 2)) AS total
                FROM RECEITAS
                WHERE USUARIO_ID = (:id)
            """
    )
    ValorTotalMovimentacao valorTotalReceitas(Long id);
}
