import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../models/gateau.js", () => {
  return {
    default: {
      find: vi.fn(),
      findById: vi.fn()
    }
  };
});

import Gateau from "../models/gateau.js";
import { getGateaux, getGateauById } from "../controllers/gateaux-controller.js";

describe("gateaux-controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait retourner tous les gâteaux", async () => {
    const fauxGateaux = [
      { size: "6 pouces", saveur: "vanille", filling: "fraise", prix: 60 },
      { size: "8 pouces", saveur: "chocolat", filling: "nutella", prix: 85 }
    ];

    Gateau.find.mockResolvedValue(fauxGateaux);

    const req = {};
    const res = {
      json: vi.fn()
    };

    await getGateaux(req, res);

    expect(Gateau.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(fauxGateaux);
  });

  it("devrait retourner un gâteau par id", async () => {
    const fauxGateau = {
      _id: "123",
      size: "6 pouces",
      saveur: "vanille",
      filling: "fraise",
      prix: 60
    };

    Gateau.findById.mockResolvedValue(fauxGateau);

    const req = {
      params: { id: "123" }
    };

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis()
    };

    await getGateauById(req, res);

    expect(Gateau.findById).toHaveBeenCalledWith("123");
    expect(res.json).toHaveBeenCalledWith(fauxGateau);
  });

  it("devrait retourner 404 si le gâteau est introuvable", async () => {
    Gateau.findById.mockResolvedValue(null);

    const req = {
      params: { id: "999" }
    };

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis()
    };

    await getGateauById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Gâteau introuvable."
    });
  });
});