import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGiveawaySchema, insertCustomPageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Giveaway routes
  app.get("/api/giveaways", async (req, res) => {
    try {
      const giveaways = await storage.getGiveaways();
      res.json(giveaways);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch giveaways" });
    }
  });

  app.get("/api/giveaways/active", async (req, res) => {
    try {
      const giveaways = await storage.getActiveGiveaways();
      res.json(giveaways);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch active giveaways" });
    }
  });

  app.get("/api/giveaways/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const giveaway = await storage.getGiveaway(id);
      
      if (!giveaway) {
        return res.status(404).json({ message: "Giveaway not found" });
      }
      
      res.json(giveaway);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch giveaway" });
    }
  });

  app.post("/api/giveaways", async (req, res) => {
    try {
      const validatedData = insertGiveawaySchema.parse(req.body);
      const giveaway = await storage.createGiveaway(validatedData);
      res.status(201).json(giveaway);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid giveaway data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create giveaway" });
    }
  });

  app.put("/api/giveaways/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const giveaway = await storage.updateGiveaway(id, updates);
      
      if (!giveaway) {
        return res.status(404).json({ message: "Giveaway not found" });
      }
      
      res.json(giveaway);
    } catch (error) {
      res.status(500).json({ message: "Failed to update giveaway" });
    }
  });

  app.delete("/api/giveaways/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteGiveaway(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Giveaway not found" });
      }
      
      res.json({ message: "Giveaway deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete giveaway" });
    }
  });

  // Custom page routes
  app.get("/api/pages", async (req, res) => {
    try {
      const pages = await storage.getCustomPages();
      res.json(pages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pages" });
    }
  });

  app.get("/api/pages/published", async (req, res) => {
    try {
      const pages = await storage.getPublishedPages();
      res.json(pages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch published pages" });
    }
  });

  app.get("/api/pages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const page = await storage.getCustomPage(id);
      
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      
      res.json(page);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch page" });
    }
  });

  app.get("/api/pages/slug/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      const page = await storage.getCustomPageBySlug(slug);
      
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      
      res.json(page);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch page" });
    }
  });

  app.post("/api/pages", async (req, res) => {
    try {
      const validatedData = insertCustomPageSchema.parse(req.body);
      const page = await storage.createCustomPage(validatedData);
      res.status(201).json(page);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid page data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create page" });
    }
  });

  app.put("/api/pages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const page = await storage.updateCustomPage(id, updates);
      
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      
      res.json(page);
    } catch (error) {
      res.status(500).json({ message: "Failed to update page" });
    }
  });

  app.delete("/api/pages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteCustomPage(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Page not found" });
      }
      
      res.json({ message: "Page deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete page" });
    }
  });

  // Stats endpoint for admin dashboard
  app.get("/api/stats", async (req, res) => {
    try {
      const giveaways = await storage.getGiveaways();
      const pages = await storage.getCustomPages();
      const activeGiveaways = giveaways.filter(g => g.isActive);
      
      const stats = {
        activeGiveaways: activeGiveaways.length,
        totalGiveaways: giveaways.length,
        customPages: pages.length,
        totalMembers: 1106,
        onlineMembers: 110,
        totalPrizesGiven: 50000, // Static for demo
        totalWinners: 8942, // Static for demo
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
