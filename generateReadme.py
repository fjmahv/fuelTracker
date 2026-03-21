import os

def generate():
    # Usamos una variable para inyectar los backticks y no romper el Markdown del chat
    b3 = "```"
    
    readme_content = f"""# FuelTracker Pro 📊🚗

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-4.5-orange?style=for-the-badge)

FuelTracker Pro es una aplicación web analítica diseñada para visualizar y gestionar estadísticas de consumo, costes y telemetría de una flota de vehículos. Desarrollada con un enfoque estricto en la **precisión de los datos** y una interfaz oscura (Dark UI) altamente profesional y responsiva.

## ✨ Características Principales

* **Dashboard Global de Flota:** KPIs consolidados que muestran kilometraje total, volumen de litros, inversión económica, promedios de consumo y velocidad global.
* **Fichas de Vehículo Detalladas:** Análisis aislado por coche, calculando con precisión decimal sus años de vida útil, su promedio real de kilómetros anuales y la media de km entre repostajes.
* **Procesamiento de Datos Determinista:** El motor interno (`data-parser`) no asume datos. Utiliza fechas exactas de primer y último repostaje y velocidades medias reales (ignorando meses sin telemetría) para ofrecer cálculos matemáticamente impecables.
* **Visualización Avanzada:** Gráficos interactivos construidos con Recharts para analizar la evolución anual (Kilómetros vs. Consumo) y simulaciones de Eficiencia por Rango de Velocidad.
* **UI/UX Premium:** Diseño *Mobile-First* que adapta las cuadrículas de datos y gráficos desde pantallas móviles hasta monitores de escritorio, garantizando que elementos clave (como el footer) permanezcan siempre en su sitio correcto.

## 🛠️ Stack Tecnológico

* **Frontend Framework:** React 18+
* **Lenguaje:** TypeScript (Tipado estático robusto)
* **Build Tool:** Vite (Tiempos de carga y HMR ultrarrápidos)
* **Estilos:** TailwindCSS (Custom configuration para Dark Mode basado en `slate-950`)
* **Gestor de Estado:** Zustand (Estado global ligero y sin boilerplate)
* **Gráficos:** Recharts
* **Iconografía:** Lucide React

## 🚀 Instalación y Uso Local

Sigue estos pasos para desplegar el proyecto en tu entorno local:

1. **Clona el repositorio:**
   {b3}bash
   git clone https://github.com/fjmahv/fuelTracker.git
   cd fuelTracker
   {b3}

2. **Instala las dependencias:**
   {b3}bash
   npm install
   {b3}

3. **Inicia el servidor de desarrollo:**
   {b3}bash
   npm run dev
   {b3}

4. **Abre la aplicación:**
   Visita `http://localhost:5173` en tu navegador.

## 🗂️ Estructura de Datos

La aplicación se alimenta de un archivo estático ubicado en `public/Gasolina.json`. El motor requiere que el JSON mantenga una estructura determinista con la siguiente información clave por vehículo:

* `total_km`, `total_litres`, `total_cost`, `total_refuels`.
* `first_refuel_date` y `last_refuel_date` (Para el cálculo exacto de años de vida útil).
* `lifetime_average_speed_km_per_h` (Velocidad media histórica excluyendo paradas).
* Nodos `yearly_history` y `monthly_history` para la renderización de los gráficos.

## 👨‍💻 Autor

Creado y mantenido por **[fjmahv](https://github.com/fjmahv)**.
"""

    try:
        with open("README.md", "w", encoding="utf-8") as f:
            f.write(readme_content)
        print("✅ Archivo README.md generado correctamente.")
    except Exception as e:
        print(f"❌ Error al generar el archivo: {e}")

if __name__ == "__main__":
    generate()