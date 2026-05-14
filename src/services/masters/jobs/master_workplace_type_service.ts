// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterWorkplaceType } from 'src/core/Models';
import { MasterWorkplaceTypeDTO, MasterWorkplaceTypeQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/jobs/workplace_type';

const ENDPOINTS = {
  // MasterWorkplaceType APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterWorkplaceType Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterWorkplaceType APIs
export const find_MasterWorkplaceType = async (data: MasterWorkplaceTypeQueryDTO): Promise<FBR<MasterWorkplaceType[]>> => {
  return apiPost<FBR<MasterWorkplaceType[]>, MasterWorkplaceTypeQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterWorkplaceType = async (data: MasterWorkplaceTypeDTO): Promise<CUBR<MasterWorkplaceType>> => {
  return apiPost<CUBR<MasterWorkplaceType>, MasterWorkplaceTypeDTO>(ENDPOINTS.create, data);
};

export const update_MasterWorkplaceType = async (id: string, data: MasterWorkplaceTypeDTO): Promise<CUBR<MasterWorkplaceType>> => {
  return apiPatch<CUBR<MasterWorkplaceType>, MasterWorkplaceTypeDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterWorkplaceType = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterWorkplaceType Cache
export const find_cache_MasterWorkplaceType = async (user_id: string): Promise<FBR<MasterWorkplaceType[]>> => {
  return apiGet<FBR<MasterWorkplaceType[]>>(ENDPOINTS.cache(user_id));
};