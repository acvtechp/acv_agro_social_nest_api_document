// Imports
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../core/apiCall';
import { CUBR, FBR, DBR } from '../../../core/BaseResponse';

// Zod
import { z } from 'zod';
import {
  stringMandatory,
  stringOptional,
  enumMandatory,
  multi_select_optional,
  single_select_mandatory,
} from '../../../zod_utils/zod_utils';
import { BaseQuerySchema } from '../../../zod_utils/zod_base_schema';

// Enums
import { Status } from '../../../core/Enums';

// Other Models
import { User } from '../../../services/users/user_service';
import { Job } from '../../../services/jobs/job_service';

const URL = 'salary_period';

const ENDPOINTS = {
  // MasterSalaryPeriod APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterSalaryPeriod Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterSalaryPeriod Interface
export interface MasterSalaryPeriod extends Record<string, unknown> {
  // Primary Field
  salary_period_id: string;

  // Main Field Details
  salary_period: string;
  description?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  modified_date_time: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_image_url?: string;

  // Relations - Child
  Job?: Job[];

  // Relations - Child Count
  _count?: {
    Job?: number;
  };
}

// MasterSalaryPeriod Create/Update Schema
export const MasterSalaryPeriodSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  salary_period: stringMandatory('Salary Period', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterSalaryPeriodDTO = z.infer<typeof MasterSalaryPeriodSchema>;

// MasterSalaryPeriod Query Schema
export const MasterSalaryPeriodQuerySchema = BaseQuerySchema.extend({
  // Self Table
  salary_period_ids: multi_select_optional('MasterSalaryPeriod'), // Multi-Selection -> MasterSalaryPeriod

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
});
export type MasterSalaryPeriodQueryDTO = z.infer<
  typeof MasterSalaryPeriodQuerySchema
>;

// Convert MasterSalaryPeriod Data to API Payload
export const toMasterSalaryPeriodPayload = (row: MasterSalaryPeriod): MasterSalaryPeriodDTO => ({
  user_id: row.user_id || '',

  salary_period: row.salary_period || '',
  description: row.description || '',

  status: row.status || Status.Active,
});

// Create New MasterSalaryPeriod Payload
export const newMasterSalaryPeriodPayload = (): MasterSalaryPeriodDTO => ({
  user_id: '',

  salary_period: '',
  description: '',

  status: Status.Active,
});

// MasterSalaryPeriod APIs
export const create_MasterSalaryPeriod = async (data: MasterSalaryPeriodDTO): Promise<CUBR> => {
  return apiPost<CUBR, MasterSalaryPeriodDTO>(ENDPOINTS.create, data);
};

export const find_MasterSalaryPeriod = async (data: MasterSalaryPeriodQueryDTO): Promise<FBR<MasterSalaryPeriod[]>> => {
  return apiPost<FBR<MasterSalaryPeriod[]>, MasterSalaryPeriodQueryDTO>(ENDPOINTS.find, data);
};

export const update_MasterSalaryPeriod = async (id: string, data: MasterSalaryPeriodDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterSalaryPeriodDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterSalaryPeriod = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterSalaryPeriod Cache
export const find_cache_MasterSalaryPeriod = async (user_id: string): Promise<FBR<MasterSalaryPeriod[]>> => {
  return apiGet<FBR<MasterSalaryPeriod[]>>(ENDPOINTS.cache(user_id));
};