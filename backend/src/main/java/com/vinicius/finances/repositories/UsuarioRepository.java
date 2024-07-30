package com.vinicius.finances.repositories;

import com.vinicius.finances.entities.Usuario;
import com.vinicius.finances.projections.UserDetailsProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByEmail(String email);

    @Query(nativeQuery = true, value = """
			SELECT Usuarios.email AS username, Usuarios.password, Acessos.id AS roleId, Acessos.authority
			FROM Usuarios
			INNER JOIN Usuario_Acesso ON Usuarios.id = Usuario_Acesso.usuario_id
			INNER JOIN Acessos ON Acessos.id = Usuario_Acesso.acesso_id
			WHERE Usuarios.email = :email
		""")
    List<UserDetailsProjection> searchUserAndRolesByEmail(String email);
}
