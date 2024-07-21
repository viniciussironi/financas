package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.receita.Receita;
import com.vinicius.finances.projections.TotalMesProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    @Query(
            value = """
                        SELECT r 
                        FROM Receita r 
                        WHERE r.usuario.id = (:id)
                        ORDER BY r.data DESC
                    """
    )
    List<Receita> buscarReceitas(Long id);

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
