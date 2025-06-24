import { users, giveaways, customPages, type User, type InsertUser, type Giveaway, type InsertGiveaway, type CustomPage, type InsertCustomPage } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Giveaway methods
  getGiveaways(): Promise<Giveaway[]>;
  getActiveGiveaways(): Promise<Giveaway[]>;
  getGiveaway(id: number): Promise<Giveaway | undefined>;
  createGiveaway(giveaway: InsertGiveaway): Promise<Giveaway>;
  updateGiveaway(id: number, updates: Partial<Giveaway>): Promise<Giveaway | undefined>;
  deleteGiveaway(id: number): Promise<boolean>;
  
  // Custom page methods
  getCustomPages(): Promise<CustomPage[]>;
  getPublishedPages(): Promise<CustomPage[]>;
  getCustomPage(id: number): Promise<CustomPage | undefined>;
  getCustomPageBySlug(slug: string): Promise<CustomPage | undefined>;
  createCustomPage(page: InsertCustomPage): Promise<CustomPage>;
  updateCustomPage(id: number, updates: Partial<CustomPage>): Promise<CustomPage | undefined>;
  deleteCustomPage(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private giveaways: Map<number, Giveaway>;
  private customPages: Map<number, CustomPage>;
  private currentUserId: number;
  private currentGiveawayId: number;
  private currentPageId: number;

  constructor() {
    this.users = new Map();
    this.giveaways = new Map();
    this.customPages = new Map();
    this.currentUserId = 1;
    this.currentGiveawayId = 1;
    this.currentPageId = 1;
    
    // Initialize with some demo giveaways
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create sample giveaways
    const sampleGiveaways: InsertGiveaway[] = [
      {
        title: "Ultimate Gaming Bundle",
        description: "Win a complete gaming setup including mechanical keyboard, gaming mouse, headset, and $200 Steam gift card!",
        prizeValue: 500,
        imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        durationDays: 2,
        isActive: true,
      },
      {
        title: "Discord Nitro + Games",
        description: "1-year Discord Nitro subscription plus 5 AAA games of your choice from our curated list!",
        prizeValue: 300,
        imageUrl: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        durationDays: 5,
        isActive: true,
      }
    ];

    sampleGiveaways.forEach(giveaway => {
      this.createGiveaway(giveaway);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Giveaway methods
  async getGiveaways(): Promise<Giveaway[]> {
    return Array.from(this.giveaways.values());
  }

  async getActiveGiveaways(): Promise<Giveaway[]> {
    return Array.from(this.giveaways.values()).filter(g => g.isActive);
  }

  async getGiveaway(id: number): Promise<Giveaway | undefined> {
    return this.giveaways.get(id);
  }

  async createGiveaway(insertGiveaway: InsertGiveaway): Promise<Giveaway> {
    const id = this.currentGiveawayId++;
    const giveaway: Giveaway = {
      ...insertGiveaway,
      id,
      entries: Math.floor(Math.random() * 5000) + 500, // Random entries for demo
      createdAt: new Date(),
    };
    this.giveaways.set(id, giveaway);
    return giveaway;
  }

  async updateGiveaway(id: number, updates: Partial<Giveaway>): Promise<Giveaway | undefined> {
    const giveaway = this.giveaways.get(id);
    if (!giveaway) return undefined;
    
    const updated = { ...giveaway, ...updates };
    this.giveaways.set(id, updated);
    return updated;
  }

  async deleteGiveaway(id: number): Promise<boolean> {
    return this.giveaways.delete(id);
  }

  // Custom page methods
  async getCustomPages(): Promise<CustomPage[]> {
    return Array.from(this.customPages.values());
  }

  async getPublishedPages(): Promise<CustomPage[]> {
    return Array.from(this.customPages.values()).filter(p => p.isPublished);
  }

  async getCustomPage(id: number): Promise<CustomPage | undefined> {
    return this.customPages.get(id);
  }

  async getCustomPageBySlug(slug: string): Promise<CustomPage | undefined> {
    return Array.from(this.customPages.values()).find(p => p.slug === slug);
  }

  async createCustomPage(insertPage: InsertCustomPage): Promise<CustomPage> {
    const id = this.currentPageId++;
    const page: CustomPage = {
      ...insertPage,
      id,
      createdAt: new Date(),
    };
    this.customPages.set(id, page);
    return page;
  }

  async updateCustomPage(id: number, updates: Partial<CustomPage>): Promise<CustomPage | undefined> {
    const page = this.customPages.get(id);
    if (!page) return undefined;
    
    const updated = { ...page, ...updates };
    this.customPages.set(id, updated);
    return updated;
  }

  async deleteCustomPage(id: number): Promise<boolean> {
    return this.customPages.delete(id);
  }
}

export const storage = new MemStorage();
