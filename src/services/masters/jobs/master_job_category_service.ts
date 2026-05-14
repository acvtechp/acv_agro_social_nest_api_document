// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterJobCategory } from 'src/core/Models';
import { MasterJobCategoryDTO, MasterJobCategoryQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/jobs/job_category';

const ENDPOINTS = {
  // MasterJobCategory APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterJobCategory Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterJobCategory APIs
export const find_MasterJobCategory = async (data: MasterJobCategoryQueryDTO): Promise<FBR<MasterJobCategory[]>> => {
  return apiPost<FBR<MasterJobCategory[]>, MasterJobCategoryQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterJobCategory = async (data: MasterJobCategoryDTO): Promise<CUBR<MasterJobCategory>> => {
  return apiPost<CUBR<MasterJobCategory>, MasterJobCategoryDTO>(ENDPOINTS.create, data);
};

export const update_MasterJobCategory = async (id: string, data: MasterJobCategoryDTO): Promise<CUBR<MasterJobCategory>> => {
  return apiPatch<CUBR<MasterJobCategory>, MasterJobCategoryDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterJobCategory = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterJobCategory Cache
export const find_cache_MasterJobCategory = async (user_id: string): Promise<FBR<MasterJobCategory[]>> => {
  return apiGet<FBR<MasterJobCategory[]>>(ENDPOINTS.cache(user_id));
};