package com.vinicius.finances.controllers;

import com.vinicius.finances.DTOs.ReceitaDTO;
import com.vinicius.finances.services.ReceitaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "receitas")
public class ReceitaController {

    @Autowired
    private ReceitaService service;

    @GetMapping(value = "/{id}")
    public  ResponseEntity<List<ReceitaDTO>> findAll(@PathVariable Long id) {
        return ResponseEntity.ok(service.findAll(id));
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
