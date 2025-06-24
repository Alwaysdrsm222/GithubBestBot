import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, FileText, Users, Settings, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Giveaway, CustomPage } from "@shared/schema";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"giveaways" | "pages" | "members" | "settings">("giveaways");
  
  // Form states
  const [giveawayForm, setGiveawayForm] = useState({
    title: "",
    description: "",
    prizeValue: "",
    imageUrl: "",
    durationDays: "7",
  });
  
  const [pageForm, setPageForm] = useState({
    name: "",
    slug: "",
    type: "landing",
    content: "",
    isPublished: false,
  });

  // Queries
  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  const { data: giveaways, isLoading: giveawaysLoading } = useQuery<Giveaway[]>({
    queryKey: ["/api/giveaways"],
  });

  const { data: pages, isLoading: pagesLoading } = useQuery<CustomPage[]>({
    queryKey: ["/api/pages"],
  });

  // Mutations
  const createGiveawayMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/giveaways", {
        ...data,
        prizeValue: parseInt(data.prizeValue),
        durationDays: parseInt(data.durationDays),
        isActive: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/giveaways"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      toast({
        title: "Success!",
        description: "Giveaway created successfully.",
      });
      setGiveawayForm({
        title: "",
        description: "",
        prizeValue: "",
        imageUrl: "",
        durationDays: "7",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create giveaway.",
        variant: "destructive",
      });
    },
  });

  const deleteGiveawayMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/giveaways/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/giveaways"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      toast({
        title: "Success!",
        description: "Giveaway deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete giveaway.",
        variant: "destructive",
      });
    },
  });

  const createPageMutation = useMutation({
    mutationFn: async (data: any) => {
      const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-');
      return apiRequest("POST", "/api/pages", { ...data, slug });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages"] });
      toast({
        title: "Success!",
        description: "Page created successfully.",
      });
      setPageForm({
        name: "",
        slug: "",
        type: "landing",
        content: "",
        isPublished: false,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create page.",
        variant: "destructive",
      });
    },
  });

  const handleCreateGiveaway = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giveawayForm.title || !giveawayForm.description || !giveawayForm.prizeValue) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    createGiveawayMutation.mutate(giveawayForm);
  };

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageForm.name || !pageForm.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    createPageMutation.mutate(pageForm);
  };

  const tabButtons = [
    { id: "giveaways", label: "Manage Giveaways", icon: Gift },
    { id: "pages", label: "Create Pages", icon: FileText },
    { id: "members", label: "Member Management", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold mb-6 tiger-text-gradient">Admin Dashboard</h2>
          <p className="text-xl text-gray-300">Manage giveaways, create custom pages, and control community features</p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          {/* Admin Navigation */}
          <motion.div 
            className="glass-effect rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {tabButtons.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id 
                      ? "bg-[hsl(var(--tiger-orange))] hover:bg-[hsl(var(--light-orange))]"
                      : "bg-[hsl(var(--midnight-blue))] hover:bg-[hsl(var(--dark-purple))]"
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </motion.div>
          
          {/* Tab Content */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Giveaway Management */}
            {activeTab === "giveaways" && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="glass-effect border-[hsl(var(--tiger-orange))]/50">
                    <CardHeader>
                      <CardTitle className="text-[hsl(var(--tiger-orange))] flex items-center">
                        <Plus className="w-5 h-5 mr-2" />
                        Create New Giveaway
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreateGiveaway} className="space-y-4">
                        <div>
                          <Label htmlFor="title">Giveaway Title</Label>
                          <Input
                            id="title"
                            placeholder="Enter giveaway title..."
                            value={giveawayForm.title}
                            onChange={(e) => setGiveawayForm({...giveawayForm, title: e.target.value})}
                            className="bg-[hsl(var(--dark-purple))]/50 border-[hsl(var(--tiger-orange))]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Enter giveaway description..."
                            value={giveawayForm.description}
                            onChange={(e) => setGiveawayForm({...giveawayForm, description: e.target.value})}
                            className="bg-[hsl(var(--dark-purple))]/50 border-[hsl(var(--tiger-orange))]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="prizeValue">Prize Value ($)</Label>
                          <Input
                            id="prizeValue"
                            type="number"
                            placeholder="500"
                            value={giveawayForm.prizeValue}
                            onChange={(e) => setGiveawayForm({...giveawayForm, prizeValue: e.target.value})}
                            className="bg-[hsl(var(--dark-purple))]/50 border-[hsl(var(--tiger-yellow))]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="imageUrl">Image URL (optional)</Label>
                          <Input
                            id="imageUrl"
                            placeholder="https://example.com/image.jpg"
                            value={giveawayForm.imageUrl}
                            onChange={(e) => setGiveawayForm({...giveawayForm, imageUrl: e.target.value})}
                            className="bg-[hsl(var(--dark-purple))]/50 border-[hsl(var(--light-orange))]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="duration">Duration (Days)</Label>
                          <Select 
                            value={giveawayForm.durationDays}
                            onValueChange={(value) => setGiveawayForm({...giveawayForm, durationDays: value})}
                          >
                            <SelectTrigger className="bg-[hsl(var(--dark-purple))]/50 border-[hsl(var(--light-orange))]/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Day</SelectItem>
                              <SelectItem value="3">3 Days</SelectItem>
                              <SelectItem value="7">7 Days</SelectItem>
                              <SelectItem value="14">14 Days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-[hsl(var(--tiger-orange))] hover:bg-[hsl(var(--light-orange))]"
                          disabled={createGiveawayMutation.isPending}
                        >
                          {createGiveawayMutation.isPending ? "Creating..." : "Create Giveaway"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="glass-effect border-[hsl(var(--tiger-yellow))]/50">
                    <CardHeader>
                      <CardTitle className="text-[hsl(var(--tiger-yellow))]">Current Giveaways</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {giveawaysLoading ? (
                        <div className="space-y-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse">
                              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                            </div>
                          ))}
                        </div>
                      ) : giveaways && giveaways.length > 0 ? (
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {giveaways.map((giveaway) => (
                            <div key={giveaway.id} className="p-4 bg-[hsl(var(--dark-purple))]/30 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-[hsl(var(--tiger-orange))]">{giveaway.title}</h4>
                                <div className="flex items-center gap-2">
                                  <Badge variant={giveaway.isActive ? "default" : "secondary"}>
                                    {giveaway.isActive ? "Active" : "Inactive"}
                                  </Badge>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => deleteGiveawayMutation.mutate(giveaway.id)}
                                    disabled={deleteGiveawayMutation.isPending}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">${giveaway.prizeValue} • {giveaway.entries} entries</p>
                              <p className="text-xs text-gray-500">{giveaway.description}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400">No giveaways found.</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            )}

            {/* Page Builder */}
            {activeTab === "pages" && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="glass-effect border-[hsl(var(--tiger-yellow))]/50">
                    <CardHeader>
                      <CardTitle className="text-[hsl(var(--tiger-yellow))] flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Custom Page Builder
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreatePage} className="space-y-4">
                        <div>
                          <Label htmlFor="pageName">Page Name</Label>
                          <Input
                            id="pageName"
                            placeholder="tournaments, events, rules..."
                            value={pageForm.name}
                            onChange={(e) => setPageForm({...pageForm, name: e.target.value})}
                            className="bg-[hsl(var(--dark-purple))]/50 border-[hsl(var(--tiger-yellow))]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="pageSlug">Page Slug (optional)</Label>
                          <Input
                            id="pageSlug"
                            placeholder="auto-generated from name"
                            value={pageForm.slug}
                            onChange={(e) => setPageForm({...pageForm, slug: e.target.value})}
                            className="bg-[hsl(var(--dark-purple))]/50 border-[hsl(var(--warm-yellow))]/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="pageType">Page Type</Label>
                          <Select 
                            value={pageForm.type}
                            onValueChange={(value) => setPageForm({...pageForm, type: value})}
                          >
                            <SelectTrigger className="bg-[hsl(var(--dark-purple))]/50 border-[hsl(var(--warm-yellow))]/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="landing">Landing Page</SelectItem>
                              <SelectItem value="event">Event Page</SelectItem>
                              <SelectItem value="rules">Rules Page</SelectItem>
                              <SelectItem value="tournament">Tournament Page</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="pageContent">Content</Label>
                          <Textarea
                            id="pageContent"
                            rows={4}
                            placeholder="Enter page content..."
                            value={pageForm.content}
                            onChange={(e) => setPageForm({...pageForm, content: e.target.value})}
                            className="bg-[hsl(var(--dark-purple))]/50 border-[hsl(var(--tiger-orange))]/50 resize-none"
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-[hsl(var(--tiger-yellow))] text-[hsl(var(--deep-navy))] hover:bg-[hsl(var(--warm-yellow))]"
                          disabled={createPageMutation.isPending}
                        >
                          {createPageMutation.isPending ? "Creating..." : "Create Page"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="glass-effect border-[hsl(var(--light-orange))]/50">
                    <CardHeader>
                      <CardTitle className="text-[hsl(var(--light-orange))]">Custom Pages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {pagesLoading ? (
                        <div className="space-y-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse">
                              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                            </div>
                          ))}
                        </div>
                      ) : pages && pages.length > 0 ? (
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {pages.map((page) => (
                            <div key={page.id} className="p-4 bg-[hsl(var(--dark-purple))]/30 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-[hsl(var(--tiger-yellow))]">{page.name}</h4>
                                <Badge variant={page.isPublished ? "default" : "secondary"}>
                                  {page.isPublished ? "Published" : "Draft"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-400 mb-1">/{page.slug} • {page.type}</p>
                              <p className="text-xs text-gray-500">{page.content.substring(0, 100)}...</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400">No custom pages found.</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            )}

            {/* Placeholder for other tabs */}
            {activeTab === "members" && (
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="text-[hsl(var(--tiger-orange))]">Member Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">Member management features coming soon...</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="text-[hsl(var(--tiger-orange))]">Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">Settings panel coming soon...</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
          
          {/* Management Overview */}
          {stats && (
            <motion.div
              className="glass-effect p-8 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-[hsl(var(--warm-yellow))] flex items-center">
                <div className="w-6 h-6 mr-3 bg-[hsl(var(--warm-yellow))] rounded"></div>
                Management Overview
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[hsl(var(--tiger-orange))] mb-2">
                    {stats.activeGiveaways}
                  </div>
                  <div className="text-gray-300">Active Giveaways</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[hsl(var(--tiger-yellow))] mb-2">
                    {stats.customPages}
                  </div>
                  <div className="text-gray-300">Custom Pages</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[hsl(var(--light-orange))] mb-2">
                    {stats.totalMembers.toLocaleString()}
                  </div>
                  <div className="text-gray-300">Total Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[hsl(var(--warm-yellow))] mb-2">
                    {stats.onlineMembers.toLocaleString()}
                  </div>
                  <div className="text-gray-300">Online Now</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
