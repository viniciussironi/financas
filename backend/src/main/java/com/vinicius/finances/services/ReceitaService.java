package com.vinicius.finances.services;

import com.vinicius.finances.DTOs.DespesaDTO;
import com.vinicius.finances.DTOs.ReceitaDTO;
import com.vinicius.finances.DTOs.TotalPorMesDTO;
import com.vinicius.finances.entities.Usuario;
import com.vinicius.finances.entities.receita.CategoriaReceita;
import com.vinicius.finances.entities.receita.Receita;
import com.vinicius.finances.projections.ReceitaProjection;
import com.vinicius.finances.projections.TotalMesProjection;
import com.vinicius.finances.projections.ValorTotalMovimentacao;
import com.vinicius.finances.repositories.CategoriaReceitaRepository;
import com.vinicius.finances.repositories.ReceitaRepository;
import com.vinicius.finances.services.exceptions.DatabaseException;
import com.vinicius.finances.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;
    @Autowired
    private CategoriaReceitaRepository categoriaReceitaRepository;
    @Autowired
    private AuthService authService;

    @Transactional(readOnly = true)
    public Page<ReceitaDTO> buscarReceitas(Long idCategoria, LocalDate inicio, LocalDate fim, Pageable pageable) {
        Usuario usuarioLogado = authService.authenticated();

        Page<ReceitaProjection> listaBusca = receitaRepository.buscarReceitas(usuarioLogado.getId(), idCategoria, inicio, fim, pageable);
        List<ReceitaDTO> lista = new ArrayList<>();

        listaBusca.forEach(x -> {
            Receita receita = new Receita();
            CategoriaReceita categoriaReceita = new CategoriaReceita();
            receita.setId(x.getId());
            receita.setData(x.getData());
            receita.setValor(x.getValor());
            categoriaReceita.setId(x.getCategoriaReceitaId());
            categoriaReceita.setNome(x.getNome());
            receita.setCategoriaReceita(categoriaReceita);
            ReceitaDTO receitaDTO = new ReceitaDTO(receita);
            lista.add(receitaDTO);
        });
        return new PageImpl<>(lista, listaBusca.getPageable(), listaBusca.getTotalElements());
    }

    @Transactional(readOnly = true)
    public List<TotalPorMesDTO> buscarTotalPorMes() {
        Usuario usuarioLogado = authService.authenticated();

        String[] meses = {"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"};

        List<TotalMesProjection> busca = receitaRepository.buscarTotalPorMes(usuarioLogado.getId());
        List<TotalPorMesDTO> result = new ArrayList<>();
        busca.forEach(x -> {
            TotalPorMesDTO dto = new TotalPorMesDTO();
            dto.setMes(meses[x.getMes() - 1]);
            dto.setTotal(x.getTotal());
            result.add(dto);
        });
        return result;
    }

    @Transactional(readOnly = true)
    public Double valorTotalDespesa() {
        Usuario usuarioLogado = authService.authenticated();
        ValorTotalMovimentacao busca = receitaRepository.valorTotalReceitas(usuarioLogado.getId());
        return busca.getTotal();
    }

    @Transactional
    public ReceitaDTO insert(ReceitaDTO dto) {
        Usuario usuarioLogado = authService.authenticated();
        Receita receita = new Receita();
        dtoToEntity(dto, receita);
        receita.setUsuario(usuarioLogado);
        receita = receitaRepository.save(receita);
        return new ReceitaDTO(receita);
    }

    @Transactional(readOnly = true)
    public ReceitaDTO findById(Long id) {
        return new ReceitaDTO(receitaRepository.findById(id).get());
    }

    @Transactional
    public ReceitaDTO update(ReceitaDTO dto, Long id) {
        try {
            Receita entidade = receitaRepository.getReferenceById(id);
            dtoToEntity(dto, entidade);
            entidade = receitaRepository.save(entidade);
            return new ReceitaDTO(entidade);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Não encotrado");
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        if(!receitaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Não encotrado");
        }
        try {
            receitaRepository.deleteById(id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de integridade");
        }
    }



    public void dtoToEntity(ReceitaDTO dto, Receita entidade) {
        entidade.setData(dto.getData());
        entidade.setValor(dto.getValor());
        entidade.setCategoriaReceita(categoriaReceitaRepository.getReferenceById(dto.getCategoria().getId()));
    }
}
