package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.despesa.Despesa;
import com.vinicius.finances.projections.TotalMesProjection;
import com.vinicius.finances.projections.ValorTotalMovimentacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface DespesaRepository extends JpaRepository<Despesa, Long> {
    @Query(
            """
                SELECT DISTINCT d
                FROM Despesa d
                INNER JOIN FETCH d.categoriaDespesa cd
                LEFT JOIN FETCH d.parcelas p
                WHERE d.usuario.id = :idUsuario
                AND (:idCategoria IS NULL OR cd.id = :idCategoria)
                AND (:inicio IS NULL OR p.vencimentoParcela >= :inicio)
                AND (:fim IS NULL OR p.vencimentoParcela <= :fim)
                ORDER BY p.vencimentoParcela DESC
            """
    )
    Page<Despesa> buscarDespesas(Long idUsuario, Long idCategoria, LocalDate inicio, LocalDate fim, Pageable pageable);


    @Query(nativeQuery = true, value =
            """
                SELECT MONTH(DATA) AS mes, CAST(SUM(VALOR) AS DECIMAL(10, 2)) AS total
                FROM DESPESAS
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
                FROM despesas
                WHERE USUARIO_ID = (:id)
            """
    )
    ValorTotalMovimentacao valorTotalDespesas(Long id);

}
