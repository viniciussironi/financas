package com.vinicius.finances.controllers;

import com.vinicius.finances.DTOs.ReceitaDTO;
import com.vinicius.finances.DTOs.TotalPorMesDTO;
import com.vinicius.finances.services.ReceitaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import java.net.URI;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "receitas")
public class ReceitaController {

    @Autowired
    private ReceitaService service;

    @GetMapping
    public  ResponseEntity<Page<ReceitaDTO>> buscarTodas(
            @RequestParam (name = "idCategoria", defaultValue = "") Long idCategoria,
            @RequestParam (name = "inicio", defaultValue = "") LocalDate inicio,
            @RequestParam (name = "fim", defaultValue = "") LocalDate fim,
            Pageable pageable) {
        return ResponseEntity.ok(service.buscarReceitas(idCategoria, inicio, fim, pageable));
    }

    @GetMapping(value = "/totalPorMes/{id}")
    public  ResponseEntity<List<TotalPorMesDTO>> buscarTotalPorMes(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarTotalPorMes(id));
    }

    @PostMapping
    public ResponseEntity<ReceitaDTO> insert(@RequestBody @Valid ReceitaDTO dto) {
        ReceitaDTO newDto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newDto.getId())
                .toUri();
        return ResponseEntity.created(uri).body(newDto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ReceitaDTO> update(@RequestBody @Valid ReceitaDTO dto, @PathVariable Long id) {
        return ResponseEntity.accepted().body(service.update(dto, id));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
