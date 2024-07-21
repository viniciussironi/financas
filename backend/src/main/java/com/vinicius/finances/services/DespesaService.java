package com.vinicius.finances.services;

import com.vinicius.finances.DTOs.DespesaDTO;
import com.vinicius.finances.DTOs.DespesaInsertDTO;
import com.vinicius.finances.DTOs.TotalPorMesDTO;
import com.vinicius.finances.entities.despesa.Despesa;
import com.vinicius.finances.entities.despesa.Parcela;
import com.vinicius.finances.projections.TotalMesProjection;
import com.vinicius.finances.repositories.CategoriaDespesaRepository;
import com.vinicius.finances.repositories.DespesaRepository;
import com.vinicius.finances.repositories.ParcelaRepository;
import com.vinicius.finances.services.exceptions.DatabaseException;
import com.vinicius.finances.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional(readOnly = true)
    public List<DespesaDTO> findAll(Long id) {
        return despesaRepository.buscarDespesas(id).stream().map(x -> new DespesaDTO(x)).limit(8).toList();
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