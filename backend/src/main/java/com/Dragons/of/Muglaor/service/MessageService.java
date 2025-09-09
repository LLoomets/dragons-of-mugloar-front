package com.Dragons.of.Muglaor.service;

import com.Dragons.of.Muglaor.model.Message;
import com.Dragons.of.Muglaor.model.SolvedMessage;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Comparator;
import java.util.List;

@Service
public class MessageService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String baseURL = "https://dragonsofmugloar.com/api/v2";

    public List<Message> getMessages(String gameId) {
        String url = baseURL +"/" + gameId + "/messages";
        ResponseEntity<List<Message>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        return response.getBody();
    }

    public SolvedMessage solveMessage(String gameId, String adId) {
        String realAdId = normalizeAdId(adId);
        String url = baseURL + "/" + gameId + "/solve/" + realAdId;
        return restTemplate.postForObject(url, null, SolvedMessage.class);
    }

    private String normalizeAdId(String adId) {
        if (adId == null || adId.isEmpty()) return adId;

        try {
            byte[] decodedBytes = Base64.getDecoder().decode(adId);
            String decoded = new String(decodedBytes);
            if (decoded.chars().allMatch(c -> c >= 32 && c <= 126)) {
                return decoded;
            } else {
                return adId;
            }
        } catch (IllegalArgumentException e) {
            return adId;
        }
    }

    public Message chooseMessage(List<Message> messages) {
        List<Message> filteredMessages = messages.stream()
                .filter(m -> !m.getMessage().toLowerCase().contains("steal"))
                .toList();

        if (filteredMessages.isEmpty()) {
            filteredMessages = messages;
        }

        return filteredMessages.stream()
                .max(Comparator.comparingDouble(m -> {
                    int riskLevel = getRiskLevel(m);
                    int reward = m.getReward();
                    return reward/(double) riskLevel;
                }))
                .orElse(filteredMessages.getFirst());

    }

    public int getRiskLevel(Message message) {
        if (message.getProbability() == null) return 100;

        return switch (message.getProbability()) {
            case "Sure thing" -> 1;
            case "Piece of cake" -> 5;
            case "Walk in the park" -> 10;
            case "Quite likely" -> 20;
            case "Hmmm...." -> 40;
            case "Gamble" -> 50;
            case "Risky" -> 60;
            case "Playing with fire" -> 70;
            case "Rather detrimental" -> 80;
            case "Impossible", "Suicide mission" -> 100;
            default -> 100;
        };
    }
}
