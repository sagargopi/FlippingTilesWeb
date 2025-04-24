package com.flippingtiles.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String playerName;
    private int moves;
    private int timeSeconds;
    private LocalDateTime playedAt;

    @PrePersist
    public void prePersist() {
        playedAt = LocalDateTime.now();
    }
}
