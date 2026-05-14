// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterEducationLevel } from 'src/core/Models';
import { MasterEducationLevelDTO, MasterEducationLevelQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/jobs/education_level';

const ENDPOINTS = {
  // MasterEducationLevel APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterEducationLevel Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterEducationLevel APIs
export const find_MasterEducationLevel = async (data: MasterEducationLevelQueryDTO): Promise<FBR<MasterEducationLevel[]>> => {
  return apiPost<FBR<MasterEducationLevel[]>, MasterEducationLevelQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterEducationLevel = async (data: MasterEducationLevelDTO): Promise<CUBR<MasterEducationLevel>> => {
  return apiPost<CUBR<MasterEducationLevel>, MasterEducationLevelDTO>(ENDPOINTS.create, data);
};

export const update_MasterEducationLevel = async (id: string, data: MasterEducationLevelDTO): Promise<CUBR<MasterEducationLevel>> => {
  return apiPatch<CUBR<MasterEducationLevel>, MasterEducationLevelDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterEducationLevel = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterEducationLevel Cache
export const find_cache_MasterEducationLevel = async (user_id: string): Promise<FBR<MasterEducationLevel[]>> => {
  return apiGet<FBR<MasterEducationLevel[]>>(ENDPOINTS.cache(user_id));
};