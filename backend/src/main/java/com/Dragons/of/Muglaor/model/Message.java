package com.Dragons.of.Muglaor.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Message {
    private String adId;
    private String message;
    private int reward;
    private int expiresIn;
    private String probability;
}
