package com.example.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        
        // Permitir cualquier origen para despliegue en AWS
        corsConfig.addAllowedOriginPattern("*");
        corsConfig.setAllowCredentials(false); // Debe ser false cuando se usa * como origen
        
        // Configuraciones específicas
        corsConfig.setMaxAge(3600L);
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfig.setAllowedHeaders(Arrays.asList("*"));
        
        // Exponer headers si es necesario
        corsConfig.addExposedHeader("Content-Type");
        corsConfig.addExposedHeader("X-Requested-With");
        corsConfig.addExposedHeader("accept");
        corsConfig.addExposedHeader("Origin");
        corsConfig.addExposedHeader("Access-Control-Request-Method");
        corsConfig.addExposedHeader("Access-Control-Request-Headers");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}
