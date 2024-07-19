package com.vinicius.finances.services;

import com.vinicius.finances.DTOs.CategoriaDTO;
import com.vinicius.finances.DTOs.TotalPorCategoriaDTO;
import com.vinicius.finances.entities.receita.CategoriaReceita;
import com.vinicius.finances.repositories.CategoriaReceitaRepository;
import com.vinicius.finances.services.exceptions.DatabaseException;
import com.vinicius.finances.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoriaReceitaService {

    @Autowired
    private CategoriaReceitaRepository categoriaReceitaRepository;

    @Transactional(readOnly = true)
    public List<CategoriaDTO> findAll() {
        return categoriaReceitaRepository.findAll().stream().map(x -> new CategoriaDTO(x)).toList();
    }

    @Transactional(readOnly = true)
    public List<TotalPorCategoriaDTO> buscarValorTotalPorCategoria(Long id) {
        return categoriaReceitaRepository.buscarValorTotalPorCategoria(id).stream().map(x -> new TotalPorCategoriaDTO(x.getId(), x.getNome(), x.getTotal())).toList();
    }

    @Transactional
    public CategoriaDTO insert(CategoriaDTO dto) {
        CategoriaReceita entidade = new CategoriaReceita();
        dtoParaEntidade(dto, entidade);
        entidade = categoriaReceitaRepository.save(entidade);
        return  new CategoriaDTO(entidade);
    }

    @Transactional
    public CategoriaDTO update(CategoriaDTO dto, Long id) {
        try {
            CategoriaReceita entidade = categoriaReceitaRepository.getReferenceById(id);
            dtoParaEntidade(dto, entidade);
            entidade = categoriaReceitaRepository.save(entidade);
            return  new CategoriaDTO(entidade);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Não encotrado");
        }
    }

    public void delete(Long id) {
        if(!categoriaReceitaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Não encotrado");
        }
        try {
            categoriaReceitaRepository.deleteById(id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de integridade");
        }
    }



    public void dtoParaEntidade(CategoriaDTO dto, CategoriaReceita entidade) {
        entidade.setNome(dto.getNome());
    }
}
