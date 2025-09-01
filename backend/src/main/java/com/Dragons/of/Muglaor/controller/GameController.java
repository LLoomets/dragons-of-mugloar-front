package com.Dragons.of.Muglaor.controller;

import com.Dragons.of.Muglaor.model.*;
import com.Dragons.of.Muglaor.service.GameService;
import com.Dragons.of.Muglaor.service.ItemService;
import com.Dragons.of.Muglaor.service.MessageService;
import com.Dragons.of.Muglaor.service.ReputationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/")
public class GameController {

    private GameService gameService;
    private MessageService messageService;
    private ItemService itemService;
    private ReputationService reputationService;

    @PostMapping("/start")
    public Game startGame() {
        return gameService.startGame();
    }

    @GetMapping("/{gameId}/messages")
    public List<Message> getMessages(@PathVariable String gameId) {
        return messageService.getMessages(gameId);
    }

    @PostMapping("/{gameId}/solve/{adId}")
    public SolvedMessage solveMessage(@PathVariable String gameId, @PathVariable String adId) {
        return messageService.solveMessage(gameId, adId);
    }

    @GetMapping("/{gameId}/shop")
    public List<Item> getItems(@PathVariable String gameId) {
        return itemService.getItems(gameId);
    }

    @PostMapping("/{gameId}/shop/buy/{itemId}")
    public PurchaseResult buyItem(@PathVariable String gameId, @PathVariable String itemId) {
        return itemService.buyItem(gameId, itemId);
    }

    @PostMapping("/{gameId}/investigate/reputation")
    public Reputation getReputation(@PathVariable String gameId) {
        return reputationService.getReputation(gameId);
    }
}
