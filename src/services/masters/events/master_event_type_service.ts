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

const URL = 'event_type';

const ENDPOINTS = {
  // MasterEventType APIs
  find: `${URL}/search`,
  create: URL,
  update: (id: string): string => `${URL}/${id}`,
  delete: (id: string): string => `${URL}/${id}`,

  // MasterEventType Cache
  cache: (user_id: string): string => `${URL}/cache/${user_id}`,
};

// MasterEventType Interface
export interface MasterEventType extends Record<string, unknown> {
  // Primary Field
  event_type_id: string;

  // Main Field Details
  event_type: string;
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

// MasterEventType Create/Update Schema
export const MasterEventTypeSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  event_type: stringMandatory('Event Type', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),
});
export type MasterEventTypeDTO = z.infer<typeof MasterEventTypeSchema>;

// MasterEventType Query Schema
export const MasterEventTypeQuerySchema = BaseQuerySchema.extend({
  // Self Table
  event_type_ids: multi_select_optional('MasterEventType'), // Multi-Selection -> MasterEventType

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
});
export type MasterEventTypeQueryDTO = z.infer<
  typeof MasterEventTypeQuerySchema
>;

// Convert MasterEventType Data to API Payload
export const toMasterEventTypePayload = (row: MasterEventType): MasterEventTypeDTO => ({
  user_id: row.user_id || '',

  event_type: row.event_type || '',
  description: row.description || '',

  status: row.status || Status.Active,
});

// Create New MasterEventType Payload
export const newMasterEventTypePayload = (): MasterEventTypeDTO => ({
  user_id: '',

  event_type: '',
  description: '',

  status: Status.Active,
});

// MasterEventType APIs
export const create_MasterEventType = async (data: MasterEventTypeDTO): Promise<CUBR> => {
  return apiPost<CUBR, MasterEventTypeDTO>(ENDPOINTS.create, data);
};

export const find_MasterEventType = async (data: MasterEventTypeQueryDTO): Promise<FBR<MasterEventType[]>> => {
  return apiPost<FBR<MasterEventType[]>, MasterEventTypeQueryDTO>(ENDPOINTS.find, data);
};

export const update_MasterEventType = async (id: string, data: MasterEventTypeDTO): Promise<CUBR> => {
  return apiPatch<CUBR, MasterEventTypeDTO>(ENDPOINTS.update(id), data);
};

export const delete_MasterEventType = async (id: string): Promise<DBR> => {
  return apiDelete<DBR>(ENDPOINTS.delete(id));
};

// MasterEventType Cache
export const find_cache_MasterEventType = async (user_id: string): Promise<FBR<MasterEventType[]>> => {
  return apiGet<FBR<MasterEventType[]>>(ENDPOINTS.cache(user_id));
};