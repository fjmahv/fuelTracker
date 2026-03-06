import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { KPIGrid } from '../components/dashboard/KPIGrid';
import { VehicleCards } from '../components/dashboard/VehicleCards';
import { VehicleDetail } from '../components/detail/VehicleDetail';
import { useFuelStore } from '../store/fuelStore';
import { useFuelData } from '../hooks/use-fuel-data';

export default function HomePage() {
  useFuelData();
  const { selectedVehicleId, isLoading } = useFuelStore();

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-slate-950 text-cyan-500 font-mono">
      Cargando sistema de gestión...
    </div>
  );

  return (
    // 'flex flex-col min-h-screen' es la clave para el footer
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
      <Header />
      
      {/* 'flex-grow' empuja al footer hacia el final */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {!selectedVehicleId ? (
          <>

            
            <KPIGrid />
            
            <div className="mt-12 mb-6">
              <h3 className="text-xl font-bold text-white">Vehículos en el Garaje</h3>
            </div>
            
            <VehicleCards />
          </>
        ) : (
          <VehicleDetail />
        )}
      </main>

      <Footer />
    </div>
  );
}