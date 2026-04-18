export function parseFuelData(jsonData: any) {
  const globalFirstStr = jsonData.metadata?.data_period?.first_refuel;
  const globalLastStr = jsonData.metadata?.data_period?.last_refuel;
  
  const gFirstDate = new Date(globalFirstStr).getTime();
  const gLastDate = new Date(globalLastStr).getTime();
  const globalYears = parseFloat(((gLastDate - gFirstDate) / (1000 * 3600 * 24 * 365.25)).toFixed(1));

  const processedVehicles = jsonData.vehicles.map((v: any) => {
    const stats = v.total_statistics;
    const comparison = stats.recent_refuels_comparison || {};

    const latest = comparison.last_refuel || {};
    const avg3 = comparison.last_3_refuels_average || {};
    const historical = comparison.historical_month_average || {};

    // 2. Fechas y años deterministas
    const vFirstDate = new Date(stats.first_refuel_date).getTime();
    const vLastDate = new Date(stats.last_refuel_date).getTime();
    let vYearsOfData = parseFloat(((vLastDate - vFirstDate) / (1000 * 3600 * 24 * 365.25)).toFixed(1)) || 0.1;

    const speedData = stats.consumption_by_speed_range
      ?.filter((item: any) => item.average_consumption > 0) || [];

    return {
      ...v,
      speedData,
      recentComparison: {
        latest: {
          consumption: latest.consumption ?? 0,
          speed: latest.speed ?? 0,
          distance_km: latest.distance_km ?? 0,
          date: latest.date ?? null
        },
        avg3: {
          consumption: avg3.consumption ?? 0,
          speed: avg3.speed ?? 0,
          distance_km: avg3.distance_km ?? 0,
          refuels_count: avg3.refuels_count ?? 0
        },
        historical: {
          consumption: historical.consumption ?? 0,
          speed: historical.speed ?? 0,
          distance_km: historical.distance_km ?? 0,
          refuels_count: historical.refuels_count ?? 0,
          monthName: historical.month_name ?? 'Mes',
          monthId: historical.month_id ?? null
        }
      },
      total_statistics: {
        ...stats,
        yearsOfData: vYearsOfData,
        average_speed_km_per_h: stats.lifetime_average_speed_km_per_h || null
      }
    };
  });

  return {
    metadata: { ...jsonData.metadata, firstRefuel: globalFirstStr, lastRefuel: globalLastStr, yearsOfData: globalYears },
    globalStats: jsonData.global_statistics.all_vehicles,
    vehicles: processedVehicles
  };
}
