// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterUrl } from 'src/core/Models';
import { MasterUrlDTO, MasterUrlQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/resume/url_master';

const ENDPOINTS = {
  // MasterUrl APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterUrl Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterUrl APIs
export const find_MasterUrl = async (data: MasterUrlQueryDTO): Promise<FBR<MasterUrl[]>> => {
  return apiPost<FBR<MasterUrl[]>, MasterUrlQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterUrl = async (data: MasterUrlDTO): Promise<CUBR<MasterUrl>> => {
  return apiPost<CUBR<MasterUrl>, MasterUrlDTO>(ENDPOINTS.create, data);
};

export const update_MasterUrl = async (id: string, data: MasterUrlDTO): Promise<CUBR<MasterUrl>> => {
  return apiPatch<CUBR<MasterUrl>, MasterUrlDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterUrl = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterUrl Cache
export const find_cache_MasterUrl = async (user_id: string): Promise<FBR<MasterUrl[]>> => {
  return apiGet<FBR<MasterUrl[]>>(ENDPOINTS.cache(user_id));
};