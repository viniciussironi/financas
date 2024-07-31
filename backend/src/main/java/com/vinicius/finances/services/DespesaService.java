package com.vinicius.finances.services;

import com.vinicius.finances.DTOs.*;
import com.vinicius.finances.entities.Usuario;
import com.vinicius.finances.entities.despesa.CategoriaDespesa;
import com.vinicius.finances.entities.despesa.Despesa;
import com.vinicius.finances.entities.despesa.Parcela;

import com.vinicius.finances.projections.DespesaProjection;
import com.vinicius.finances.projections.TotalMesProjection;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public Page<DespesaDTO> buscarDespesas(Long idCategoria, LocalDate inicio, LocalDate fim, Pageable pageable) {
        Usuario usuarioLogado = authService.authenticated();

        Page<DespesaProjection> listaBusca = despesaRepository.buscarDespesas(usuarioLogado.getId(), idCategoria, inicio, fim, pageable);
        Map<Long, Despesa> despesasMap = new HashMap<>();

        listaBusca.forEach(x -> {
            Despesa despesa = despesasMap.get(x.getId());
            if (despesa == null) {
                despesa = new Despesa();
                despesa.setId(x.getId());
                despesa.setData(x.getData());
                despesa.setValor(x.getValor());
                CategoriaDespesa categoriaDespesa = new CategoriaDespesa();
                categoriaDespesa.setId(x.getCategoriaDespesaId());
                categoriaDespesa.setNome(x.getNome());
                despesa.setCategoriaDespesa(categoriaDespesa);
                despesasMap.put(x.getId(), despesa);
            }
            if (x.getIdParcela() != null) {
                Parcela parcela = new Parcela();
                parcela.setId(x.getIdParcela());
                parcela.setDataDeVencimento(x.getDataDeVencimento());
                parcela.setValorParcela(x.getValorParcela());
                despesa.getParcelas().add(parcela);
            }
        });
        List<DespesaDTO> lista = despesasMap.values().stream().map(x -> new DespesaDTO(x)).toList();
        return new PageImpl<>(lista, listaBusca.getPageable(), listaBusca.getTotalElements());
    }

    @Transactional(readOnly = true)
    public List<TotalPorMesDTO> buscarTotalPorMes(Long id) {
        String[] meses = {"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"};

        List<TotalMesProjection> busca = despesaRepository.buscarTotalPorMes(id);
        List<TotalPorMesDTO> result = new ArrayList<>();
        busca.forEach(x -> {
            TotalPorMesDTO dto = new TotalPorMesDTO();
            dto.setMes(meses[x.getMes() - 1]);
            dto.setTotal(x.getTotal());
            result.add(dto);
        });
        return result;
    }

    @Transactional
    public DespesaDTO insert(DespesaInsertDTO dto) {
        Despesa despesa = new Despesa();
        if (dto.getE_parcelado()) {
            double valorParcela = dto.getValor() / dto.getQtdParcelas();
            for (int i = 0; i < dto.getQtdParcelas(); i++) {
                Parcela parcela = new Parcela();
                parcela.setValorParcela(valorParcela);
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
        entidade.setCategoriaDespesa(categoriaDespesaRepository.findById(dto.getCategoriaDespesa().getId()).orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada")));
    }
}