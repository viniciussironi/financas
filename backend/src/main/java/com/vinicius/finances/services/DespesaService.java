package com.vinicius.finances.services;

import com.vinicius.finances.DTOs.*;
import com.vinicius.finances.entities.Usuario;
import com.vinicius.finances.entities.despesa.Despesa;
import com.vinicius.finances.entities.despesa.Parcela;

import com.vinicius.finances.projections.DespesaProjection;
import com.vinicius.finances.projections.TotalMesProjection;
import com.vinicius.finances.projections.ValorTotalMovimentacao;
import com.vinicius.finances.repositories.CategoriaDespesaRepository;
import com.vinicius.finances.repositories.DespesaRepository;
import com.vinicius.finances.repositories.ParcelaRepository;
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
public class DespesaService {

    @Autowired
    private DespesaRepository despesaRepository;
    @Autowired
    private ParcelaRepository parcelaRepository;
    @Autowired
    private CategoriaDespesaRepository categoriaDespesaRepository;
    @Autowired
    private AuthService authService;

    @Transactional(readOnly = true)
    public Page<DespesaResumidoDTO> buscarDespesas(Long idCategoria, LocalDate inicio, LocalDate fim, Pageable pageable) {
        Usuario usuarioLogado = authService.authenticated();

        Page<DespesaProjection> listaBusca = despesaRepository.buscarDespesas(usuarioLogado.getId(), idCategoria, inicio, fim, pageable);
        List<DespesaResumidoDTO> listaResumida = new ArrayList<>();

        listaBusca.forEach(x -> {
            DespesaResumidoDTO dto = new DespesaResumidoDTO();
            dto.setId(x.getId());
            dto.setCategoria(x.getNome());
            if (x.getEParcelado()) {
                dto.setValor(x.getValorParcela());
                dto.setParcelaNome(x.getParcelaNome());
                dto.setData(x.getDataDeVencimento());
                listaResumida.add(dto);

            } else {
                dto.setValor(x.getValor());
                dto.setParcelaNome("");
                dto.setData(x.getData());
                listaResumida.add(dto);
            }
        });

        return new PageImpl<>(listaResumida, listaBusca.getPageable(), listaBusca.getTotalElements());
    }

    @Transactional(readOnly = true)
    public List<TotalPorMesDTO> buscarTotalPorMes() {
        Usuario usuarioLogado = authService.authenticated();

        String[] meses = {"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"};

        List<TotalMesProjection> busca = despesaRepository.buscarTotalPorMes(usuarioLogado.getId());
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
        ValorTotalMovimentacao busca = despesaRepository.valorTotalDespesas(usuarioLogado.getId());
        return busca.getTotal();
    }

    @Transactional(readOnly = true)
    public DespesaAtualizarDTO findById(Long id) {
        return new DespesaAtualizarDTO(despesaRepository.findById(id).get());
    }

    @Transactional
    public DespesaDTO insert(DespesaInsertDTO dto) {
        Usuario usuarioLogado = authService.authenticated();
        Despesa despesa = new Despesa();
        if (dto.getE_parcelado()) {
            double valorParcela = dto.getValor() / dto.getQtdParcelas();
            for (int i = 0; i < dto.getQtdParcelas(); i++) {
                Parcela parcela = new Parcela();
                parcela.setValorParcela(valorParcela);
                parcela.setNome("Parcela " + (i + 1));
                parcela.setDataDeVencimento(dto.getPrimeiraParcela().plusMonths(Long.parseLong("" + i)));
                parcela.setDespesa(despesa);
                parcela = parcelaRepository.save(parcela);
                despesa.getParcelas().add(parcela);
            }
        }
        dtoToEntity(dto, despesa);
        despesa.setUsuario(usuarioLogado);
        despesa = despesaRepository.save(despesa);
        return new DespesaDTO(despesa);
    }

    @Transactional
    public DespesaDTO update(DespesaInsertDTO dto, Long id) {
        try {
            Despesa despesa = despesaRepository.getReferenceById(id);
            despesa.getParcelas().clear();
            if (dto.getE_parcelado()) {
                double valorParcela = dto.getValor() / dto.getQtdParcelas();
                for (int i = 0; i < dto.getQtdParcelas(); i++) {
                    Parcela parcela = new Parcela();
                    parcela.setValorParcela(valorParcela);
                    parcela.setNome("Parcela " + (i + 1));
                    parcela.setDataDeVencimento(dto.getPrimeiraParcela().plusMonths(Long.parseLong("" + i)));
                    parcela.setDespesa(despesa);
                    parcela = parcelaRepository.save(parcela);
                    despesa.getParcelas().add(parcela);
                }
            }
            dtoToEntity(dto, despesa);
            despesa = despesaRepository.save(despesa);
            return new DespesaDTO(despesa);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Não encotrado");
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        if(!despesaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Não encotrado");
        }
        try {
            parcelaRepository.deleteByDespesaId(id);
            despesaRepository.deleteById(id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de integridade");
        }
    }



    public void dtoToEntity(DespesaInsertDTO dto, Despesa entidade) {
        entidade.setData(dto.getData());
        entidade.setValor(dto.getValor());
        entidade.setEParcelado(dto.getE_parcelado());
        entidade.setQtdParcelas(dto.getQtdParcelas());
        entidade.setPrimeiraParcela(dto.getPrimeiraParcela());
        entidade.setCategoriaDespesa(categoriaDespesaRepository.findById(dto.getCategoria().getId()).orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada")));
    }
}