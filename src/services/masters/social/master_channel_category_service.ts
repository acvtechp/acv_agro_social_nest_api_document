// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterChannelCategory } from 'src/core/Models';
import { MasterChannelCategoryDTO, MasterChannelCategoryQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/social/channel_category';

const ENDPOINTS = {
  // MasterChannelCategory APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterChannelCategory Cache
  cache: `${URL}/cache`,
};

// MasterChannelCategory APIs
export const find_MasterChannelCategory = async (data: MasterChannelCategoryQueryDTO): Promise<FBR<MasterChannelCategory[]>> => {
  return apiPost<FBR<MasterChannelCategory[]>, MasterChannelCategoryQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterChannelCategory = async (data: MasterChannelCategoryDTO): Promise<CUBR<MasterChannelCategory>> => {
  return apiPost<CUBR<MasterChannelCategory>, MasterChannelCategoryDTO>(ENDPOINTS.create, data);
};

export const update_MasterChannelCategory = async (id: string, data: MasterChannelCategoryDTO): Promise<CUBR<MasterChannelCategory>> => {
  return apiPatch<CUBR<MasterChannelCategory>, MasterChannelCategoryDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterChannelCategory = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterChannelCategory Cache
export const getCacheMasterChannelCategory = async (): Promise<FBR<MasterChannelCategory[]>> => {
  return apiGet<FBR<MasterChannelCategory[]>>(ENDPOINTS.cache);
};