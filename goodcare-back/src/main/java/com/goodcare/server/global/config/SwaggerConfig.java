package com.goodcare.server.global.config;

import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("Good Care API Docs")
                .description("2024 AI 헬로톤 Team-07 API docs입니다.")
                .version("1.0.0");

        Server server = new Server().url("/");

        return new OpenAPI()
                .servers(List.of(server))
                .info(info);
    }
}
