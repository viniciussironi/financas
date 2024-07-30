package com.vinicius.finances.projections;

public interface UserDetailsProjection {

    String getUsername();
    String getSenha();
    Long getRoleId();
    String getAuthority();
}
