import { useEffect } from 'react';
import { useFuelStore } from '../store/fuelStore';
import { parseFuelData } from '../lib/data-parser';

export function useFuelData() {
  const { setData, setLoading } = useFuelStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("🔍 Intentando cargar: /Gasolina.json");

        const response = await fetch('/Gasolina.json');
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        const json = await response.json();
        console.log("✅ JSON recibido correctamente:", json);

        const parsed = parseFuelData(json);
        console.log("💎 Datos parseados y listos:", parsed);

        setData(parsed);
      } catch (error) {
        console.error("❌ ERROR EN LA CARGA DE DATOS:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setData, setLoading]);
}