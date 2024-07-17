package com.vinicius.finances.entities.despesa;

import com.vinicius.finances.entities.MovimentacaoGenerico;
import com.vinicius.finances.entities.Usuario;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "Despesas")
public class Despesa extends MovimentacaoGenerico {

    private Boolean eParcelado;
    private Integer qtdParcelas;
    private LocalDate primeiraParcela;

    @OneToMany(mappedBy = "despesa")
    private List<Parcela> parcelas = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "Categoria_Despesa_ID")
    private CategoriaDespesa categoriaDespesa;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
