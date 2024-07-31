package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.Usuario;
import com.vinicius.finances.projections.UserDetailsProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByEmail(String email);

    @Query(nativeQuery = true, value = """
			SELECT usuarios.email AS username, usuarios.senha AS password
			FROM usuarios
			WHERE usuarios.email = :email
		""")
    List<UserDetailsProjection> searchUserAndRolesByEmail(String email);
}
