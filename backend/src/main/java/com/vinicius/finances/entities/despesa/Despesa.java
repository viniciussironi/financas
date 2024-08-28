package com.vinicius.finances.entities.despesa;

import com.vinicius.finances.entities.MovimentacaoGenerico;
import com.vinicius.finances.entities.Usuario;
import com.vinicius.finances.entities.receita.CategoriaReceita;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@ToString
@Entity
@Table(name = "despesas")
public class Despesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double valorTotal;

    @ManyToOne
    @JoinColumn(name = "categoria_despesa_id")
    private CategoriaDespesa categoriaDespesa;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToMany(mappedBy = "despesa")
    private List<Parcela> parcelas = new ArrayList<>();

    public void addParcela(Parcela parcela) {
        parcelas.add(parcela);
    }
}