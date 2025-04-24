package com.flippingtiles.backend.controller;

import com.flippingtiles.backend.model.Score;
import com.flippingtiles.backend.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/scores")
@CrossOrigin(origins = "http://localhost:3000")
public class ScoreController {
    @Autowired
    private ScoreRepository scoreRepository;

    @GetMapping
    public List<Score> getTopScores() {
        return scoreRepository.findTop10ByOrderByMovesAscTimeSecondsAsc();
    }

    @PostMapping
    public Score saveScore(@RequestBody Score score) {
        return scoreRepository.save(score);
    }
}
