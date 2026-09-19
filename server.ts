import express from "express";
import http from "http";
import path from "path";
import { WebSocketServer } from "ws";
import { createServer as createViteServer } from "vite";
import { aiRouter } from "./server/aiRoutes";
import { setupLiveWebSocket } from "./server/liveSocket";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support large base64 payloads for image/audio AI processing
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Health check endpoint for Cloud Run deployment rollout & container probes
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "uzhavar-plus",
      timestamp: new Date().toISOString()
    });
  });

  // Mount Gemini AI endpoints
  app.use("/api/ai", aiRouter);

  // Vite middleware for development vs static dist serving in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = http.createServer(app);

  // Set up WebSocket server for Gemini 3.8 Live API real-time voice
  const wss = new WebSocketServer({ noServer: true });
  setupLiveWebSocket(wss);

  server.on("upgrade", (request, socket, head) => {
    const url = new URL(request.url || "", `http://${request.headers.host}`);
    if (url.pathname === "/api/live" || url.pathname === "/live") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    }
  });

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
