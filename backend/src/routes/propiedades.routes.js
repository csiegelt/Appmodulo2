import { Router } from "express";
import { prisma } from "../prisma.js";

const router = Router();

function toInt(v, def) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : def;
}

function decToString(x) {
  return x?.toString?.() ?? x ?? null;
}

// 1) LISTADO con filtros + paginación
// GET /api/propiedades?ciudad=Ancud&tipo=Parcela&operacion=Venta&estado=Disponible&min=10000000&max=50000000&page=1&limit=20&q=algo
router.get("/", async (req, res) => {
  const page = Math.max(toInt(req.query.page, 1), 1);
  const limit = Math.min(Math.max(toInt(req.query.limit, 20), 1), 100);
  const skip = (page - 1) * limit;

  const ciudad = req.query.ciudad?.toString().trim();
  const tipo = req.query.tipo?.toString().trim();
  const operacion = req.query.operacion?.toString().trim(); // Venta | Arriendo
  const estado = req.query.estado?.toString().trim();
  const q = req.query.q?.toString().trim();

  const min = req.query.min ? Number(req.query.min) : null;
  const max = req.query.max ? Number(req.query.max) : null;

  const where = {
    ...(ciudad ? { ciudad: { contains: ciudad } } : {}),
    ...(tipo ? { tipo: { contains: tipo } } : {}),
    ...(estado ? { estado: { contains: estado } } : {}),
    ...(operacion ? { tipo_operacion: operacion } : {}),
    ...(q
      ? {
          OR: [
            { direccion: { contains: q } },
            { descripcion: { contains: q } },
            { ciudad: { contains: q } },
            { tipo: { contains: q } },
          ],
        }
      : {}),
    ...(min != null || max != null
      ? {
          precio: {
            ...(min != null ? { gte: min } : {}),
            ...(max != null ? { lte: max } : {}),
          },
        }
      : {}),
  };

  const [total, data] = await Promise.all([
    prisma.propiedades.count({ where }),
    prisma.propiedades.findMany({
      where,
      skip,
      take: limit,
      orderBy: { id: "desc" },
      include: {
        imagenes_propiedad: { take: 3 }, // mini preview
        detalles_propiedad: true,
      },
    }),
  ]);

  // normaliza Decimals a string si aplica
  const out = data.map(p => ({
    ...p,
    precio: decToString(p.precio),
  }));

  res.json({ page, limit, total, data: out });
});

// 2) DETALLE COMPLETO de una propiedad (incluye relaciones)
// GET /api/propiedades/:id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const p = await prisma.propiedades.findUnique({
    where: { id },
    include: {
      imagenes_propiedad: true,
      archivos_propiedad: true,
      detalles_propiedad: true,
      propietarios: { include: { clientes: true } },
      contratos: true,
      visitas: true,
    },
  });

  if (!p) return res.status(404).json({ error: "NOT_FOUND" });

  res.json({
    ...p,
    precio: decToString(p.precio),
  });
});

// 3) CREAR propiedad
// POST /api/propiedades
router.post("/", async (req, res) => {
  const { direccion } = req.body;
  if (!direccion) return res.status(400).json({ error: "DIRECCION_REQUERIDA" });

  const creada = await prisma.propiedades.create({
    data: req.body,
  });

  res.status(201).json({ ...creada, precio: decToString(creada.precio) });
});

// 4) ACTUALIZAR propiedad
// PUT /api/propiedades/:id
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const existe = await prisma.propiedades.findUnique({ where: { id } });
  if (!existe) return res.status(404).json({ error: "NOT_FOUND" });

  const actualizada = await prisma.propiedades.update({
    where: { id },
    data: req.body,
  });

  res.json({ ...actualizada, precio: decToString(actualizada.precio) });
});

// 5) ELIMINAR propiedad
// DELETE /api/propiedades/:id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const existe = await prisma.propiedades.findUnique({ where: { id } });
  if (!existe) return res.status(404).json({ error: "NOT_FOUND" });

  await prisma.propiedades.delete({ where: { id } });
  res.json({ ok: true });
});


// ====== SUB-RECURSOS ======

// 6) Agregar una imagen a una propiedad
// POST /api/propiedades/:id/imagenes   body: { ruta_imagen: "..." }
router.post("/:id/imagenes", async (req, res) => {
  const propiedad_id = Number(req.params.id);
  const { ruta_imagen } = req.body;

  if (!ruta_imagen) return res.status(400).json({ error: "RUTA_IMAGEN_REQUERIDA" });

  const existe = await prisma.propiedades.findUnique({ where: { id: propiedad_id } });
  if (!existe) return res.status(404).json({ error: "PROPIEDAD_NOT_FOUND" });

  const img = await prisma.imagenes_propiedad.create({
    data: { propiedad_id, ruta_imagen },
  });

  res.status(201).json(img);
});

// 7) Eliminar una imagen por id
// DELETE /api/propiedades/imagenes/:imagenId
router.delete("/imagenes/:imagenId", async (req, res) => {
  const id = Number(req.params.imagenId);

  const existe = await prisma.imagenes_propiedad.findUnique({ where: { id } });
  if (!existe) return res.status(404).json({ error: "NOT_FOUND" });

  await prisma.imagenes_propiedad.delete({ where: { id } });
  res.json({ ok: true });
});

// 8) Agregar archivo a propiedad
// POST /api/propiedades/:id/archivos  body: { nombre_archivo, ruta_archivo, tipo_archivo }
router.post("/:id/archivos", async (req, res) => {
  const propiedad_id = Number(req.params.id);
  const { nombre_archivo, ruta_archivo, tipo_archivo } = req.body;

  if (!nombre_archivo || !ruta_archivo) {
    return res.status(400).json({ error: "NOMBRE_Y_RUTA_REQUERIDOS" });
  }

  const existe = await prisma.propiedades.findUnique({ where: { id: propiedad_id } });
  if (!existe) return res.status(404).json({ error: "PROPIEDAD_NOT_FOUND" });

  const file = await prisma.archivos_propiedad.create({
    data: { propiedad_id, nombre_archivo, ruta_archivo, tipo_archivo },
  });

  res.status(201).json(file);
});

// 9) Eliminar archivo por id
// DELETE /api/propiedades/archivos/:archivoId
router.delete("/archivos/:archivoId", async (req, res) => {
  const id = Number(req.params.archivoId);

  const existe = await prisma.archivos_propiedad.findUnique({ where: { id } });
  if (!existe) return res.status(404).json({ error: "NOT_FOUND" });

  await prisma.archivos_propiedad.delete({ where: { id } });
  res.json({ ok: true });
});

// 10) Setear/actualizar detalles (1 registro) para propiedad
// PUT /api/propiedades/:id/detalles  body: { dormitorios, banos, estacionamientos, metros }
router.put("/:id/detalles", async (req, res) => {
  const propiedad_id = Number(req.params.id);

  const existe = await prisma.propiedades.findUnique({ where: { id: propiedad_id } });
  if (!existe) return res.status(404).json({ error: "PROPIEDAD_NOT_FOUND" });

  // Busca si ya existe un detalle para esta propiedad
  const detalleExistente = await prisma.detalles_propiedad.findFirst({
    where: { propiedad_id },
  });

  let detalle;
  if (detalleExistente) {
    // Actualiza el existente
    detalle = await prisma.detalles_propiedad.update({
      where: { id: detalleExistente.id },
      data: req.body,
    });
  } else {
    // Crea uno nuevo
    detalle = await prisma.detalles_propiedad.create({
      data: { propiedad_id, ...req.body },
    });
  }

  res.json(detalle);
});

export default router;
