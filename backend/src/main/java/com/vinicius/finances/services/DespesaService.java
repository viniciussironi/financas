package com.vinicius.finances.services;

import com.vinicius.finances.DTOs.*;
import com.vinicius.finances.entities.Usuario;
import com.vinicius.finances.entities.despesa.Despesa;

import com.vinicius.finances.entities.despesa.Parcela;
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
    public Page<ParcelaDTO> buscarDespesas(Long idCategoria, LocalDate inicio, LocalDate fim, Pageable pageable) {
        Usuario usuarioLogado = authService.authenticated();
        Page<Parcela> resultado = despesaRepository.buscarDespesas(usuarioLogado.getId(), idCategoria, inicio, fim, pageable);
        List<ParcelaDTO> lista = resultado.stream().map(x -> new ParcelaDTO(x)).toList();

        return new PageImpl<>(lista, resultado.getPageable(), resultado.getTotalElements());
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
    public DespesaInsertDTO findById(Long id) {
        authService.authenticated();
        return new DespesaInsertDTO(parcelaRepository.buscarDespesaPeloIdDaParcela(id));
    }

    @Transactional
    public DespesaDTO insert(DespesaInsertDTO dto) {
        System.out.println("DTO:" + dto.toString());
        Usuario usuarioLogado = authService.authenticated();
        Despesa entidade = new Despesa();
        entidade.setUsuario(usuarioLogado);
        dtoToEntity(dto, entidade);
        if (dto.getE_parcelada() == true) {
            double valorParcela = dto.getValor() / dto.getQuantidadeDeParcelas();
            for (int i = 0; i < dto.getQuantidadeDeParcelas(); i++) {
                Parcela parcela = new Parcela();
                parcela.setValorParcela(valorParcela);
                parcela.setVencimentoParcela(dto.getData().plusMonths(Long.parseLong("" + i)));
                parcela.setNomeParcela("Parcela " + (i +1) + "/" + dto.getQuantidadeDeParcelas());
                parcela.setDespesa(entidade);
                parcela = parcelaRepository.save(parcela);
                entidade.addParcela(parcela);
            }
        }
        else {
            Parcela parcela = new Parcela();
            parcela.setValorParcela(dto.getValor());
            parcela.setVencimentoParcela(dto.getData());
            parcela.setNomeParcela("À vista");
            parcela.setDespesa(entidade);
            parcela = parcelaRepository.save(parcela);
            entidade.addParcela(parcela);
        }
        entidade = despesaRepository.save(entidade);
        return new DespesaDTO(entidade);
    }

    @Transactional
    public DespesaDTO update(DespesaInsertDTO dto, Long id) {
        Usuario usuarioLogado = authService.authenticated();
        try {
            Despesa entidade = parcelaRepository.buscarDespesaPeloIdDaParcela(id);
            parcelaRepository.deletarParcelasPeloIdDaDespesa(entidade.getId());
            entidade.setUsuario(usuarioLogado);
            dtoToEntity(dto, entidade);
            if (dto.getE_parcelada()) {
                double valorParcela = dto.getValor() / dto.getQuantidadeDeParcelas();
                for (int i = 0; i < dto.getQuantidadeDeParcelas(); i++) {
                    Parcela parcela = new Parcela();
                    parcela.setValorParcela(valorParcela);
                    parcela.setVencimentoParcela(dto.getData().plusMonths(Long.parseLong("" + i)));
                    parcela.setNomeParcela("Parcela " + (i +1) + "/" + dto.getQuantidadeDeParcelas());
                    parcela.setDespesa(entidade);
                    parcela = parcelaRepository.save(parcela);
                    entidade.addParcela(parcela);
                }
            }
            else {
                Parcela parcela = new Parcela();
                parcela.setValorParcela(dto.getValor());
                parcela.setVencimentoParcela(dto.getData());
                parcela.setNomeParcela("À vista");
                parcela.setDespesa(entidade);
                parcela = parcelaRepository.save(parcela);
                entidade.addParcela(parcela);
            }
            entidade = despesaRepository.save(entidade);
            return new DespesaDTO(entidade);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Não encotrado");
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        authService.authenticated();
        if(!parcelaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Não encotrado");
        }
        try {
            Despesa entidade = parcelaRepository.buscarDespesaPeloIdDaParcela(id);
            entidade.setValorTotal(entidade.getValorTotal() - (parcelaRepository.findById(id).get().getValorParcela()));
            parcelaRepository.deleteById(id);
            for (int i = 0; i < entidade.getParcelas().size(); i++) {
                Parcela parcela = parcelaRepository.findById(entidade.getParcelas().get(i).getId()).get();
                parcela.setNomeParcela("Parcela " + (i + 1) + "/" + entidade.getParcelas().size());
                parcelaRepository.save(parcela);
            }
            despesaRepository.save(entidade);

            if (entidade.getParcelas().isEmpty()) {
                despesaRepository.deleteById(entidade.getId());
            }
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de integridade");
        }
    }

    public void dtoToEntity(DespesaInsertDTO dto, Despesa entidade) {
        entidade.setValorTotal(dto.getValor());
        entidade.getParcelas().clear();
        entidade.setCategoriaDespesa(categoriaDespesaRepository.findById(dto.getCategoriaDespesa().getId()).orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada")));
    }
}