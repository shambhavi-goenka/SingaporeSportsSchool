package com.example.demo.loanpass;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

//int passId, int attractionId, int passNumber, int previousLoanBy, String description
@Configuration
public class LoanpassConfig {

    @Bean
    CommandLineRunner commandLineRunnerLoanPass(LoanpassRepository repository) {
        return args -> {
            Loanpass loanpass1 = new Loanpass(
                    1,
                    1,
                    1,
                    1,
                    "Uncollected,./Physical,./50.00,./email template here,./https://github.com/piplupOwo/piplupOwo.github.io/blob/main/resources/pip.gif?raw=true\n"
            );

            Loanpass loanpass2 = new Loanpass(
                    2,
                    2,
                    2,
                    2,
                    "Uncollected,./Physical,./50.00,./email template here,./https://github.com/piplupOwo/piplupOwo.github.io/blob/main/resources/pip.gif?raw=true\n"
            );

            Loanpass loanpass3 = new Loanpass(
                    3,
                    3,
                    3,
                    3,
                    "Uncollected,./Physical,./50.00,./email template here,./https://github.com/piplupOwo/piplupOwo.github.io/blob/main/resources/pip.gif?raw=true\n"
            );

            repository.saveAll(
                    List.of(loanpass1, loanpass2, loanpass3)
            );
        };
    }
}
