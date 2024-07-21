package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.despesa.Despesa;
import com.vinicius.finances.projections.TotalMesProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DespesaRepository extends JpaRepository<Despesa, Long> {

    @Query(
            value =
                    """
                        SELECT d 
                        FROM Despesa d 
                        WHERE d.usuario.id = (:id)
                        ORDER BY d.data DESC
                    """
    )
    List<Despesa> buscarDespesas(Long id);

    @Query(nativeQuery = true, value =
            """
                SELECT MONTH(DATA) AS mes, CAST(SUM(VALOR) AS DECIMAL(10, 2)) AS total
                FROM DESPESAS
                WHERE USUARIO_ID = (:id)
                  AND DATA >= DATEADD(MONTH, -4, CURRENT_DATE)
                GROUP BY MONTH(DATA)
                ORDER BY mes
            """)
    List<TotalMesProjection> buscarTotalPorMes(Long id);
}
