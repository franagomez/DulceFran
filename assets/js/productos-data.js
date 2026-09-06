// Catálogo inicial de productos DulceFran (31 productos reales).
// Este arreglo solo se usa para "sembrar" localStorage la primera vez;
// después de eso, el CRUD del panel admin trabaja sobre localStorage.
const PRODUCTOS = [
  {
    "codigo": "SC001",
    "categoria": "Sabores Clásicos",
    "nombre": "Mini dona glaseado azúcar flor",
    "precio": 700,
    "descripcion": "Mini dona glaseado azúcar flor, hecha a mano por DulceFran. Sabor: glaseados.",
    "stock": 120,
    "stockCritico": 30
  },
  {
    "codigo": "SC002",
    "categoria": "Sabores Clásicos",
    "nombre": "Mini dona chocolate clásico",
    "precio": 750,
    "descripcion": "Mini dona chocolate clásico, hecha a mano por DulceFran. Sabor: chocolate.",
    "stock": 120,
    "stockCritico": 30
  },
  {
    "codigo": "SC003",
    "categoria": "Sabores Clásicos",
    "nombre": "Mini dona canela y azúcar",
    "precio": 700,
    "descripcion": "Mini dona canela y azúcar, hecha a mano por DulceFran. Sabor: canela.",
    "stock": 100,
    "stockCritico": 25
  },
  {
    "codigo": "SC004",
    "categoria": "Sabores Clásicos",
    "nombre": "Mini dona glaseado vainilla",
    "precio": 720,
    "descripcion": "Mini dona glaseado vainilla, hecha a mano por DulceFran. Sabor: vainilla.",
    "stock": 100,
    "stockCritico": 25
  },
  {
    "codigo": "SC005",
    "categoria": "Sabores Clásicos",
    "nombre": "Mini dona coco rallado",
    "precio": 750,
    "descripcion": "Mini dona coco rallado, hecha a mano por DulceFran. Sabor: coco.",
    "stock": 80,
    "stockCritico": 20
  },
  {
    "codigo": "SC006",
    "categoria": "Sabores Clásicos",
    "nombre": "Mini dona azúcar flor y limón",
    "precio": 710,
    "descripcion": "Mini dona azúcar flor y limón, hecha a mano por DulceFran. Sabor: azúcar flor.",
    "stock": 80,
    "stockCritico": 20
  },
  {
    "codigo": "SP001",
    "categoria": "Sabores Premium",
    "nombre": "Mini dona Nutella y avellanas",
    "precio": 1200,
    "descripcion": "Mini dona Nutella y avellanas, hecha a mano por DulceFran. Sabor: chocolate gourmet.",
    "stock": 80,
    "stockCritico": 20
  },
  {
    "codigo": "SP002",
    "categoria": "Sabores Premium",
    "nombre": "Mini dona Oreo crumble",
    "precio": 1180,
    "descripcion": "Mini dona Oreo crumble, hecha a mano por DulceFran. Sabor: galleta.",
    "stock": 70,
    "stockCritico": 15
  },
  {
    "codigo": "SP003",
    "categoria": "Sabores Premium",
    "nombre": "Mini dona red velvet cream cheese",
    "precio": 1250,
    "descripcion": "Mini dona red velvet cream cheese, hecha a mano por DulceFran. Sabor: red velvet.",
    "stock": 60,
    "stockCritico": 15
  },
  {
    "codigo": "SP004",
    "categoria": "Sabores Premium",
    "nombre": "Mini dona matcha con glaseado blanco",
    "precio": 1250,
    "descripcion": "Mini dona matcha con glaseado blanco, hecha a mano por DulceFran. Sabor: matcha.",
    "stock": 50,
    "stockCritico": 15
  },
  {
    "codigo": "SP005",
    "categoria": "Sabores Premium",
    "nombre": "Mini dona frutos rojos y crema",
    "precio": 1220,
    "descripcion": "Mini dona frutos rojos y crema, hecha a mano por DulceFran. Sabor: frutos rojos.",
    "stock": 60,
    "stockCritico": 15
  },
  {
    "codigo": "SP006",
    "categoria": "Sabores Premium",
    "nombre": "Mini dona crema de pistacho",
    "precio": 1300,
    "descripcion": "Mini dona crema de pistacho, hecha a mano por DulceFran. Sabor: pistacho.",
    "stock": 40,
    "stockCritico": 10
  },
  {
    "codigo": "SP007",
    "categoria": "Sabores Premium",
    "nombre": "Mini dona caramelo salado",
    "precio": 1220,
    "descripcion": "Mini dona caramelo salado, hecha a mano por DulceFran. Sabor: caramelo.",
    "stock": 50,
    "stockCritico": 15
  },
  {
    "codigo": "SP008",
    "categoria": "Sabores Premium",
    "nombre": "Mini dona glaseado de café y nuez",
    "precio": 1230,
    "descripcion": "Mini dona glaseado de café y nuez, hecha a mano por DulceFran. Sabor: café.",
    "stock": 40,
    "stockCritico": 10
  },
  {
    "codigo": "SR001",
    "categoria": "Sabores con Relleno",
    "nombre": "Mini dona rellena de manjar",
    "precio": 1150,
    "descripcion": "Mini dona rellena de manjar, hecha a mano por DulceFran. Sabor: manjar.",
    "stock": 60,
    "stockCritico": 15
  },
  {
    "codigo": "SR002",
    "categoria": "Sabores con Relleno",
    "nombre": "Mini dona rellena de manjar con nuez",
    "precio": 1250,
    "descripcion": "Mini dona rellena de manjar con nuez, hecha a mano por DulceFran. Sabor: manjar.",
    "stock": 40,
    "stockCritico": 10
  },
  {
    "codigo": "SR003",
    "categoria": "Sabores con Relleno",
    "nombre": "Mini dona rellena de crema pastelera",
    "precio": 1200,
    "descripcion": "Mini dona rellena de crema pastelera, hecha a mano por DulceFran. Sabor: crema pastelera.",
    "stock": 40,
    "stockCritico": 10
  },
  {
    "codigo": "SR004",
    "categoria": "Sabores con Relleno",
    "nombre": "Mini dona rellena de mermelada de frutilla",
    "precio": 1180,
    "descripcion": "Mini dona rellena de mermelada de frutilla, hecha a mano por DulceFran. Sabor: mermelada.",
    "stock": 40,
    "stockCritico": 10
  },
  {
    "codigo": "SR005",
    "categoria": "Sabores con Relleno",
    "nombre": "Mini dona rellena de ganache de chocolate",
    "precio": 1250,
    "descripcion": "Mini dona rellena de ganache de chocolate, hecha a mano por DulceFran. Sabor: chocolate.",
    "stock": 50,
    "stockCritico": 15
  },
  {
    "codigo": "SR006",
    "categoria": "Sabores con Relleno",
    "nombre": "Mini dona rellena de crema de limón",
    "precio": 1220,
    "descripcion": "Mini dona rellena de crema de limón, hecha a mano por DulceFran. Sabor: cítrico.",
    "stock": 30,
    "stockCritico": 10
  },
  {
    "codigo": "SR007",
    "categoria": "Sabores con Relleno",
    "nombre": "Mini dona rellena de mousse de maracuyá",
    "precio": 1280,
    "descripcion": "Mini dona rellena de mousse de maracuyá, hecha a mano por DulceFran. Sabor: maracuyá.",
    "stock": 30,
    "stockCritico": 10
  },
  {
    "codigo": "SR008",
    "categoria": "Sabores con Relleno",
    "nombre": "Mini dona rellena de Nutella",
    "precio": 1320,
    "descripcion": "Mini dona rellena de Nutella, hecha a mano por DulceFran. Sabor: nutella.",
    "stock": 50,
    "stockCritico": 15
  },
  {
    "codigo": "PK001",
    "categoria": "Packs y Combos",
    "nombre": "Caja 10 mini donas mixtas",
    "precio": 7900,
    "descripcion": "Caja 10 mini donas mixtas. Ideal para compartir o para eventos — pack chico.",
    "stock": 40,
    "stockCritico": 10
  },
  {
    "codigo": "PK002",
    "categoria": "Packs y Combos",
    "nombre": "Caja 24 mini donas mixtas",
    "precio": 17900,
    "descripcion": "Caja 24 mini donas mixtas. Ideal para compartir o para eventos — pack mediano.",
    "stock": 20,
    "stockCritico": 5
  },
  {
    "codigo": "PK003",
    "categoria": "Packs y Combos",
    "nombre": "Pack 100 mini donas para eventos",
    "precio": 68000,
    "descripcion": "Pack 100 mini donas para eventos. Ideal para compartir o para eventos — pack evento.",
    "stock": 6,
    "stockCritico": 2
  },
  {
    "codigo": "PK004",
    "categoria": "Packs y Combos",
    "nombre": "Torre de mini donas personalizada (50u)",
    "precio": 39000,
    "descripcion": "Torre de mini donas personalizada (50u). Ideal para compartir o para eventos — pack cumpleaños.",
    "stock": 4,
    "stockCritico": 1
  },
  {
    "codigo": "PK005",
    "categoria": "Packs y Combos",
    "nombre": "Caja mix 6 sabores premium o rellenos",
    "precio": 6900,
    "descripcion": "Caja mix 6 sabores premium o rellenos. Ideal para compartir o para eventos — degustación.",
    "stock": 15,
    "stockCritico": 5
  },
  {
    "codigo": "EX001",
    "categoria": "Extras y Personalización",
    "nombre": "Caja premium tipo regalo",
    "precio": 1900,
    "descripcion": "Caja premium tipo regalo. Complemento para personalizar tu pedido DulceFran.",
    "stock": 25,
    "stockCritico": 10
  },
  {
    "codigo": "EX002",
    "categoria": "Extras y Personalización",
    "nombre": "Topper personalizado (nombre/frase)",
    "precio": 1500,
    "descripcion": "Topper personalizado (nombre/frase). Complemento para personalizar tu pedido DulceFran.",
    "stock": 30,
    "stockCritico": 10
  },
  {
    "codigo": "EX003",
    "categoria": "Extras y Personalización",
    "nombre": "Set de velitas decorativas",
    "precio": 1600,
    "descripcion": "Set de velitas decorativas. Complemento para personalizar tu pedido DulceFran.",
    "stock": 20,
    "stockCritico": 8
  },
  {
    "codigo": "EX004",
    "categoria": "Extras y Personalización",
    "nombre": "Sticker personalizado DulceFran",
    "precio": 800,
    "descripcion": "Sticker personalizado DulceFran. Complemento para personalizar tu pedido DulceFran.",
    "stock": 50,
    "stockCritico": 15
  }
];
