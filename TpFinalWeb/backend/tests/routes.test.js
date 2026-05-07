import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Cake App fonctionne!" });
});

app.post("/api/orders", (req, res) => {
  res.status(201).json(req.body);
});

describe("routes Express", () => {
  it("GET / devrait retourner le message de l'API", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("API Cake App fonctionne!");
  });

  it("POST /api/orders devrait créer une commande", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({
        email: "test@test.com",
        items: [],
        total: 0
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe("test@test.com");
  });
});