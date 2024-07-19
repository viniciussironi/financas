package com.vinicius.finances.controllers;

import com.vinicius.finances.DTOs.CategoriaDTO;
import com.vinicius.finances.DTOs.TotalPorCategoriaDTO;
import com.vinicius.finances.services.CategoriaDespesaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "categoriaDespesa")
public class CategoriaDespesaController {

    @Autowired
    private CategoriaDespesaService service;

    @GetMapping
    public ResponseEntity<List<CategoriaDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(value = "total/{id}")
    public ResponseEntity<List<TotalPorCategoriaDTO>> buscarValorTotalPorCategoria(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarValorTotalPorCategoria(id));
    }

    @PostMapping
    public ResponseEntity<CategoriaDTO> insert(@RequestBody @Valid CategoriaDTO dto) {
        CategoriaDTO newDto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newDto.getId())
                .toUri();
        return ResponseEntity.created(uri).body(newDto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<CategoriaDTO> update(@RequestBody  @Valid CategoriaDTO dto, @PathVariable Long id) {
        return ResponseEntity.accepted().body(service.update(dto, id));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
