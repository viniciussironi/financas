package com.vinicius.finances.services;

import com.vinicius.finances.DTOs.CategoriaDTO;
import com.vinicius.finances.DTOs.TotalPorCategoriaDTO;
import com.vinicius.finances.entities.Usuario;
import com.vinicius.finances.entities.despesa.CategoriaDespesa;
import com.vinicius.finances.repositories.CategoriaDespesaRepository;
import com.vinicius.finances.services.exceptions.DatabaseException;
import com.vinicius.finances.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoriaDespesaService {

    @Autowired
    private CategoriaDespesaRepository categoriaDespesaRepository;
    @Autowired
    private AuthService authService;

    @Transactional(readOnly = true)
    public List<CategoriaDTO> findAll() {
        return categoriaDespesaRepository.findAll().stream().map(x -> new CategoriaDTO(x)).toList();
    }

    @Transactional(readOnly = true)
    public List<TotalPorCategoriaDTO> buscarValorTotalPorCategoria() {
        Usuario usuarioLogado = authService.authenticated();

        return categoriaDespesaRepository.buscarValorTotalPorCategoria(usuarioLogado.getId()).stream().map(x -> new TotalPorCategoriaDTO(x.getId(), x.getNome(), x.getTotal())).toList();
    }

    @Transactional
    public CategoriaDTO insert(CategoriaDTO dto) {
        CategoriaDespesa entidade = new CategoriaDespesa();
        dtoParaEntidade(dto, entidade);
        entidade = categoriaDespesaRepository.save(entidade);
        return  new CategoriaDTO(entidade);
    }

    @Transactional
    public CategoriaDTO update(CategoriaDTO dto, Long id) {
        try {
            CategoriaDespesa entidade = categoriaDespesaRepository.getReferenceById(id);
            dtoParaEntidade(dto, entidade);
            entidade = categoriaDespesaRepository.save(entidade);
            return  new CategoriaDTO(entidade);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Não encotrado");
        }
    }

    public void delete(Long id) {
        if(!categoriaDespesaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Não encotrado");
        }
        try {
            categoriaDespesaRepository.deleteById(id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de integridade");
        }
    }



    public void dtoParaEntidade(CategoriaDTO dto, CategoriaDespesa entidade) {
        entidade.setNome(dto.getNome());
    }
}
