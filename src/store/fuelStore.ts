import { create } from 'zustand'

interface FuelState {
  metadata: any | null;
  globalStats: any | null;
  vehicles: any[];
  selectedVehicleId: number | null;
  isLoading: boolean;
  setData: (data: any) => void;
  selectVehicle: (id: number | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useFuelStore = create<FuelState>((set) => ({
  metadata: null,
  globalStats: null,
  vehicles: [],
  selectedVehicleId: null,
  isLoading: true,
  setData: (data) => set({ 
    metadata: data.metadata, 
    globalStats: data.globalStats, 
    vehicles: data.vehicles,
    isLoading: false 
  }),
  selectVehicle: (id) => set({ selectedVehicleId: id }),
  setLoading: (loading) => set({ isLoading: loading }),
}))