package com.vinicius.finances.services;

import com.vinicius.finances.DTOs.ReceitaDTO;
import com.vinicius.finances.DTOs.TotalPorMesDTO;
import com.vinicius.finances.entities.receita.Receita;
import com.vinicius.finances.projections.TotalMesProjection;
import com.vinicius.finances.repositories.CategoriaReceitaRepository;
import com.vinicius.finances.repositories.ReceitaRepository;
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
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;
    @Autowired
    private CategoriaReceitaRepository categoriaReceitaRepository;

    @Transactional(readOnly = true)
    public List<ReceitaDTO> findAll(Long id) {
        return receitaRepository.buscarReceitas(id).stream().map(x -> new ReceitaDTO(x)).limit(8).toList();
    }

    @Transactional(readOnly = true)
    public List<TotalPorMesDTO> buscarTotalPorMes(Long id) {
        String[] meses = {"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"};

        List<TotalMesProjection> busca = receitaRepository.buscarTotalPorMes(id);
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
    public ReceitaDTO insert(ReceitaDTO dto) {
        Receita entidade = new Receita();
        dtoToEntity(dto, entidade);
        entidade = receitaRepository.save(entidade);
        return new ReceitaDTO(entidade);
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
        entidade.setCategoriaReceita(categoriaReceitaRepository.findById(dto.getCategoria().getId()).orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada")));
    }
}
