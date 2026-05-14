// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterLanguage } from 'src/core/Models';
import { MasterLanguageDTO, MasterLanguageQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/resume/language';

const ENDPOINTS = {
  // MasterLanguage APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterLanguage Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterLanguage APIs
export const find_MasterLanguage = async (data: MasterLanguageQueryDTO): Promise<FBR<MasterLanguage[]>> => {
  return apiPost<FBR<MasterLanguage[]>, MasterLanguageQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterLanguage = async (data: MasterLanguageDTO): Promise<CUBR<MasterLanguage>> => {
  return apiPost<CUBR<MasterLanguage>, MasterLanguageDTO>(ENDPOINTS.create, data);
};

export const update_MasterLanguage = async (id: string, data: MasterLanguageDTO): Promise<CUBR<MasterLanguage>> => {
  return apiPatch<CUBR<MasterLanguage>, MasterLanguageDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterLanguage = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterLanguage Cache
export const find_cache_MasterLanguage = async (user_id: string): Promise<FBR<MasterLanguage[]>> => {
  return apiGet<FBR<MasterLanguage[]>>(ENDPOINTS.cache(user_id));
};