export const mockData = {
  potreros: [
    { id: 1, nombre: "Potrero Norte", hectareas: 45, tipo_pasto: "Brachiaria brizantha",
      estado: "descanso", dias_restantes_recuperacion: 18, biomasa_kg_ha: 2800 },
    { id: 2, nombre: "La Sabana", hectareas: 32, tipo_pasto: "Pasto Mombaza",
      estado: "ocupado", dias_restantes_recuperacion: 0, biomasa_kg_ha: 1200 },
    { id: 3, nombre: "El Remanso", hectareas: 58, tipo_pasto: "Estrella Africana",
      estado: "descanso", dias_restantes_recuperacion: 24, biomasa_kg_ha: 3100 },
    { id: 4, nombre: "Potrero Sur", hectareas: 28, tipo_pasto: "Pasto Humidícola",
      estado: "critico", dias_restantes_recuperacion: 5, biomasa_kg_ha: 600 },
    { id: 5, nombre: "La Cañada", hectareas: 41, tipo_pasto: "Brachiaria decumbens",
      estado: "descanso", dias_restantes_recuperacion: 31, biomasa_kg_ha: 3400 },
    { id: 6, nombre: "El Monte", hectareas: 37, tipo_pasto: "Pasto Guinea",
      estado: "ocupado", dias_restantes_recuperacion: 0, biomasa_kg_ha: 900 },
  ],
  lotes_ganado: [
    { id: "L-01", raza: "Brahman x Simmental", cabezas: 48,
      peso_promedio_kg: 380, consumo_diario_pct: 0.03 },
    { id: "L-02", raza: "Nelore Puro", cabezas: 34,
      peso_promedio_kg: 420, consumo_diario_pct: 0.025 },
  ],
  metricas_globales: {
    capacidad_carga_ua_ha: 1.4,
    biomasa_estimada_ton: 186,
    eficiencia_pastoreo_pct: 72,
    dias_rotacion_promedio: 28,
    carbono_secuestrado_ton: 12.4,
  },
};