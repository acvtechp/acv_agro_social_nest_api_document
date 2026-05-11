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

const URL = 'job_category';

const ENDPOINTS = {
  // MasterJobCategory APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterJobCategory Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterJobCategory Interface
export interface MasterJobCategory extends Record<string, unknown> {
  // Primary Field
  job_category_id: string;

  // Main Field Details
  job_category: string;
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

// MasterJobCategory Create/Update Schema
export const MasterJobCategorySchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  job_category: stringMandatory('Job Category', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterJobCategoryDTO = z.infer<typeof MasterJobCategorySchema>;

// MasterJobCategory Query Schema
export const MasterJobCategoryQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_category_ids: multi_select_optional('MasterJobCategory'), // Multi-Selection -> MasterJobCategory

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
});
export type MasterJobCategoryQueryDTO = z.infer<
  typeof MasterJobCategoryQuerySchema
>;

// Convert MasterJobCategory Data to API Payload
export const toMasterJobCategoryPayload = (row: MasterJobCategory): MasterJobCategoryDTO => ({
  user_id: row.user_id || '',

  job_category: row.job_category || '',
  description: row.description || '',

  status: row.status || Status.Active,
});

// Create New MasterJobCategory Payload
export const newMasterJobCategoryPayload = (): MasterJobCategoryDTO => ({
  user_id: '',

  job_category: '',
  description: '',

  status: Status.Active,
});

// MasterJobCategory APIs
export const create_MasterJobCategory = async (data: MasterJobCategoryDTO): Promise<CUBR> => {
  return apiPost<CUBR, MasterJobCategoryDTO>(ENDPOINTS.create, data);
};

export const find_MasterJobCategory = async (data: MasterJobCategoryQueryDTO): Promise<FBR<MasterJobCategory[]>> => {
  return apiPost<FBR<MasterJobCategory[]>, MasterJobCategoryQueryDTO>(ENDPOINTS.find, data);
};

export const update_MasterJobCategory = async (id: string, data: MasterJobCategoryDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterJobCategoryDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterJobCategory = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterJobCategory Cache
export const find_cache_MasterJobCategory = async (user_id: string): Promise<FBR<MasterJobCategory[]>> => {
  return apiGet<FBR<MasterJobCategory[]>>(ENDPOINTS.cache(user_id));
};