// Axios
import { apiGet } from '../../../core/apiCall';
import { BR, SBR } from '../../../core/BaseResponse';

const URL = 'master';

const ENDPOINTS = {
  reset_cache: `${URL}/reset_cache`,

  // vehicle cache
  vehicle_cache: (id: string): string => `${URL}/vehicle/cache/${id}`,
  vehicle_cache_count: (id: string): string => `${URL}/vehicle/cache_count/${id}`,
  vehicle_cache_child: (id: string): string => `${URL}/vehicle/cache_child/${id}`,

  // user cache
  user_cache: (id: string): string => `${URL}/user/cache/${id}`,
  user_cache_count: (id: string): string => `${URL}/user/cache_count/${id}`,

  // tyre cache
  tyre_cache: (id: string): string => `${URL}/tyre/cache/${id}`,
  tyre_cache_count: (id: string): string => `${URL}/tyre/cache_count/${id}`,

  // trip cache
  trip_cache: (id: string): string => `${URL}/trip/cache/${id}`,

  // spare_part cache
  spare_part_cache: (id: string): string => `${URL}/spare_parts/cache/${id}`,
  spare_part_cache_count: (id: string): string => `${URL}/spare_parts/cache_count/${id}`,

  // organisation cache
  organisation_cache: (id: string): string => `${URL}/organisation/cache/${id}`,
  organisation_cache_count: (id: string): string => `${URL}/organisation/cache_count/${id}`,
  organisation_cache_child: (id: string): string => `${URL}/organisation/cache_child/${id}`,

  // main cache
  main_cache: (id: string): string => `${URL}/main/cache/${id}`,

  // fleet cache
  fleet_cache: (id: string): string => `${URL}/fleet/cache/${id}`,

  // expense cache
  expense_cache: (id: string): string => `${URL}/expense/cache/${id}`,

  // bus cache
  bus_cache: (id: string): string => `${URL}/bus/cache/${id}`,
  bus_cache_count: (id: string): string => `${URL}/bus/cache_count/${id}`,
};

// VehicleAllCache Interface
export interface VehicleAllCache extends Record<string, unknown> {
}

// UserAllCache Interface
export interface UserAllCache extends Record<string, unknown> {
}

// TyreAllCache Interface
export interface TyreAllCache extends Record<string, unknown> {
}

// TripAllCache Interface
export interface TripAllCache extends Record<string, unknown> {
}

// SparePartAllCache Interface
export interface SparePartAllCache extends Record<string, unknown> {
}

// OrganisationAllCache Interface
export interface OrganisationAllCache extends Record<string, unknown> {
}

// MainAllCache Interface
export interface MainAllCache extends Record<string, unknown> {
}

// FleetAllCache Interface
export interface FleetAllCache extends Record<string, unknown> {
}

// ExpenseAllCache Interface
export interface ExpenseAllCache extends Record<string, unknown> {
}

// BusAllCache Interface
export interface BusAllCache extends Record<string, unknown> {
  // MasterStream: MasterStream[];
  // MasterYear: MasterYear[];
}

// Cache APIs
export const reset_cache_master = async (): Promise<SBR> => {
  return apiGet<SBR>(ENDPOINTS.reset_cache);
};

// Vehicle Cache APIs
export const vehicle_cache = async (id: string): Promise<BR<VehicleAllCache>> => {
  return apiGet<BR<VehicleAllCache>>(ENDPOINTS.vehicle_cache(id));
};

export const vehicle_cache_count = async (id: string): Promise<BR<VehicleAllCache>> => {
  return apiGet<BR<VehicleAllCache>>(ENDPOINTS.vehicle_cache_count(id));
};

export const vehicle_cache_child = async (id: string): Promise<BR<VehicleAllCache>> => {
  return apiGet<BR<VehicleAllCache>>(ENDPOINTS.vehicle_cache_child(id));
};

// User Cache APIs
export const user_cache = async (id: string): Promise<BR<UserAllCache>> => {
  return apiGet<BR<UserAllCache>>(ENDPOINTS.user_cache(id));
};

export const user_cache_count = async (id: string): Promise<BR<UserAllCache>> => {
  return apiGet<BR<UserAllCache>>(ENDPOINTS.user_cache_count(id));
};

// Tyre Cache APIs
export const tyre_cache = async (id: string): Promise<BR<TyreAllCache>> => {
  return apiGet<BR<TyreAllCache>>(ENDPOINTS.tyre_cache(id));
};

export const tyre_cache_count = async (id: string): Promise<BR<TyreAllCache>> => {
  return apiGet<BR<TyreAllCache>>(ENDPOINTS.tyre_cache_count(id));
};

// Trip Cache APIs
export const trip_cache = async (id: string): Promise<BR<TripAllCache>> => {
  return apiGet<BR<TripAllCache>>(ENDPOINTS.trip_cache(id));
};

// SparePart Cache APIs
export const spare_part_cache = async (id: string): Promise<BR<SparePartAllCache>> => {
  return apiGet<BR<SparePartAllCache>>(ENDPOINTS.spare_part_cache(id));
};

export const spare_part_cache_count = async (id: string): Promise<BR<SparePartAllCache>> => {
  return apiGet<BR<SparePartAllCache>>(ENDPOINTS.spare_part_cache_count(id));
};

// Organisation Cache APIs
export const organisation_cache = async (id: string): Promise<BR<OrganisationAllCache>> => {
  return apiGet<BR<OrganisationAllCache>>(ENDPOINTS.organisation_cache(id));
};

export const organisation_cache_count = async (id: string): Promise<BR<OrganisationAllCache>> => {
  return apiGet<BR<OrganisationAllCache>>(ENDPOINTS.organisation_cache_count(id));
};

export const organisation_cache_child = async (id: string): Promise<BR<OrganisationAllCache>> => {
  return apiGet<BR<OrganisationAllCache>>(ENDPOINTS.organisation_cache_child(id));
};

// Main Cache APIs
export const main_cache = async (id: string): Promise<BR<MainAllCache>> => {
  return apiGet<BR<MainAllCache>>(ENDPOINTS.main_cache(id));
};

// Fleet Cache APIs
export const fleet_cache = async (id: string): Promise<BR<FleetAllCache>> => {
  return apiGet<BR<FleetAllCache>>(ENDPOINTS.fleet_cache(id));
};

// Expense Cache APIs
export const expense_cache = async (id: string): Promise<BR<ExpenseAllCache>> => {
  return apiGet<BR<ExpenseAllCache>>(ENDPOINTS.expense_cache(id));
};

// Bus Cache APIs
export const bus_cache = async (id: string): Promise<BR<BusAllCache>> => {
  return apiGet<BR<BusAllCache>>(ENDPOINTS.bus_cache(id));
};

export const bus_cache_count = async (id: string): Promise<BR<BusAllCache>> => {
  return apiGet<BR<BusAllCache>>(ENDPOINTS.bus_cache_count(id));
};