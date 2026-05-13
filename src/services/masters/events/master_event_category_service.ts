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
import { Event } from '../../../services/events/event_service';

const URL = 'event_category';

const ENDPOINTS = {
  // MasterEventCategory APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterEventCategory Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterEventCategory Interface
export interface MasterEventCategory extends Record<string, unknown> {
  // Primary Field
  event_category_id: string;

  // Main Field Details
  event_category: string;
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
  Event?: Event[];

  // Relations - Child Count
  _count?: {
    Event?: number;
  };
}

// MasterEventCategory Create/Update Schema
export const MasterEventCategorySchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  event_category: stringMandatory('Event Category', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterEventCategoryDTO = z.infer<typeof MasterEventCategorySchema>;

// MasterEventCategory Query Schema
export const MasterEventCategoryQuerySchema = BaseQuerySchema.extend({
  // Self Table
  event_category_ids: multi_select_optional('MasterEventCategory'), // Multi-Selection -> MasterEventCategory

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
});
export type MasterEventCategoryQueryDTO = z.infer<
  typeof MasterEventCategoryQuerySchema
>;

// Convert MasterEventCategory Data to API Payload
export const toMasterEventCategoryPayload = (row: MasterEventCategory): MasterEventCategoryDTO => ({
  user_id: row.user_id || '',

  event_category: row.event_category || '',
  description: row.description || '',

  status: row.status || Status.Active,
});

// Create New MasterEventCategory Payload
export const newMasterEventCategoryPayload = (): MasterEventCategoryDTO => ({
  user_id: '',

  event_category: '',
  description: '',

  status: Status.Active,
});

// MasterEventCategory APIs
export const create_MasterEventCategory = async (data: MasterEventCategoryDTO): Promise<CUBR> => {
  return apiPost<CUBR, MasterEventCategoryDTO>(ENDPOINTS.create, data);
};

export const find_MasterEventCategory = async (data: MasterEventCategoryQueryDTO): Promise<FBR<MasterEventCategory[]>> => {
  return apiPost<FBR<MasterEventCategory[]>, MasterEventCategoryQueryDTO>(ENDPOINTS.find, data);
};

export const update_MasterEventCategory = async (id: string, data: MasterEventCategoryDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterEventCategoryDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterEventCategory = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterEventCategory Cache
export const find_cache_MasterEventCategory = async (user_id: string): Promise<FBR<MasterEventCategory[]>> => {
  return apiGet<FBR<MasterEventCategory[]>>(ENDPOINTS.cache(user_id));
};