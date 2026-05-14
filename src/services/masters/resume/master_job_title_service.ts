// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterJobTitle } from 'src/core/Models';
import { MasterJobTitleDTO, MasterJobTitleQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/resume/job_title';

const ENDPOINTS = {
  // MasterJobTitle APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterJobTitle Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterJobTitle APIs
export const find_MasterJobTitle = async (data: MasterJobTitleQueryDTO): Promise<FBR<MasterJobTitle[]>> => {
  return apiPost<FBR<MasterJobTitle[]>, MasterJobTitleQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterJobTitle = async (data: MasterJobTitleDTO): Promise<CUBR<MasterJobTitle>> => {
  return apiPost<CUBR<MasterJobTitle>, MasterJobTitleDTO>(ENDPOINTS.create, data);
};

export const update_MasterJobTitle = async (id: string, data: MasterJobTitleDTO): Promise<CUBR<MasterJobTitle>> => {
  return apiPatch<CUBR<MasterJobTitle>, MasterJobTitleDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterJobTitle = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterJobTitle Cache
export const find_cache_MasterJobTitle = async (user_id: string): Promise<FBR<MasterJobTitle[]>> => {
  return apiGet<FBR<MasterJobTitle[]>>(ENDPOINTS.cache(user_id));
};