// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterEventCategory } from 'src/core/Models';
import { MasterEventCategoryDTO, MasterEventCategoryQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/events/event_category';

const ENDPOINTS = {
  // MasterEventCategory APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterEventCategory Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterEventCategory APIs
export const find_MasterEventCategory = async (data: MasterEventCategoryQueryDTO): Promise<FBR<MasterEventCategory[]>> => {
  return apiPost<FBR<MasterEventCategory[]>, MasterEventCategoryQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterEventCategory = async (data: MasterEventCategoryDTO): Promise<CUBR<MasterEventCategory>> => {
  return apiPost<CUBR<MasterEventCategory>, MasterEventCategoryDTO>(ENDPOINTS.create, data);
};

export const update_MasterEventCategory = async (id: string, data: MasterEventCategoryDTO): Promise<CUBR<MasterEventCategory>> => {
  return apiPatch<CUBR<MasterEventCategory>, MasterEventCategoryDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterEventCategory = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterEventCategory Cache
export const find_cache_MasterEventCategory = async (user_id: string): Promise<FBR<MasterEventCategory[]>> => {
  return apiGet<FBR<MasterEventCategory[]>>(ENDPOINTS.cache(user_id));
};