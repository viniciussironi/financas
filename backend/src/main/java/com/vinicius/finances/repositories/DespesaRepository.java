package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.despesa.Despesa;
import com.vinicius.finances.projections.DespesaProjection;
import com.vinicius.finances.projections.TotalMesProjection;
import com.vinicius.finances.projections.ValorTotalMovimentacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface DespesaRepository extends JpaRepository<Despesa, Long> {

    @Query(nativeQuery = true, value =
            """
                SELECT
                   despesas.id,
                   despesas.data,
                   despesas.valor,
                   despesas.e_parcelado AS EParcelado,
                   categorias_despesas.nome,
                   categorias_despesas.id AS categoria_despesa_id,
                   parcelas.id as id_parcela,
                   parcelas.data_de_vencimento,
                   parcelas.valor_parcela
                FROM
                   despesas
                INNER JOIN
                   categorias_despesas ON categorias_despesas.id = despesas.categoria_despesa_id
                LEFT JOIN
                   parcelas ON despesas.id = parcelas.despesa_id
                WHERE
                   usuario_id = :idUsuario
                   AND (:idCategoria IS NULL OR categoria_despesa_id = :idCategoria)
                   AND (:inicio IS NULL OR data >= :inicio)
                   AND (:fim IS NULL OR data <= :fim)
                ORDER BY
                   despesas.data DESC
            """,
            countQuery =
            """
                SELECT COUNT(*) FROM (
                   SELECT
                       despesas.id,
                       despesas.data,
                       despesas.valor,
                       despesas.e_parcelado AS EParcelado,
                       categorias_despesas.nome,
                       categorias_despesas.id AS categoria_despesa_id,
                       parcelas.id as id_parcela,
                       parcelas.data_de_vencimento,
                       parcelas.valor_parcela
                   FROM
                       despesas
                   INNER JOIN
                       categorias_despesas ON categorias_despesas.id = despesas.categoria_despesa_id
                   LEFT JOIN
                       parcelas ON despesas.id = parcelas.despesa_id
                   WHERE
                       usuario_id = :idUsuario
                       AND (:idCategoria IS NULL OR categoria_despesa_id = :idCategoria)
                       AND (:inicio IS NULL OR data >= :inicio)
                       AND (:fim IS NULL OR data <= :fim)
                   ORDER BY
                       despesas.data DESC
                )
            """
    )
    Page<DespesaProjection> buscarDespesas(Long idUsuario, Long idCategoria, LocalDate inicio, LocalDate fim, Pageable pageable);

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
