// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterJobType } from 'src/core/Models';
import { MasterJobTypeDTO, MasterJobTypeQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/jobs/job_type';

const ENDPOINTS = {
  // MasterJobType APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterJobType Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterJobType APIs
export const find_MasterJobType = async (data: MasterJobTypeQueryDTO): Promise<FBR<MasterJobType[]>> => {
  return apiPost<FBR<MasterJobType[]>, MasterJobTypeQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterJobType = async (data: MasterJobTypeDTO): Promise<CUBR<MasterJobType>> => {
  return apiPost<CUBR<MasterJobType>, MasterJobTypeDTO>(ENDPOINTS.create, data);
};

export const update_MasterJobType = async (id: string, data: MasterJobTypeDTO): Promise<CUBR<MasterJobType>> => {
  return apiPatch<CUBR<MasterJobType>, MasterJobTypeDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterJobType = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterJobType Cache
export const find_cache_MasterJobType = async (user_id: string): Promise<FBR<MasterJobType[]>> => {
  return apiGet<FBR<MasterJobType[]>>(ENDPOINTS.cache(user_id));
};