// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterShiftType } from 'src/core/Models';
import { MasterShiftTypeDTO, MasterShiftTypeQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/jobs/shift_type';

const ENDPOINTS = {
  // MasterShiftType APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterShiftType Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterShiftType APIs
export const find_MasterShiftType = async (data: MasterShiftTypeQueryDTO): Promise<FBR<MasterShiftType[]>> => {
  return apiPost<FBR<MasterShiftType[]>, MasterShiftTypeQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterShiftType = async (data: MasterShiftTypeDTO): Promise<CUBR<MasterShiftType>> => {
  return apiPost<CUBR<MasterShiftType>, MasterShiftTypeDTO>(ENDPOINTS.create, data);
};

export const update_MasterShiftType = async (id: string, data: MasterShiftTypeDTO): Promise<CUBR<MasterShiftType>> => {
  return apiPatch<CUBR<MasterShiftType>, MasterShiftTypeDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterShiftType = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterShiftType Cache
export const find_cache_MasterShiftType = async (user_id: string): Promise<FBR<MasterShiftType[]>> => {
  return apiGet<FBR<MasterShiftType[]>>(ENDPOINTS.cache(user_id));
};