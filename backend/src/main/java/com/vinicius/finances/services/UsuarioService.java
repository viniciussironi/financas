package com.vinicius.finances.services;

import com.vinicius.finances.DTOs.UsuarioDTO;
import com.vinicius.finances.DTOs.UsuarioInserirDTO;
import com.vinicius.finances.entities.Acesso;
import com.vinicius.finances.entities.Usuario;
import com.vinicius.finances.projections.UserDetailsProjection;
import com.vinicius.finances.repositories.AcessoRepository;
import com.vinicius.finances.repositories.UsuarioRepository;
import com.vinicius.finances.services.exceptions.DatabaseException;
import com.vinicius.finances.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private AcessoRepository acessoRepository;
    @Autowired
    private AuthService authService;

    
    @Transactional(readOnly = true)
    public UsuarioDTO getMe() {
        return new UsuarioDTO(authService.authenticated());
    }

    @Transactional
    public UsuarioDTO insert(UsuarioInserirDTO dto) {
        Usuario entidade = new Usuario();
        dtoToEntity(dto, entidade);


        entidade.setSenha(passwordEncoder.encode(dto.getSenha()));
        entidade = usuarioRepository.save(entidade);
        return new UsuarioDTO(entidade);
    }

    @Transactional
    public UsuarioDTO update(UsuarioInserirDTO dto) {
        Usuario entity = authService.authenticated();
        try {
            dtoToEntity(dto, entity);
            entity = usuarioRepository.save(entity);
            return new UsuarioDTO(entity);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Usuário não encotrado");
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        if(!usuarioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usuário não encotrado");
        }
        try {
            usuarioRepository.deleteById(id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de integridade");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        List<UserDetailsProjection> result = usuarioRepository.searchUserAndRolesByEmail(username);
        if (result.size() == 0) {
            throw new UsernameNotFoundException("Email not found");
        }

        Usuario usuario = new Usuario();
        usuario.setEmail(result.get(0).getUsername());
        usuario.setSenha(result.get(0).getPassword());
        return usuario;
    }

    public void dtoToEntity(UsuarioDTO dto, Usuario entidade) {
        entidade.setNome(dto.getNome());
        entidade.setSobrenome(dto.getSobrenome());
        entidade.setEmail(dto.getEmail());
    }
}
