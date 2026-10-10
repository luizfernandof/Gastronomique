package com.ifpr.gastronomique.security.jwt;

import static org.junit.jupiter.api.Assertions.*;
import java.util.Base64;
import java.util.Collections;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.util.ReflectionTestUtils;
import com.ifpr.gastronomique.security.services.UserDetailsImpl;

class JwtUtilsTests {
    @Test
    void signsAndValidatesTokensOnJava17() {
        JwtUtils jwt = new JwtUtils();
        ReflectionTestUtils.setField(jwt, "jwtSecret", Base64.getEncoder().encodeToString(new byte[64]));
        ReflectionTestUtils.setField(jwt, "jwtExpirationMs", 60000);
        UserDetailsImpl user = new UserDetailsImpl(1L, "admin@example.com", "admin@example.com",
                "unused", Collections.emptyList());
        String token = jwt.generateJwtToken(new UsernamePasswordAuthenticationToken(
                user, null, user.getAuthorities()));
        assertTrue(jwt.validateJwtToken(token));
        assertEquals("admin@example.com", jwt.getUserNameFromJwtToken(token));
        byte[] differentKey = new byte[64];
        differentKey[0] = 1;
        ReflectionTestUtils.setField(jwt, "jwtSecret", Base64.getEncoder().encodeToString(differentKey));
        assertFalse(jwt.validateJwtToken(token));
    }
}
