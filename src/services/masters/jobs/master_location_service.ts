// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterLocation } from 'src/core/Models';
import { MasterLocationDTO, MasterLocationQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/jobs/location';

const ENDPOINTS = {
  // MasterLocation APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterLocation Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterLocation APIs
export const find_MasterLocation = async (data: MasterLocationQueryDTO): Promise<FBR<MasterLocation[]>> => {
  return apiPost<FBR<MasterLocation[]>, MasterLocationQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterLocation = async (data: MasterLocationDTO): Promise<CUBR<MasterLocation>> => {
  return apiPost<CUBR<MasterLocation>, MasterLocationDTO>(ENDPOINTS.create, data);
};

export const update_MasterLocation = async (id: string, data: MasterLocationDTO): Promise<CUBR<MasterLocation>> => {
  return apiPatch<CUBR<MasterLocation>, MasterLocationDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterLocation = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterLocation Cache
export const find_cache_MasterLocation = async (user_id: string): Promise<FBR<MasterLocation[]>> => {
  return apiGet<FBR<MasterLocation[]>>(ENDPOINTS.cache(user_id));
};