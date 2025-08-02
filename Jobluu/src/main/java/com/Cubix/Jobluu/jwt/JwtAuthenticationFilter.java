package com.Cubix.Jobluu.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private ApplicationContext applicationContext;

    // Lazy loading to avoid circular dependency
    private UserDetailsService getUserDetailsService() {
        return applicationContext.getBean(UserDetailsService.class);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Get JWT token from Authorization header
        String requestHeader = request.getHeader("Authorization");
        String username = null;
        String token = null;

        if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
            token = requestHeader.substring(7); // Extract token after "Bearer "

            try {
                username = this.jwtHelper.getUsernameFromToken(token);
            } catch (IllegalArgumentException e) {
                logger.error("Illegal Argument while fetching the username!", e);
            } catch (ExpiredJwtException e) {
                logger.error("Given JWT token is expired!", e);
            } catch (MalformedJwtException e) {
                logger.error("Some changes have been done in token! Invalid Token", e);
            } catch (Exception e) {
                logger.error("Error occurred while processing JWT token", e);
            }
        } else {
            logger.debug("Invalid Header Value!");
        }

        // If we have a username and no authentication is set in SecurityContext
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            try {
                // Fetch user details from database using lazy loading
                UserDetails userDetails = getUserDetailsService().loadUserByUsername(username);

                // Validate token
                Boolean validateToken = this.jwtHelper.isTokenValid(token, userDetails.getUsername());

                if (validateToken) {
                    // Set authentication in SecurityContext
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    logger.debug("Validation failed!");
                }
            } catch (Exception e) {
                logger.error("Error loading user details", e);
            }
        }

        // Continue with the filter chain
        filterChain.doFilter(request, response);
    }
}