const BASE_URL = "http://localhost:8080/api";

export const startGame = async () => {
    const response = await fetch(`${BASE_URL}/start`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
    });

    if(!response.ok) throw new Error("failed to start game");

    return response.json();
}

export const getMessages = async (gameId) => {
    const response = await fetch(`${BASE_URL}/${gameId}/messages`, {
        method: "GET",
    });

    if(!response.ok) throw new Error("failed to fetch messages");
    return response.json();
}

export const getReputation = async (gameId) => {
    const response = await fetch(`${BASE_URL}/${gameId}/investigate/reputation`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
    })

    if(!response.ok) throw new Error("failed to fetch reputation");
    return response.json();
}

export const getShopItems = async (gameId) => {
    const response = await fetch(`${BASE_URL}/${gameId}/shop`, {
        method: "GET",
    })

    if(!response.ok) throw new Error("failed to fetch items");
    return response.json();
}