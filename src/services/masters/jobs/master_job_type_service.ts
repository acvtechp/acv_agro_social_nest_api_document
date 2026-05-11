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

const URL = 'job_type';

const ENDPOINTS = {
  // MasterJobType APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterJobType Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterJobType Interface
export interface MasterJobType extends Record<string, unknown> {
  // Primary Field
  job_type_id: string;

  // Main Field Details
  job_type: string;
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

// MasterJobType Create/Update Schema
export const MasterJobTypeSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  job_type: stringMandatory('Job Type', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterJobTypeDTO = z.infer<typeof MasterJobTypeSchema>;

// MasterJobType Query Schema
export const MasterJobTypeQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_type_ids: multi_select_optional('MasterJobType'), // Multi-Selection -> MasterJobType

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
});
export type MasterJobTypeQueryDTO = z.infer<typeof MasterJobTypeQuerySchema>;

// Convert MasterJobType Data to API Payload
export const toMasterJobTypePayload = (row: MasterJobType): MasterJobTypeDTO => ({
  user_id: row.user_id || '',

  job_type: row.job_type || '',
  description: row.description || '',

  status: row.status || Status.Active,
});

// Create New MasterJobType Payload
export const newMasterJobTypePayload = (): MasterJobTypeDTO => ({
  user_id: '',

  job_type: '',
  description: '',

  status: Status.Active,
});

// MasterJobType APIs
export const create_MasterJobType = async (data: MasterJobTypeDTO): Promise<CUBR> => {
  return apiPost<CUBR, MasterJobTypeDTO>(ENDPOINTS.create, data);
};

export const find_MasterJobType = async (data: MasterJobTypeQueryDTO): Promise<FBR<MasterJobType[]>> => {
  return apiPost<FBR<MasterJobType[]>, MasterJobTypeQueryDTO>(ENDPOINTS.find, data);
};

export const update_MasterJobType = async (id: string, data: MasterJobTypeDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterJobTypeDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterJobType = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterJobType Cache
export const find_cache_MasterJobType = async (user_id: string): Promise<FBR<MasterJobType[]>> => {
  return apiGet<FBR<MasterJobType[]>>(ENDPOINTS.cache(user_id));
};