import { BaseQuerySchema } from '../zod_utils/zod_base_schema';
import {
  single_select_mandatory,
  stringUUIDMandatory,
} from '../zod_utils/zod_utils';
import z from 'zod';

// MasterMainCountry Cache
export const FindCacheCountrySchema = z.object({
  // Self Table
  country_id: stringUUIDMandatory('country_id'),
});
export type FindCacheCountryDTO = z.infer<typeof FindCacheCountrySchema>;

// Social Media
// Events
export const EventActionSchema = z.object({
  event_id: single_select_mandatory('Event'), // Single-Selection -> Event
  user_id: single_select_mandatory('User'), // Single-Selection -> User
});
export type EventActionDTO = z.infer<typeof EventActionSchema>;

// Jobs Schema
export const JobActionSchema = z.object({
  job_id: single_select_mandatory('Job'), // Single-Selection -> Job
  user_id: single_select_mandatory('User'), // Single-Selection -> User
});
export type JobActionDTO = z.infer<typeof JobActionSchema>;

// MasterAdminGroup Action Schema
export const MasterAdminGroupActionSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User4
  master_admin_group_id: single_select_mandatory('MasterAdminGroup'), // Single-Selection -> MasterAdminGroup
});
export type MasterAdminGroupActionDTO = z.infer<
  typeof MasterAdminGroupActionSchema
>;

// MasterAdminGroup Find Query Schema
export const MasterAdminGroupFindQuerySchema = BaseQuerySchema.extend({
  logged_in_user_id: single_select_mandatory('User'), // Multi-Selection -> User
  profile_user_id: single_select_mandatory('User'), // Multi-Selection -> User
});
export type MasterAdminGroupFindQueryDTO = z.infer<
  typeof MasterAdminGroupFindQuerySchema
>;

// UserChannel Action Schema
export const UserChannelActionSchema = z.object({
  user_id: single_select_mandatory('User'), // single-Selection -> User
  user_channel_id: single_select_mandatory('UserChannel'), // single-Selection -> UserChannel
});
export type UserChannelActionDTO = z.infer<typeof UserChannelActionSchema>;

// UserChannel Find Query Schema
export const UserChannelFindQuerySchema = BaseQuerySchema.extend({
  logged_in_user_id: single_select_mandatory('User'),
  profile_user_id: single_select_mandatory('User'),
});
export type UserChannelFindQueryDTO = z.infer<
  typeof UserChannelFindQuerySchema
>;

// UserOrganisation Action Schema
export const UserOrganisationActionSchema = z.object({
  user_id: single_select_mandatory('User'), // single-Selection -> User
  organisation_id: single_select_mandatory('UserOrganisation'), // single-Selection -> UserOrganisation
});
export type UserOrganisationActionDTO = z.infer<
  typeof UserOrganisationActionSchema
>;

// UserOrganisation Find Query Schema
export const UserOrganisationFindQuerySchema = BaseQuerySchema.extend({
  logged_in_user_id: single_select_mandatory('User'), // single-Selection -> User
  profile_user_id: single_select_mandatory('User'), // single-Selection -> User
});
export type UserOrganisationFindQueryDTO = z.infer<
  typeof UserOrganisationFindQuerySchema
>;
