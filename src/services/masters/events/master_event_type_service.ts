// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterEventType } from 'src/core/Models';
import { MasterEventTypeDTO, MasterEventTypeQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/events/event_type';

const ENDPOINTS = {
  // MasterEventType APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterEventType Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterEventType APIs
export const find_MasterEventType = async (data: MasterEventTypeQueryDTO): Promise<FBR<MasterEventType[]>> => {
  return apiPost<FBR<MasterEventType[]>, MasterEventTypeQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterEventType = async (data: MasterEventTypeDTO): Promise<CUBR<MasterEventType>> => {
  return apiPost<CUBR<MasterEventType>, MasterEventTypeDTO>(ENDPOINTS.create, data);
};

export const update_MasterEventType = async (id: string, data: MasterEventTypeDTO): Promise<CUBR<MasterEventType>> => {
  return apiPatch<CUBR<MasterEventType>, MasterEventTypeDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterEventType = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterEventType Cache
export const find_cache_MasterEventType = async (user_id: string): Promise<FBR<MasterEventType[]>> => {
  return apiGet<FBR<MasterEventType[]>>(ENDPOINTS.cache(user_id));
};