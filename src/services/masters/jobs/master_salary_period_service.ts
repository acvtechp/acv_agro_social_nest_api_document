// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

import { MasterSalaryPeriod } from 'src/core/Models';
import { MasterSalaryPeriodDTO, MasterSalaryPeriodQueryDTO } from 'src/core/ZodSchemas';

const URL = 'master/jobs/salary_period';

const ENDPOINTS = {
  // MasterSalaryPeriod APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterSalaryPeriod Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterSalaryPeriod APIs
export const find_MasterSalaryPeriod = async (data: MasterSalaryPeriodQueryDTO): Promise<FBR<MasterSalaryPeriod[]>> => {
  return apiPost<FBR<MasterSalaryPeriod[]>, MasterSalaryPeriodQueryDTO>(ENDPOINTS.find, data);
};

export const create_MasterSalaryPeriod = async (data: MasterSalaryPeriodDTO): Promise<CUBR<MasterSalaryPeriod>> => {
  return apiPost<CUBR<MasterSalaryPeriod>, MasterSalaryPeriodDTO>(ENDPOINTS.create, data);
};

export const update_MasterSalaryPeriod = async (id: string, data: MasterSalaryPeriodDTO): Promise<CUBR<MasterSalaryPeriod>> => {
  return apiPatch<CUBR<MasterSalaryPeriod>, MasterSalaryPeriodDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterSalaryPeriod = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterSalaryPeriod Cache
export const find_cache_MasterSalaryPeriod = async (user_id: string): Promise<FBR<MasterSalaryPeriod[]>> => {
  return apiGet<FBR<MasterSalaryPeriod[]>>(ENDPOINTS.cache(user_id));
};