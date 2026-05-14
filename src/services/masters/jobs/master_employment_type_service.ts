// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterEmploymentType } from 'src/core/Models';
import { MasterEmploymentTypeDTO, MasterEmploymentTypeQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/jobs/employment_type';

const ENDPOINTS = {
  // MasterEmploymentType APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterEmploymentType Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterEmploymentType APIs
export const find_MasterEmploymentType = async (data: MasterEmploymentTypeQueryDTO): Promise<FBR<MasterEmploymentType[]>> => {
  return apiPost<FBR<MasterEmploymentType[]>, MasterEmploymentTypeQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterEmploymentType = async (data: MasterEmploymentTypeDTO): Promise<CUBR<MasterEmploymentType>> => {
  return apiPost<CUBR<MasterEmploymentType>, MasterEmploymentTypeDTO>(ENDPOINTS.create, data);
};

export const update_MasterEmploymentType = async (id: string, data: MasterEmploymentTypeDTO): Promise<CUBR<MasterEmploymentType>> => {
  return apiPatch<CUBR<MasterEmploymentType>, MasterEmploymentTypeDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterEmploymentType = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterEmploymentType Cache
export const find_cache_MasterEmploymentType = async (user_id: string): Promise<FBR<MasterEmploymentType[]>> => {
  return apiGet<FBR<MasterEmploymentType[]>>(ENDPOINTS.cache(user_id));
};