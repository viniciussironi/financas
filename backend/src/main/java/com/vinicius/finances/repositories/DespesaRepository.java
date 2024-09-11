package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.despesa.Despesa;
import com.vinicius.finances.entities.despesa.Parcela;
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
                SELECT p
                FROM Parcela p
                JOIN p.despesa d
                JOIN d.categoriaDespesa cd
                WHERE d.usuario.id = :idUsuario
                AND (:idCategoria IS NULL OR cd.id = :idCategoria)
                AND (:inicio IS NULL OR p.vencimentoParcela >= :inicio)
                AND (:fim IS NULL OR p.vencimentoParcela <= :fim)
                ORDER BY p.vencimentoParcela DESC
            """)
    Page<Parcela> buscarDespesas(Long idUsuario, Long idCategoria, LocalDate inicio, LocalDate fim, Pageable pageable);


    @Query(nativeQuery = true, value =
            """
                SELECT MONTH(parcelas.vencimento_parcela) AS mes, CAST(SUM(parcelas.valor_parcela) AS DECIMAL(10, 2)) AS total
                FROM despesas
                INNER JOIN parcelas ON despesas.id = parcelas.despesa_id
                WHERE usuario_id = (:id)
                GROUP BY MONTH(parcelas.vencimento_parcela)
                ORDER BY mes DESC
                LIMIT  4
            """)
    List<TotalMesProjection> buscarTotalPorMes(Long id);

    @Query(nativeQuery = true, value =
            """
                SELECT CAST(SUM(valor_total) AS DECIMAL(10, 2)) AS total
                FROM despesas
                WHERE USUARIO_ID = (:id)
            """)
    ValorTotalMovimentacao valorTotalDespesas(Long id);
}
