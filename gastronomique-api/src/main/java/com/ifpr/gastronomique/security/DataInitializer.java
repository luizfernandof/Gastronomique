package com.ifpr.gastronomique.security;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ifpr.gastronomique.security.models.ERole;
import com.ifpr.gastronomique.security.models.Role;
import com.ifpr.gastronomique.security.models.User;
import com.ifpr.gastronomique.security.repositories.RoleRepository;
import com.ifpr.gastronomique.security.repositories.UserRepository;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner initializeSecurityData(RoleRepository roles, UserRepository users,
            PasswordEncoder encoder,
            @Value("${app.admin.email:}") String email,
            @Value("${app.admin.password:}") String password,
            @Value("${app.admin.name:Administrador}") String name) {
        return args -> {
            Role adminRole = roles.findByName(ERole.ROLE_ADMIN)
                    .orElseGet(() -> roles.save(new Role(ERole.ROLE_ADMIN)));
            Role professorRole = roles.findByName(ERole.ROLE_PROFESSOR)
                    .orElseGet(() -> roles.save(new Role(ERole.ROLE_PROFESSOR)));
            if (!email.isBlank() && !password.isBlank() && !users.existsByEmail(email)) {
                User admin = new User(name, true, email, email, encoder.encode(password));
                admin.setRoles(new HashSet<>(Set.of(adminRole, professorRole)));
                users.save(admin);
            }
        };
    }
}
