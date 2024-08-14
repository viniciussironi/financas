package com.vinicius.finances.controllers;

import com.vinicius.finances.DTOs.DespesaInsertDTO;
import com.vinicius.finances.DTOs.UsuarioDTO;
import com.vinicius.finances.DTOs.UsuarioInserirDTO;
import com.vinicius.finances.entities.Usuario;
import com.vinicius.finances.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<UsuarioDTO> getMe() {
        return ResponseEntity.ok(usuarioService.getMe());
    }

    @PostMapping(value = "inserir")
    public ResponseEntity<UsuarioDTO> insert(@RequestBody @Valid UsuarioInserirDTO dto) {
        return ResponseEntity.ok(usuarioService.insert(dto));
    }

    @PutMapping(value = "atualizar")
    public ResponseEntity<UsuarioDTO> update(@RequestBody @Valid UsuarioInserirDTO dto) {
        return ResponseEntity.ok(usuarioService.update(dto));
    }
}
