package dev.itvitae.grocerystore.security.jwt;

import dev.itvitae.grocerystore.user.User;
import dev.itvitae.grocerystore.user.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@RequiredArgsConstructor
@Service
public class JWTService {

    private final UserRepository userRepository;

    @Value("${spring.jwt.secret}")
    private String JWT_SECRET;

    @Value("${spring.jwt.jwtExpirationTimeInMs}")
    private int JWT_EXPIRATION_TIME;

    public String getGeneratedToken(String username) {
        User user =
                userRepository
                        .findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException(username));
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", user.getRoles().split(","));
        return generateTokenForUser(claims, user.getId().toString());
    }

    private String generateTokenForUser(Map<String, Object> claims, String userId) {
        return Jwts.builder()
                .claims(claims)
                .subject(userId)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME))
                .signWith(getSignKey())
                .compact();
    }

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(JWT_SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsernameFromToken(String theToken) {
        return extractClaim(theToken, Claims::getSubject);
    }

    public Date extractExpirationTimeFromToken(String theToken) {
        return extractClaim(theToken, Claims::getExpiration);
    }

    public Boolean validateToken(String theToken, UserDetails userDetails) {
        final String username = extractUsernameFromToken(theToken);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(theToken));
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().verifyWith(getSignKey()).build().parseSignedClaims(token).getPayload();
    }

    private boolean isTokenExpired(String theToken) {
        return extractExpirationTimeFromToken(theToken).before(new Date());
    }
}
