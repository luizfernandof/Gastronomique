package com.ifpr.gastronomique.security.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import java.util.Optional;
import java.util.Set;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import com.ifpr.gastronomique.security.models.ERole;
import com.ifpr.gastronomique.security.models.Role;
import com.ifpr.gastronomique.security.models.User;
import com.ifpr.gastronomique.security.payload.request.SignupRequest;
import com.ifpr.gastronomique.security.repositories.RoleRepository;
import com.ifpr.gastronomique.security.repositories.UserRepository;

class UserServiceTests {
    @Test
    void publicSignupCannotCreateAnActiveAdministrator() {
        UserService service = new UserService();
        UserRepository users = mock(UserRepository.class);
        RoleRepository roles = mock(RoleRepository.class);
        PasswordEncoder encoder = mock(PasswordEncoder.class);
        ReflectionTestUtils.setField(service, "repository", users);
        ReflectionTestUtils.setField(service, "roleRepository", roles);
        ReflectionTestUtils.setField(service, "encoder", encoder);
        Role professor = new Role(ERole.ROLE_PROFESSOR);
        when(roles.findByName(ERole.ROLE_PROFESSOR)).thenReturn(Optional.of(professor));
        when(encoder.encode("test-password")).thenReturn("encoded-password");
        SignupRequest request = new SignupRequest();
        request.setFullName("Teste");
        request.setEmail("professor@example.com");
        request.setPassword("test-password");
        request.setRole(Set.of("admin"));
        request.setActive(true);

        service.CadastrarNovoUsuario(request);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(users).save(captor.capture());
        assertFalse(captor.getValue().isActive());
        assertEquals(Set.of(professor), captor.getValue().getRoles());
        assertEquals(request.getEmail(), captor.getValue().getUsername());
        assertEquals("encoded-password", captor.getValue().getPassword());
    }
}
