import express from "express";
import propiedadesRoutes from "./routes/propiedades.routes.js";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api/propiedades", propiedadesRoutes);

app.listen(3001, () => console.log("API en http://localhost:3001"));
