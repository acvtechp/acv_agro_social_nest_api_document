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

const URL = 'shift_type';

const ENDPOINTS = {
  // MasterShiftType APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterShiftType Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterShiftType Interface
export interface MasterShiftType extends Record<string, unknown> {
  // Primary Field
  shift_type_id: string;

  // Main Field Details
  shift_type: string;
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

// MasterShiftType Create/Update Schema
export const MasterShiftTypeSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  shift_type: stringMandatory('Shift Type', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterShiftTypeDTO = z.infer<typeof MasterShiftTypeSchema>;

// MasterShiftType Query Schema
export const MasterShiftTypeQuerySchema = BaseQuerySchema.extend({
  // Self Table
  shift_type_ids: multi_select_optional('MasterShiftType'), // Multi-Selection -> MasterShiftType

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
});
export type MasterShiftTypeQueryDTO = z.infer<
  typeof MasterShiftTypeQuerySchema
>;

// Convert MasterShiftType Data to API Payload
export const toMasterShiftTypePayload = (row: MasterShiftType): MasterShiftTypeDTO => ({
  user_id: row.user_id || '',

  shift_type: row.shift_type || '',
  description: row.description || '',

  status: row.status || Status.Active,
});

// Create New MasterShiftType Payload
export const newMasterShiftTypePayload = (): MasterShiftTypeDTO => ({
  user_id: '',

  shift_type: '',
  description: '',

  status: Status.Active,
});

// MasterShiftType APIs
export const create_MasterShiftType = async (data: MasterShiftTypeDTO): Promise<CUBR> => {
  return apiPost<CUBR, MasterShiftTypeDTO>(ENDPOINTS.create, data);
};

export const find_MasterShiftType = async (data: MasterShiftTypeQueryDTO): Promise<FBR<MasterShiftType[]>> => {
  return apiPost<FBR<MasterShiftType[]>, MasterShiftTypeQueryDTO>(ENDPOINTS.find, data);
};

export const update_MasterShiftType = async (id: string, data: MasterShiftTypeDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterShiftTypeDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterShiftType = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterShiftType Cache
export const find_cache_MasterShiftType = async (user_id: string): Promise<FBR<MasterShiftType[]>> => {
  return apiGet<FBR<MasterShiftType[]>>(ENDPOINTS.cache(user_id));
};