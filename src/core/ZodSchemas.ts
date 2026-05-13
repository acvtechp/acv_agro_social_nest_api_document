import { z } from 'zod';
import { BaseQuerySchema } from '../zod_utils/zod_base_schema';
import {
  booleanOptional,
  dateOptional,
  dateTimeMandatory,
  dateTimeOptional,
  doubleOptional,
  dynamicJsonSchema,
  enumArrayOptional,
  enumMandatory,
  enumOptional,
  getAllEnums,
  multi_select_optional,
  numberMandatory,
  numberOptional,
  single_select_mandatory,
  single_select_optional,
  stringArrayMandatory,
  stringMandatory,
  stringOptional,
} from '../zod_utils/zod_utils';
import {
  Status,
  FileType,
  YesNo,
  LoginFrom,
  ExecutionStatus,
  RunType,
  APIAuthType,
  AdminRole,
  UserType,
  OrganisationType,
  OrganisationSize,
  AdminStatus,
  ReportStatus,
  FriendStatus,
  FollowStatus,
  AccountType,
  JobStatus,
  JobApplicationStatus,
  ResumeSkillLevel,
  LanguageProficiency,
  EventStatus,
} from './EnumsDB';
import type {
  AWSFileKey,
  CronJobList,
  CronJobLog,
  APIDataShare,
  APIDataShareLog,
  ContactUsDetail,
  FAQ,
  StaticPage,
  MasterMainCountry,
  MasterMainTimeZone,
  MasterMainDateFormat,
  MasterChannelCategory,
  MasterReportReason,
  MasterJobType,
  MasterEmploymentType,
  MasterWorkplaceType,
  MasterSalaryPeriod,
  MasterJobCategory,
  MasterEducationLevel,
  MasterShiftType,
  MasterLocation,
  MasterSkill,
  MasterLanguage,
  MasterUrl,
  MasterJobTitle,
  MasterJobCompany,
  MasterEventType,
  MasterEventCategory,
  UserAdmin,
  UserAdminFile,
  UserAdminLoginPush,
  User,
  UserLoginPush,
  UserResume,
  ResumeFile,
  ResumeExperience,
  ResumeProject,
  ResumeEducation,
  ResumeCertification,
  ResumeAchievement,
  ResumeSkillLink,
  ResumeLanguageLink,
  ResumeUrlLink,
  UserBlock,
  UserFriend,
  UserFollow,
  UserSocialSummary,
  MasterAdminGroup,
  AdminGroupMemberLink,
  UserChannel,
  UserChannelLink,
  UserOrganisation,
  UserOrganisationLink,
  Post,
  PostTag,
  PostFile,
  PostLike,
  PostComment,
  PostView,
  PostSaved,
  PostReport,
  Job,
  JobSkillLink,
  JobLocationLink,
  JobFile,
  JobApplication,
  JobApplicationFile,
  JobSaved,
  JobView,
  JobShare,
  JobReport,
  Event,
  EventContactPerson,
  EventInterested,
  EventSaved,
  EventView,
  EventVisited,
  EventShare,
  EventReport,
} from './Models';

// AWSFileKey Create/Update Schema
export const AWSFileKeySchema = z.object({
  // Main Field Details
  file_key: stringMandatory('File Key', 2, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type AWSFileKeyDTO = z.infer<typeof AWSFileKeySchema>;

// AWSFileKey Query Schema
export const AWSFileKeyQuerySchema = BaseQuerySchema.extend({
  // Self Table
  aws_file_key_ids: multi_select_optional('AWSFileKey'), // Multi-selection -> AWSFileKey

  // Relations - Parent

  // Enums
});
export type AWSFileKeyQueryDTO = z.infer<typeof AWSFileKeyQuerySchema>;

// Convert AWSFileKey Data to API Payload
export const toAWSFileKeyPayload = (row: AWSFileKey): AWSFileKeyDTO => ({
  file_key: row.file_key || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New AWSFileKey Payload
export const newAWSFileKeyPayload = (): AWSFileKeyDTO => ({
  file_key: '',

  status: Status.Active,

  time_zone_id: '',
});

// CronJobList Create/Update Schema
export const CronJobListSchema = z.object({
  // Main Field Details
  app_name: stringMandatory('App Name', 2, 100),
  job_name: stringMandatory('Job Name', 2, 100),
  category_name: stringOptional('Category Name', 0, 100),
  sub_category_name: stringOptional('Sub Category Name', 0, 100),
  job_description: stringOptional('Job Description', 0, 100),
  cron_name: stringMandatory('Cron Name', 2, 100),
  cron_expression: stringOptional('Cron Expression', 0, 200),
  cron_expression_description: stringOptional(
    'Cron Expression Description',
    0,
    200,
  ),
  is_enabled: enumMandatory('Is Enabled', YesNo, YesNo.Yes),

  // Next Run Details
  next_run_date_time: dateTimeOptional('Next Run Date Time'),

  // Last Run Details
  run_type: enumMandatory('Run Type', RunType, RunType.SCHEDULED),
  execution_status: enumMandatory(
    'Execution Status',
    ExecutionStatus,
    ExecutionStatus.REGISTERED,
  ),
  start_date_time: dateTimeOptional('Start Date Time'),
  end_date_time: dateTimeOptional('End Date Time'),
  success_details: stringOptional('Success Details', 0, 1000),
  error_details: stringOptional('Error Details', 0, 1000),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type CronJobListDTO = z.infer<typeof CronJobListSchema>;

// CronJobList Query Schema
export const CronJobListQuerySchema = BaseQuerySchema.extend({
  // Self Table
  cron_job_ids: multi_select_optional('CronJobList'), // Multi-selection -> CronJobList

  // Relations - Parent

  // Enums
  is_enabled: enumArrayOptional('Is Enabled', YesNo, getAllEnums(YesNo)),
  run_type: enumArrayOptional('Run Type', RunType, getAllEnums(RunType)),
  execution_status: enumArrayOptional(
    'Execution Status',
    ExecutionStatus,
    getAllEnums(ExecutionStatus),
  ),
});
export type CronJobListQueryDTO = z.infer<typeof CronJobListQuerySchema>;

// Convert CronJobList Data to API Payload
export const toCronJobListPayload = (row: CronJobList): CronJobListDTO => ({
  app_name: row.app_name || '',
  job_name: row.job_name || '',
  category_name: row.category_name || '',
  sub_category_name: row.sub_category_name || '',
  job_description: row.job_description || '',
  cron_name: row.cron_name || '',
  cron_expression: row.cron_expression || '',
  cron_expression_description: row.cron_expression_description || '',
  is_enabled: row.is_enabled || YesNo.Yes,
  next_run_date_time: row.next_run_date_time || '',
  run_type: row.run_type || RunType.SCHEDULED,
  execution_status: row.execution_status || ExecutionStatus.REGISTERED,
  start_date_time: row.start_date_time || '',
  end_date_time: row.end_date_time || '',
  success_details: row.success_details || '',
  error_details: row.error_details || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New CronJobList Payload
export const newCronJobListPayload = (): CronJobListDTO => ({
  app_name: '',
  job_name: '',
  category_name: '',
  sub_category_name: '',
  job_description: '',
  cron_name: '',
  cron_expression: '',
  cron_expression_description: '',
  is_enabled: YesNo.Yes,
  next_run_date_time: '',
  run_type: RunType.SCHEDULED,
  execution_status: ExecutionStatus.REGISTERED,
  start_date_time: '',
  end_date_time: '',
  success_details: '',
  error_details: '',

  status: Status.Active,

  time_zone_id: '',
});

// CronJobLog Create/Update Schema
export const CronJobLogSchema = z.object({
  // Relations - Parent
  cron_job_id: single_select_mandatory('CronJobList'), // Single-Selection -> CronJobList

  // Main Field Details
  run_type: enumMandatory('Run Type', RunType, RunType.SCHEDULED),
  execution_status: enumMandatory(
    'Execution Status',
    ExecutionStatus,
    ExecutionStatus.FIRED,
  ),
  start_date_time: dateTimeOptional('Start Date Time'),
  end_date_time: dateTimeOptional('End Date Time'),
  error_details: stringOptional('Error Details', 0, 1000),
  success_details: stringOptional('Success Details', 0, 1000),
  is_latest_run: enumMandatory('Is Latest Run', YesNo, YesNo.Yes),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type CronJobLogDTO = z.infer<typeof CronJobLogSchema>;

// CronJobLog Query Schema
export const CronJobLogQuerySchema = BaseQuerySchema.extend({
  // Self Table
  cron_job_log_ids: multi_select_optional('CronJobLog'), // Multi-selection -> CronJobLog

  // Relations - Parent
  cron_job_ids: multi_select_optional('CronJobList'), // Multi-selection -> CronJobList

  // Enums
  run_type: enumArrayOptional('Run Type', RunType, getAllEnums(RunType)),
  execution_status: enumArrayOptional(
    'Execution Status',
    ExecutionStatus,
    getAllEnums(ExecutionStatus),
  ),
  is_latest_run: enumArrayOptional('Is Latest Run', YesNo, getAllEnums(YesNo)),
});
export type CronJobLogQueryDTO = z.infer<typeof CronJobLogQuerySchema>;

// Convert CronJobLog Data to API Payload
export const toCronJobLogPayload = (row: CronJobLog): CronJobLogDTO => ({
  cron_job_id: row.cron_job_id || '',

  run_type: row.run_type || RunType.SCHEDULED,
  execution_status: row.execution_status || ExecutionStatus.FIRED,
  start_date_time: row.start_date_time || '',
  end_date_time: row.end_date_time || '',
  error_details: row.error_details || '',
  success_details: row.success_details || '',
  is_latest_run: row.is_latest_run || YesNo.Yes,

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New CronJobLog Payload
export const newCronJobLogPayload = (): CronJobLogDTO => ({
  cron_job_id: '',

  run_type: RunType.SCHEDULED,
  execution_status: ExecutionStatus.FIRED,
  start_date_time: '',
  end_date_time: '',
  error_details: '',
  success_details: '',
  is_latest_run: YesNo.Yes,

  status: Status.Active,

  time_zone_id: '',
});

// APIDataShare Create/Update Schema
export const APIDataShareSchema = z.object({
  // Main Field Details
  api_name: stringMandatory('Api Name', 2, 100),
  vendor_name: stringMandatory('Vendor Name', 2, 100),
  purpose: stringOptional('Purpose', 0, 200),
  description: stringOptional('Description', 0, 500),

  // Control
  is_enabled: enumMandatory('Is Enabled', YesNo, YesNo.Yes),

  // Authentication
  auth_type: enumMandatory('Auth Type', APIAuthType, APIAuthType.API_KEY),
  api_key: stringOptional('Api Key', 0, 100),
  username: stringOptional('Username', 0, 100),
  password: stringOptional('Password', 0, 255),

  // Rate limit
  rate_limit_rpm: numberMandatory('Rate Limit Rpm', 0),
  allowed_ips: stringArrayMandatory('Allowed Ips'),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type APIDataShareDTO = z.infer<typeof APIDataShareSchema>;

// APIDataShare Query Schema
export const APIDataShareQuerySchema = BaseQuerySchema.extend({
  // Self Table
  api_data_share_ids: multi_select_optional('APIDataShare'), // Multi-selection -> APIDataShare

  // Relations - Parent

  // Enums
  is_enabled: enumArrayOptional('Is Enabled', YesNo, getAllEnums(YesNo)),
  auth_type: enumArrayOptional(
    'Auth Type',
    APIAuthType,
    getAllEnums(APIAuthType),
  ),
});
export type APIDataShareQueryDTO = z.infer<typeof APIDataShareQuerySchema>;

// Convert APIDataShare Data to API Payload
export const toAPIDataSharePayload = (row: APIDataShare): APIDataShareDTO => ({
  api_name: row.api_name || '',
  vendor_name: row.vendor_name || '',
  purpose: row.purpose || '',
  description: row.description || '',
  is_enabled: row.is_enabled || YesNo.Yes,
  auth_type: row.auth_type || APIAuthType.API_KEY,
  api_key: row.api_key || '',
  username: row.username || '',
  password: row.password || '',
  rate_limit_rpm: row.rate_limit_rpm ?? 0,
  allowed_ips: row.allowed_ips || [],

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New APIDataShare Payload
export const newAPIDataSharePayload = (): APIDataShareDTO => ({
  api_name: '',
  vendor_name: '',
  purpose: '',
  description: '',
  is_enabled: YesNo.Yes,
  auth_type: APIAuthType.API_KEY,
  api_key: '',
  username: '',
  password: '',
  rate_limit_rpm: 0,
  allowed_ips: [],

  status: Status.Active,

  time_zone_id: '',
});

// APIDataShareLog Create/Update Schema
export const APIDataShareLogSchema = z.object({
  // Relations - Parent
  api_data_share_id: single_select_mandatory('APIDataShare'), // Single-Selection -> APIDataShare

  // Main Field Details
  request_date_time: dateTimeMandatory('Request Date Time'),
  request_id: stringOptional('Request', 0, 100),
  ip_address: stringOptional('Ip Address', 0, 100),
  user_agent: stringOptional('User Agent', 0, 500),
  is_auth_success: enumMandatory('Is Auth Success', YesNo, YesNo.No),
  failed_message: stringOptional('Failed Message', 0, 1000),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type APIDataShareLogDTO = z.infer<typeof APIDataShareLogSchema>;

// APIDataShareLog Query Schema
export const APIDataShareLogQuerySchema = BaseQuerySchema.extend({
  // Self Table
  api_data_share_log_ids: multi_select_optional('APIDataShareLog'), // Multi-selection -> APIDataShareLog

  // Relations - Parent
  api_data_share_ids: multi_select_optional('APIDataShare'), // Multi-selection -> APIDataShare

  // Enums
  is_auth_success: enumArrayOptional(
    'Is Auth Success',
    YesNo,
    getAllEnums(YesNo),
  ),
});
export type APIDataShareLogQueryDTO = z.infer<
  typeof APIDataShareLogQuerySchema
>;

// Convert APIDataShareLog Data to API Payload
export const toAPIDataShareLogPayload = (
  row: APIDataShareLog,
): APIDataShareLogDTO => ({
  api_data_share_id: row.api_data_share_id || '',

  request_date_time: row.request_date_time || '',
  request_id: row.request_id || '',
  ip_address: row.ip_address || '',
  user_agent: row.user_agent || '',
  is_auth_success: row.is_auth_success || YesNo.No,
  failed_message: row.failed_message || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New APIDataShareLog Payload
export const newAPIDataShareLogPayload = (): APIDataShareLogDTO => ({
  api_data_share_id: '',

  request_date_time: '',
  request_id: '',
  ip_address: '',
  user_agent: '',
  is_auth_success: YesNo.No,
  failed_message: '',

  status: Status.Active,

  time_zone_id: '',
});

// ContactUsDetail Create/Update Schema
export const ContactUsDetailSchema = z.object({
  // Main Field Details
  mobile_number: stringOptional('Mobile Number', 0, 15),
  email: stringOptional('Email', 0, 100),
  facebook_link: stringOptional('Facebook Link', 0, 300),
  twitter_link: stringOptional('Twitter Link', 0, 300),
  instagram_link: stringOptional('Instagram Link', 0, 300),
  youtube_link: stringOptional('Youtube Link', 0, 300),
  linkedin_link: stringOptional('Linkedin Link', 0, 300),
  pinterest_link: stringOptional('Pinterest Link', 0, 300),
  whats_app_chat_url: stringOptional('Whats App Chat Url', 0, 300),
  telegram_chat_url: stringOptional('Telegram Chat Url', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type ContactUsDetailDTO = z.infer<typeof ContactUsDetailSchema>;

// ContactUsDetail Query Schema
export const ContactUsDetailQuerySchema = BaseQuerySchema.extend({
  // Self Table
  contact_us_details_ids: multi_select_optional('ContactUsDetail'), // Multi-selection -> ContactUsDetail

  // Relations - Parent

  // Enums
});
export type ContactUsDetailQueryDTO = z.infer<
  typeof ContactUsDetailQuerySchema
>;

// Convert ContactUsDetail Data to API Payload
export const toContactUsDetailPayload = (
  row: ContactUsDetail,
): ContactUsDetailDTO => ({
  mobile_number: row.mobile_number || '',
  email: row.email || '',
  facebook_link: row.facebook_link || '',
  twitter_link: row.twitter_link || '',
  instagram_link: row.instagram_link || '',
  youtube_link: row.youtube_link || '',
  linkedin_link: row.linkedin_link || '',
  pinterest_link: row.pinterest_link || '',
  whats_app_chat_url: row.whats_app_chat_url || '',
  telegram_chat_url: row.telegram_chat_url || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New ContactUsDetail Payload
export const newContactUsDetailPayload = (): ContactUsDetailDTO => ({
  mobile_number: '',
  email: '',
  facebook_link: '',
  twitter_link: '',
  instagram_link: '',
  youtube_link: '',
  linkedin_link: '',
  pinterest_link: '',
  whats_app_chat_url: '',
  telegram_chat_url: '',

  status: Status.Active,

  time_zone_id: '',
});

// FAQ Create/Update Schema
export const FAQSchema = z.object({
  // Main Field Details
  faq_section: stringOptional('Faq Section', 0, 100),
  faq_header: stringOptional('Faq Header', 0, 100),
  faq_content: stringOptional('Faq Content', 0, 2000),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type FAQDTO = z.infer<typeof FAQSchema>;

// FAQ Query Schema
export const FAQQuerySchema = BaseQuerySchema.extend({
  // Self Table
  faq_ids: multi_select_optional('FAQ'), // Multi-selection -> FAQ

  // Relations - Parent

  // Enums
});
export type FAQQueryDTO = z.infer<typeof FAQQuerySchema>;

// Convert FAQ Data to API Payload
export const toFAQPayload = (row: FAQ): FAQDTO => ({
  faq_section: row.faq_section || '',
  faq_header: row.faq_header || '',
  faq_content: row.faq_content || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New FAQ Payload
export const newFAQPayload = (): FAQDTO => ({
  faq_section: '',
  faq_header: '',
  faq_content: '',

  status: Status.Active,

  time_zone_id: '',
});

// StaticPage Create/Update Schema
export const StaticPageSchema = z.object({
  // Main Field Details
  page_name: stringOptional('Page Name', 0, 100),
  page_code: stringOptional('Page Code', 0, 100),
  page_url: stringOptional('Page Url', 0, 300),
  page_content: stringOptional('Page Content', 0, 5000),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type StaticPageDTO = z.infer<typeof StaticPageSchema>;

// StaticPage Query Schema
export const StaticPageQuerySchema = BaseQuerySchema.extend({
  // Self Table
  page_ids: multi_select_optional('StaticPage'), // Multi-selection -> StaticPage

  // Relations - Parent

  // Enums
});
export type StaticPageQueryDTO = z.infer<typeof StaticPageQuerySchema>;

// Convert StaticPage Data to API Payload
export const toStaticPagePayload = (row: StaticPage): StaticPageDTO => ({
  page_name: row.page_name || '',
  page_code: row.page_code || '',
  page_url: row.page_url || '',
  page_content: row.page_content || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New StaticPage Payload
export const newStaticPagePayload = (): StaticPageDTO => ({
  page_name: '',
  page_code: '',
  page_url: '',
  page_content: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterMainCountry Create/Update Schema
export const MasterMainCountrySchema = z.object({
  // Main Field Details
  country_name: stringMandatory('Country Name', 2, 100),
  country_code: stringMandatory('Country Code', 2, 10),
  country_mobile_code: stringMandatory('Country Mobile Code', 2, 10),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterMainCountryDTO = z.infer<typeof MasterMainCountrySchema>;

// MasterMainCountry Query Schema
export const MasterMainCountryQuerySchema = BaseQuerySchema.extend({
  // Self Table
  country_ids: multi_select_optional('MasterMainCountry'), // Multi-selection -> MasterMainCountry

  // Relations - Parent

  // Enums
});
export type MasterMainCountryQueryDTO = z.infer<
  typeof MasterMainCountryQuerySchema
>;

// Convert MasterMainCountry Data to API Payload
export const toMasterMainCountryPayload = (
  row: MasterMainCountry,
): MasterMainCountryDTO => ({
  country_name: row.country_name || '',
  country_code: row.country_code || '',
  country_mobile_code: row.country_mobile_code || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterMainCountry Payload
export const newMasterMainCountryPayload = (): MasterMainCountryDTO => ({
  country_name: '',
  country_code: '',
  country_mobile_code: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterMainTimeZone Create/Update Schema
export const MasterMainTimeZoneSchema = z.object({
  // Relations - Parent
  country_id: single_select_mandatory('MasterMainCountry'), // Single-Selection -> MasterMainCountry

  // Main Field Details
  time_zone_code: stringMandatory('Time Zone Code', 2, 100),
  time_zone_identifier: stringMandatory('Time Zone Identifier', 2, 100),
  time_zone_abbrevation: stringMandatory('Time Zone Abbrevation', 2, 100),
  time_zone_offset: stringMandatory('Time Zone Offset', 2, 100),
  time_zone_offset_seconds: numberMandatory('Time Zone Offset Seconds', 0),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterMainTimeZoneDTO = z.infer<typeof MasterMainTimeZoneSchema>;

// MasterMainTimeZone Query Schema
export const MasterMainTimeZoneQuerySchema = BaseQuerySchema.extend({
  // Self Table
  time_zone_ids: multi_select_optional('MasterMainTimeZone'), // Multi-selection -> MasterMainTimeZone

  // Relations - Parent
  country_ids: multi_select_optional('MasterMainCountry'), // Multi-selection -> MasterMainCountry

  // Enums
});
export type MasterMainTimeZoneQueryDTO = z.infer<
  typeof MasterMainTimeZoneQuerySchema
>;

// Convert MasterMainTimeZone Data to API Payload
export const toMasterMainTimeZonePayload = (
  row: MasterMainTimeZone,
): MasterMainTimeZoneDTO => ({
  country_id: row.country_id || '',

  time_zone_code: row.time_zone_code || '',
  time_zone_identifier: row.time_zone_identifier || '',
  time_zone_abbrevation: row.time_zone_abbrevation || '',
  time_zone_offset: row.time_zone_offset || '',
  time_zone_offset_seconds: row.time_zone_offset_seconds ?? 0,

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterMainTimeZone Payload
export const newMasterMainTimeZonePayload = (): MasterMainTimeZoneDTO => ({
  country_id: '',

  time_zone_code: '',
  time_zone_identifier: '',
  time_zone_abbrevation: '',
  time_zone_offset: '',
  time_zone_offset_seconds: 0,

  status: Status.Active,

  time_zone_id: '',
});

// MasterMainDateFormat Create/Update Schema
export const MasterMainDateFormatSchema = z.object({
  // Main Field Details
  date_format_date: stringMandatory('Date Format Date', 2, 100),
  date_format_time: stringMandatory('Date Format Time', 2, 100),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterMainDateFormatDTO = z.infer<
  typeof MasterMainDateFormatSchema
>;

// MasterMainDateFormat Query Schema
export const MasterMainDateFormatQuerySchema = BaseQuerySchema.extend({
  // Self Table
  date_format_ids: multi_select_optional('MasterMainDateFormat'), // Multi-selection -> MasterMainDateFormat

  // Relations - Parent

  // Enums
});
export type MasterMainDateFormatQueryDTO = z.infer<
  typeof MasterMainDateFormatQuerySchema
>;

// Convert MasterMainDateFormat Data to API Payload
export const toMasterMainDateFormatPayload = (
  row: MasterMainDateFormat,
): MasterMainDateFormatDTO => ({
  date_format_date: row.date_format_date || '',
  date_format_time: row.date_format_time || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterMainDateFormat Payload
export const newMasterMainDateFormatPayload = (): MasterMainDateFormatDTO => ({
  date_format_date: '',
  date_format_time: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterChannelCategory Create/Update Schema
export const MasterChannelCategorySchema = z.object({
  // Main Field Details
  channel_category: stringMandatory('Channel Category', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterChannelCategoryDTO = z.infer<
  typeof MasterChannelCategorySchema
>;

// MasterChannelCategory Query Schema
export const MasterChannelCategoryQuerySchema = BaseQuerySchema.extend({
  // Self Table
  channel_category_ids: multi_select_optional('MasterChannelCategory'), // Multi-selection -> MasterChannelCategory

  // Relations - Parent

  // Enums
});
export type MasterChannelCategoryQueryDTO = z.infer<
  typeof MasterChannelCategoryQuerySchema
>;

// Convert MasterChannelCategory Data to API Payload
export const toMasterChannelCategoryPayload = (
  row: MasterChannelCategory,
): MasterChannelCategoryDTO => ({
  channel_category: row.channel_category || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterChannelCategory Payload
export const newMasterChannelCategoryPayload =
  (): MasterChannelCategoryDTO => ({
    channel_category: '',
    description: '',

    status: Status.Active,

    time_zone_id: '',
  });

// MasterReportReason Create/Update Schema
export const MasterReportReasonSchema = z.object({
  // Main Field Details
  report_reason: stringMandatory('Report Reason', 2, 100),
  description: stringOptional('Description', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterReportReasonDTO = z.infer<typeof MasterReportReasonSchema>;

// MasterReportReason Query Schema
export const MasterReportReasonQuerySchema = BaseQuerySchema.extend({
  // Self Table
  report_reason_ids: multi_select_optional('MasterReportReason'), // Multi-selection -> MasterReportReason

  // Relations - Parent

  // Enums
});
export type MasterReportReasonQueryDTO = z.infer<
  typeof MasterReportReasonQuerySchema
>;

// Convert MasterReportReason Data to API Payload
export const toMasterReportReasonPayload = (
  row: MasterReportReason,
): MasterReportReasonDTO => ({
  report_reason: row.report_reason || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterReportReason Payload
export const newMasterReportReasonPayload = (): MasterReportReasonDTO => ({
  report_reason: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterJobType Create/Update Schema
export const MasterJobTypeSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  job_type: stringMandatory('Job Type', 2, 100),
  description: stringOptional('Description', 0, 300),

  //Index

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterJobTypeDTO = z.infer<typeof MasterJobTypeSchema>;

// MasterJobType Query Schema
export const MasterJobTypeQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_type_ids: multi_select_optional('MasterJobType'), // Multi-selection -> MasterJobType

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterJobTypeQueryDTO = z.infer<typeof MasterJobTypeQuerySchema>;

// Convert MasterJobType Data to API Payload
export const toMasterJobTypePayload = (
  row: MasterJobType,
): MasterJobTypeDTO => ({
  user_id: row.user_id || '',

  job_type: row.job_type || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterJobType Payload
export const newMasterJobTypePayload = (): MasterJobTypeDTO => ({
  user_id: '',

  job_type: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterEmploymentType Create/Update Schema
export const MasterEmploymentTypeSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  employment_type: stringMandatory('Employment Type', 2, 100),
  description: stringOptional('Description', 0, 300),

  //Index

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterEmploymentTypeDTO = z.infer<
  typeof MasterEmploymentTypeSchema
>;

// MasterEmploymentType Query Schema
export const MasterEmploymentTypeQuerySchema = BaseQuerySchema.extend({
  // Self Table
  employment_type_ids: multi_select_optional('MasterEmploymentType'), // Multi-selection -> MasterEmploymentType

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterEmploymentTypeQueryDTO = z.infer<
  typeof MasterEmploymentTypeQuerySchema
>;

// Convert MasterEmploymentType Data to API Payload
export const toMasterEmploymentTypePayload = (
  row: MasterEmploymentType,
): MasterEmploymentTypeDTO => ({
  user_id: row.user_id || '',

  employment_type: row.employment_type || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterEmploymentType Payload
export const newMasterEmploymentTypePayload = (): MasterEmploymentTypeDTO => ({
  user_id: '',

  employment_type: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterWorkplaceType Create/Update Schema
export const MasterWorkplaceTypeSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  workplace_type: stringMandatory('Workplace Type', 2, 100),
  description: stringOptional('Description', 0, 300),

  //Index

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterWorkplaceTypeDTO = z.infer<typeof MasterWorkplaceTypeSchema>;

// MasterWorkplaceType Query Schema
export const MasterWorkplaceTypeQuerySchema = BaseQuerySchema.extend({
  // Self Table
  workplace_type_ids: multi_select_optional('MasterWorkplaceType'), // Multi-selection -> MasterWorkplaceType

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterWorkplaceTypeQueryDTO = z.infer<
  typeof MasterWorkplaceTypeQuerySchema
>;

// Convert MasterWorkplaceType Data to API Payload
export const toMasterWorkplaceTypePayload = (
  row: MasterWorkplaceType,
): MasterWorkplaceTypeDTO => ({
  user_id: row.user_id || '',

  workplace_type: row.workplace_type || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterWorkplaceType Payload
export const newMasterWorkplaceTypePayload = (): MasterWorkplaceTypeDTO => ({
  user_id: '',

  workplace_type: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterSalaryPeriod Create/Update Schema
export const MasterSalaryPeriodSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  salary_period: stringMandatory('Salary Period', 2, 100),
  description: stringOptional('Description', 0, 300),

  //Index

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterSalaryPeriodDTO = z.infer<typeof MasterSalaryPeriodSchema>;

// MasterSalaryPeriod Query Schema
export const MasterSalaryPeriodQuerySchema = BaseQuerySchema.extend({
  // Self Table
  salary_period_ids: multi_select_optional('MasterSalaryPeriod'), // Multi-selection -> MasterSalaryPeriod

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterSalaryPeriodQueryDTO = z.infer<
  typeof MasterSalaryPeriodQuerySchema
>;

// Convert MasterSalaryPeriod Data to API Payload
export const toMasterSalaryPeriodPayload = (
  row: MasterSalaryPeriod,
): MasterSalaryPeriodDTO => ({
  user_id: row.user_id || '',

  salary_period: row.salary_period || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterSalaryPeriod Payload
export const newMasterSalaryPeriodPayload = (): MasterSalaryPeriodDTO => ({
  user_id: '',

  salary_period: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterJobCategory Create/Update Schema
export const MasterJobCategorySchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  job_category: stringMandatory('Job Category', 2, 100),
  description: stringOptional('Description', 0, 300),

  //Index

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterJobCategoryDTO = z.infer<typeof MasterJobCategorySchema>;

// MasterJobCategory Query Schema
export const MasterJobCategoryQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_category_ids: multi_select_optional('MasterJobCategory'), // Multi-selection -> MasterJobCategory

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterJobCategoryQueryDTO = z.infer<
  typeof MasterJobCategoryQuerySchema
>;

// Convert MasterJobCategory Data to API Payload
export const toMasterJobCategoryPayload = (
  row: MasterJobCategory,
): MasterJobCategoryDTO => ({
  user_id: row.user_id || '',

  job_category: row.job_category || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterJobCategory Payload
export const newMasterJobCategoryPayload = (): MasterJobCategoryDTO => ({
  user_id: '',

  job_category: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterEducationLevel Create/Update Schema
export const MasterEducationLevelSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  education_level: stringMandatory('Education Level', 2, 100),
  description: stringOptional('Description', 0, 300),

  //Index

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterEducationLevelDTO = z.infer<
  typeof MasterEducationLevelSchema
>;

// MasterEducationLevel Query Schema
export const MasterEducationLevelQuerySchema = BaseQuerySchema.extend({
  // Self Table
  education_level_ids: multi_select_optional('MasterEducationLevel'), // Multi-selection -> MasterEducationLevel

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterEducationLevelQueryDTO = z.infer<
  typeof MasterEducationLevelQuerySchema
>;

// Convert MasterEducationLevel Data to API Payload
export const toMasterEducationLevelPayload = (
  row: MasterEducationLevel,
): MasterEducationLevelDTO => ({
  user_id: row.user_id || '',

  education_level: row.education_level || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterEducationLevel Payload
export const newMasterEducationLevelPayload = (): MasterEducationLevelDTO => ({
  user_id: '',

  education_level: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterShiftType Create/Update Schema
export const MasterShiftTypeSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  shift_type: stringMandatory('Shift Type', 2, 100),
  description: stringOptional('Description', 0, 300),

  //Index

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterShiftTypeDTO = z.infer<typeof MasterShiftTypeSchema>;

// MasterShiftType Query Schema
export const MasterShiftTypeQuerySchema = BaseQuerySchema.extend({
  // Self Table
  shift_type_ids: multi_select_optional('MasterShiftType'), // Multi-selection -> MasterShiftType

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterShiftTypeQueryDTO = z.infer<
  typeof MasterShiftTypeQuerySchema
>;

// Convert MasterShiftType Data to API Payload
export const toMasterShiftTypePayload = (
  row: MasterShiftType,
): MasterShiftTypeDTO => ({
  user_id: row.user_id || '',

  shift_type: row.shift_type || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterShiftType Payload
export const newMasterShiftTypePayload = (): MasterShiftTypeDTO => ({
  user_id: '',

  shift_type: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterLocation Create/Update Schema
export const MasterLocationSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  city_name: stringMandatory('City Name', 2, 100),
  state_name: stringMandatory('State Name', 2, 100),
  country_name: stringMandatory('Country Name', 2, 100),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterLocationDTO = z.infer<typeof MasterLocationSchema>;

// MasterLocation Query Schema
export const MasterLocationQuerySchema = BaseQuerySchema.extend({
  // Self Table
  location_ids: multi_select_optional('MasterLocation'), // Multi-selection -> MasterLocation

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterLocationQueryDTO = z.infer<typeof MasterLocationQuerySchema>;

// Convert MasterLocation Data to API Payload
export const toMasterLocationPayload = (
  row: MasterLocation,
): MasterLocationDTO => ({
  user_id: row.user_id || '',

  city_name: row.city_name || '',
  state_name: row.state_name || '',
  country_name: row.country_name || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterLocation Payload
export const newMasterLocationPayload = (): MasterLocationDTO => ({
  user_id: '',

  city_name: '',
  state_name: '',
  country_name: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterSkill Create/Update Schema
export const MasterSkillSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  skill: stringMandatory('Skill', 2, 100),
  description: stringOptional('Description', 0, 300),

  //Index

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterSkillDTO = z.infer<typeof MasterSkillSchema>;

// MasterSkill Query Schema
export const MasterSkillQuerySchema = BaseQuerySchema.extend({
  // Self Table
  skill_ids: multi_select_optional('MasterSkill'), // Multi-selection -> MasterSkill

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterSkillQueryDTO = z.infer<typeof MasterSkillQuerySchema>;

// Convert MasterSkill Data to API Payload
export const toMasterSkillPayload = (row: MasterSkill): MasterSkillDTO => ({
  user_id: row.user_id || '',

  skill: row.skill || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterSkill Payload
export const newMasterSkillPayload = (): MasterSkillDTO => ({
  user_id: '',

  skill: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterLanguage Create/Update Schema
export const MasterLanguageSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  language: stringMandatory('Language', 2, 100),
  description: stringOptional('Description', 0, 300),

  //Index

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterLanguageDTO = z.infer<typeof MasterLanguageSchema>;

// MasterLanguage Query Schema
export const MasterLanguageQuerySchema = BaseQuerySchema.extend({
  // Self Table
  language_ids: multi_select_optional('MasterLanguage'), // Multi-selection -> MasterLanguage

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterLanguageQueryDTO = z.infer<typeof MasterLanguageQuerySchema>;

// Convert MasterLanguage Data to API Payload
export const toMasterLanguagePayload = (
  row: MasterLanguage,
): MasterLanguageDTO => ({
  user_id: row.user_id || '',

  language: row.language || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterLanguage Payload
export const newMasterLanguagePayload = (): MasterLanguageDTO => ({
  user_id: '',

  language: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterUrl Create/Update Schema
export const MasterUrlSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  url: stringMandatory('Url', 2, 100),
  description: stringOptional('Description', 0, 300),

  //Index

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterUrlDTO = z.infer<typeof MasterUrlSchema>;

// MasterUrl Query Schema
export const MasterUrlQuerySchema = BaseQuerySchema.extend({
  // Self Table
  url_ids: multi_select_optional('MasterUrl'), // Multi-selection -> MasterUrl

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterUrlQueryDTO = z.infer<typeof MasterUrlQuerySchema>;

// Convert MasterUrl Data to API Payload
export const toMasterUrlPayload = (row: MasterUrl): MasterUrlDTO => ({
  user_id: row.user_id || '',

  url: row.url || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterUrl Payload
export const newMasterUrlPayload = (): MasterUrlDTO => ({
  user_id: '',

  url: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterJobTitle Create/Update Schema
export const MasterJobTitleSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  job_title: stringMandatory('Job Title', 2, 100),
  description: stringOptional('Description', 0, 300),

  //Index

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterJobTitleDTO = z.infer<typeof MasterJobTitleSchema>;

// MasterJobTitle Query Schema
export const MasterJobTitleQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_title_ids: multi_select_optional('MasterJobTitle'), // Multi-selection -> MasterJobTitle

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterJobTitleQueryDTO = z.infer<typeof MasterJobTitleQuerySchema>;

// Convert MasterJobTitle Data to API Payload
export const toMasterJobTitlePayload = (
  row: MasterJobTitle,
): MasterJobTitleDTO => ({
  user_id: row.user_id || '',

  job_title: row.job_title || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterJobTitle Payload
export const newMasterJobTitlePayload = (): MasterJobTitleDTO => ({
  user_id: '',

  job_title: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterJobCompany Create/Update Schema
export const MasterJobCompanySchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Logo
  company_logo_url: stringOptional('Company Logo Url', 0, 300),
  company_logo_key: stringOptional('Company Logo Key', 0, 300),
  company_logo_name: stringOptional('Company Logo Name', 0, 300),

  // Main Field Details
  company_name: stringMandatory('Company Name', 2, 100),
  description: stringOptional('Description', 0, 300),

  //Index

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterJobCompanyDTO = z.infer<typeof MasterJobCompanySchema>;

// MasterJobCompanyLogo Schema
export const MasterJobCompanyLogoSchema = z.object({
  // Logo
  company_logo_url: stringMandatory('Company Logo URL', 0, 300),
  company_logo_key: stringMandatory('Company Logo Key', 0, 300),
  company_logo_name: stringMandatory('Company Logo Name', 0, 300),
});
export type MasterJobCompanyLogoDTO = z.infer<
  typeof MasterJobCompanyLogoSchema
>;

// MasterJobCompany Query Schema
export const MasterJobCompanyQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_company_ids: multi_select_optional('MasterJobCompany'), // Multi-selection -> MasterJobCompany

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterJobCompanyQueryDTO = z.infer<
  typeof MasterJobCompanyQuerySchema
>;

// Convert MasterJobCompany Data to API Payload
export const toMasterJobCompanyPayload = (
  row: MasterJobCompany,
): MasterJobCompanyDTO => ({
  user_id: row.user_id || '',

  company_logo_url: row.company_logo_url || '',
  company_logo_key: row.company_logo_key || '',
  company_logo_name: row.company_logo_name || '',
  company_name: row.company_name || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterJobCompany Payload
export const newMasterJobCompanyPayload = (): MasterJobCompanyDTO => ({
  user_id: '',

  company_logo_url: '',
  company_logo_key: '',
  company_logo_name: '',
  company_name: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterEventType Create/Update Schema
export const MasterEventTypeSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  event_type: stringMandatory('Event Type', 2, 100),
  description: stringOptional('Description', 0, 300),

  //Index

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterEventTypeDTO = z.infer<typeof MasterEventTypeSchema>;

// MasterEventType Query Schema
export const MasterEventTypeQuerySchema = BaseQuerySchema.extend({
  // Self Table
  event_type_ids: multi_select_optional('MasterEventType'), // Multi-selection -> MasterEventType

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterEventTypeQueryDTO = z.infer<
  typeof MasterEventTypeQuerySchema
>;

// Convert MasterEventType Data to API Payload
export const toMasterEventTypePayload = (
  row: MasterEventType,
): MasterEventTypeDTO => ({
  user_id: row.user_id || '',

  event_type: row.event_type || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterEventType Payload
export const newMasterEventTypePayload = (): MasterEventTypeDTO => ({
  user_id: '',

  event_type: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// MasterEventCategory Create/Update Schema
export const MasterEventCategorySchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  event_category: stringMandatory('Event Category', 2, 100),
  description: stringOptional('Description', 0, 300),

  //Index

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterEventCategoryDTO = z.infer<typeof MasterEventCategorySchema>;

// MasterEventCategory Query Schema
export const MasterEventCategoryQuerySchema = BaseQuerySchema.extend({
  // Self Table
  event_category_ids: multi_select_optional('MasterEventCategory'), // Multi-selection -> MasterEventCategory

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type MasterEventCategoryQueryDTO = z.infer<
  typeof MasterEventCategoryQuerySchema
>;

// Convert MasterEventCategory Data to API Payload
export const toMasterEventCategoryPayload = (
  row: MasterEventCategory,
): MasterEventCategoryDTO => ({
  user_id: row.user_id || '',

  event_category: row.event_category || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterEventCategory Payload
export const newMasterEventCategoryPayload = (): MasterEventCategoryDTO => ({
  user_id: '',

  event_category: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// UserAdmin Create/Update Schema
export const UserAdminSchema = z.object({
  // Image
  admin_image_url: stringOptional('Admin Image Url', 0, 300),
  admin_image_key: stringOptional('Admin Image Key', 0, 300),
  admin_image_name: stringOptional('Admin Image Name', 0, 300),

  // Main Field Details
  admin_name: stringMandatory('Admin Name', 2, 100),
  email: stringMandatory('Email', 2, 100),
  mobile: stringOptional('Mobile', 0, 15),
  password: stringOptional('Password', 0, 20),
  admin_role: enumMandatory('Admin Role', AdminRole, AdminRole.MasterAdmin),
  admin_details: stringOptional('Admin Details', 0, 300),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs
  UserAdminFileSchema: z
    .array(
      z.lazy(() =>
        UserAdminFileSchema.extend({
          admin_id: single_select_optional('UserAdmin'), // Single-Selection -> UserAdmin
        }),
      ),
    )
    .optional()
    .default([]),

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserAdminDTO = z.infer<typeof UserAdminSchema>;

// UserAdminImage Schema
export const UserAdminImageSchema = z.object({
  // Image
  admin_image_url: stringMandatory('Admin Image URL', 0, 300),
  admin_image_key: stringMandatory('Admin Image Key', 0, 300),
  admin_image_name: stringMandatory('Admin Image Name', 0, 300),
});
export type UserAdminImageDTO = z.infer<typeof UserAdminImageSchema>;

// UserAdmin Query Schema
export const UserAdminQuerySchema = BaseQuerySchema.extend({
  // Self Table
  admin_ids: multi_select_optional('UserAdmin'), // Multi-selection -> UserAdmin

  // Relations - Parent

  // Enums
  admin_role: enumArrayOptional(
    'Admin Role',
    AdminRole,
    getAllEnums(AdminRole),
  ),
});
export type UserAdminQueryDTO = z.infer<typeof UserAdminQuerySchema>;

// Convert UserAdmin Data to API Payload
export const toUserAdminPayload = (row: UserAdmin): UserAdminDTO => ({
  admin_image_url: row.admin_image_url || '',
  admin_image_key: row.admin_image_key || '',
  admin_image_name: row.admin_image_name || '',
  admin_name: row.admin_name || '',
  email: row.email || '',
  mobile: row.mobile || '',
  password: row.password || '',
  admin_role: row.admin_role || AdminRole.MasterAdmin,
  admin_details: row.admin_details || '',

  status: row.status || Status.Active,

  UserAdminFileSchema: (row.UserAdminFile || []).map((item) => ({
    admin_id: item.admin_id || '',

    usage_type: item.usage_type || '',
    file_type: item.file_type || FileType.Image,
    file_url: item.file_url || '',
    file_key: item.file_key || '',
    file_name: item.file_name || '',
    file_description: item.file_description || '',
    file_size: item.file_size ?? 0,
    file_metadata: item.file_metadata || {},

    status: item.status || Status.Active,

    time_zone_id: '',
  })),

  time_zone_id: '',
});

// Create New UserAdmin Payload
export const newUserAdminPayload = (): UserAdminDTO => ({
  admin_image_url: '',
  admin_image_key: '',
  admin_image_name: '',
  admin_name: '',
  email: '',
  mobile: '',
  password: '',
  admin_role: AdminRole.MasterAdmin,
  admin_details: '',

  status: Status.Active,

  UserAdminFileSchema: [],

  time_zone_id: '',
});

// UserAdminFile Create/Update Schema
export const UserAdminFileSchema = z.object({
  // Relations - Parent
  admin_id: single_select_mandatory('UserAdmin'), // Single-Selection -> UserAdmin

  // Main Field Details

  // Usage Type -> Aadhaar Front Image, Aadhaar Back Image,  Pan Image
  usage_type: stringMandatory('Usage Type', 2, 100),

  // File Details
  file_type: enumMandatory('File Type', FileType, FileType.Image),
  file_url: stringOptional('File Url', 0, 300),
  file_key: stringOptional('File Key', 0, 300),
  file_name: stringOptional('File Name', 0, 300),
  file_description: stringOptional('File Description', 0, 2000),
  file_size: numberOptional('File Size', 0),
  file_metadata: dynamicJsonSchema('File Metadata', {}),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserAdminFileDTO = z.infer<typeof UserAdminFileSchema>;

// UserAdminFile Query Schema
export const UserAdminFileQuerySchema = BaseQuerySchema.extend({
  // Self Table
  admin_file_ids: multi_select_optional('UserAdminFile'), // Multi-selection -> UserAdminFile

  // Relations - Parent
  admin_ids: multi_select_optional('UserAdmin'), // Multi-selection -> UserAdmin

  // Enums
  file_type: enumArrayOptional('File Type', FileType, getAllEnums(FileType)),
});
export type UserAdminFileQueryDTO = z.infer<typeof UserAdminFileQuerySchema>;

// Convert UserAdminFile Data to API Payload
export const toUserAdminFilePayload = (
  row: UserAdminFile,
): UserAdminFileDTO => ({
  admin_id: row.admin_id || '',

  usage_type: row.usage_type || '',
  file_type: row.file_type || FileType.Image,
  file_url: row.file_url || '',
  file_key: row.file_key || '',
  file_name: row.file_name || '',
  file_description: row.file_description || '',
  file_size: row.file_size ?? 0,
  file_metadata: row.file_metadata || {},

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New UserAdminFile Payload
export const newUserAdminFilePayload = (): UserAdminFileDTO => ({
  admin_id: '',

  usage_type: '',
  file_type: FileType.Image,
  file_url: '',
  file_key: '',
  file_name: '',
  file_description: '',
  file_size: 0,
  file_metadata: {},

  status: Status.Active,

  time_zone_id: '',
});

// UserAdminLoginPush Create/Update Schema
export const UserAdminLoginPushSchema = z.object({
  // Relations - Parent
  admin_id: single_select_mandatory('UserAdmin'), // Single-Selection -> UserAdmin

  // Main Field Details
  fcm_token: stringMandatory('Fcm Token', 2, 500),
  platform: enumMandatory('Platform', LoginFrom, LoginFrom.Web),
  user_agent: stringOptional('User Agent', 0, 500),
  ip_address: stringOptional('Ip Address', 0, 45),
  device_id: stringOptional('Device', 0, 120),
  device_model: stringOptional('Device Model', 0, 120),
  os_name: stringOptional('Os Name', 0, 80),
  os_version: stringOptional('Os Version', 0, 60),
  browser_name: stringOptional('Browser Name', 0, 80),
  browser_version: stringOptional('Browser Version', 0, 60),
  app_version: stringOptional('App Version', 0, 40),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserAdminLoginPushDTO = z.infer<typeof UserAdminLoginPushSchema>;

// UserAdminLoginPush Query Schema
export const UserAdminLoginPushQuerySchema = BaseQuerySchema.extend({
  // Self Table
  admin_login_push_ids: multi_select_optional('UserAdminLoginPush'), // Multi-selection -> UserAdminLoginPush

  // Relations - Parent
  admin_ids: multi_select_optional('UserAdmin'), // Multi-selection -> UserAdmin

  // Enums
  platform: enumArrayOptional('Platform', LoginFrom, getAllEnums(LoginFrom)),
});
export type UserAdminLoginPushQueryDTO = z.infer<
  typeof UserAdminLoginPushQuerySchema
>;

// Convert UserAdminLoginPush Data to API Payload
export const toUserAdminLoginPushPayload = (
  row: UserAdminLoginPush,
): UserAdminLoginPushDTO => ({
  admin_id: row.admin_id || '',

  fcm_token: row.fcm_token || '',
  platform: row.platform || LoginFrom.Web,
  user_agent: row.user_agent || '',
  ip_address: row.ip_address || '',
  device_id: row.device_id || '',
  device_model: row.device_model || '',
  os_name: row.os_name || '',
  os_version: row.os_version || '',
  browser_name: row.browser_name || '',
  browser_version: row.browser_version || '',
  app_version: row.app_version || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New UserAdminLoginPush Payload
export const newUserAdminLoginPushPayload = (): UserAdminLoginPushDTO => ({
  admin_id: '',

  fcm_token: '',
  platform: LoginFrom.Web,
  user_agent: '',
  ip_address: '',
  device_id: '',
  device_model: '',
  os_name: '',
  os_version: '',
  browser_name: '',
  browser_version: '',
  app_version: '',

  status: Status.Active,

  time_zone_id: '',
});

// User Create/Update Schema
export const UserSchema = z.object({
  // Profile Image
  user_profile_image_url: stringOptional('User Profile Image Url', 0, 300),
  user_profile_image_key: stringOptional('User Profile Image Key', 0, 300),
  user_profile_image_name: stringOptional('User Profile Image Name', 0, 300),

  // Banner Image
  user_banner_image_url: stringOptional('User Banner Image Url', 0, 300),
  user_banner_image_key: stringOptional('User Banner Image Key', 0, 300),
  user_banner_image_name: stringOptional('User Banner Image Name', 0, 300),

  // Main Field Details
  first_name: stringMandatory('First Name', 2, 100),
  last_name: stringOptional('Last Name', 0, 100),
  email: stringMandatory('Email', 2, 100),
  username: stringOptional('Username', 0, 100),
  mobile: stringOptional('Mobile', 0, 15),
  password: stringOptional('Password', 0, 255),
  user_type: enumMandatory('User Type', UserType, UserType.User),
  account_type: enumMandatory('Account Type', AccountType, AccountType.Public),
  user_details: stringOptional('User Details', 0, 500),

  // Counters
  friends_count: numberMandatory('Friends Count', 0),
  followers_count: numberMandatory('Followers Count', 0),
  following_count: numberMandatory('Following Count', 0),
  post_count: numberMandatory('Post Count', 0),
  job_count: numberMandatory('Job Count', 0),
  event_count: numberMandatory('Event Count', 0),

  // Masters

  // Resume

  // Block

  // Friend

  // Follow

  // Social Summary

  // Admin Groups

  // Channels

  // Organisations

  // Posts

  // Jobs

  // Events

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserDTO = z.infer<typeof UserSchema>;

// UserProfileImage Schema
export const UserProfileImageSchema = z.object({
  // Profile Image
  user_profile_image_url: stringMandatory('User Profile Image URL', 0, 300),
  user_profile_image_key: stringMandatory('User Profile Image Key', 0, 300),
  user_profile_image_name: stringMandatory('User Profile Image Name', 0, 300),
});
export type UserProfileImageDTO = z.infer<typeof UserProfileImageSchema>;

// UserBannerImage Schema
export const UserBannerImageSchema = z.object({
  // Banner Image
  user_banner_image_url: stringMandatory('User Banner Image URL', 0, 300),
  user_banner_image_key: stringMandatory('User Banner Image Key', 0, 300),
  user_banner_image_name: stringMandatory('User Banner Image Name', 0, 300),
});
export type UserBannerImageDTO = z.infer<typeof UserBannerImageSchema>;

// User Query Schema
export const UserQuerySchema = BaseQuerySchema.extend({
  // Self Table
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Relations - Parent

  // Enums
  user_type: enumArrayOptional('User Type', UserType, getAllEnums(UserType)),
  account_type: enumArrayOptional(
    'Account Type',
    AccountType,
    getAllEnums(AccountType),
  ),
});
export type UserQueryDTO = z.infer<typeof UserQuerySchema>;

// Convert User Data to API Payload
export const toUserPayload = (row: User): UserDTO => ({
  user_profile_image_url: row.user_profile_image_url || '',
  user_profile_image_key: row.user_profile_image_key || '',
  user_profile_image_name: row.user_profile_image_name || '',
  user_banner_image_url: row.user_banner_image_url || '',
  user_banner_image_key: row.user_banner_image_key || '',
  user_banner_image_name: row.user_banner_image_name || '',
  first_name: row.first_name || '',
  last_name: row.last_name || '',
  email: row.email || '',
  username: row.username || '',
  mobile: row.mobile || '',
  password: row.password || '',
  user_type: row.user_type || UserType.User,
  account_type: row.account_type || AccountType.Public,
  user_details: row.user_details || '',
  friends_count: row.friends_count ?? 0,
  followers_count: row.followers_count ?? 0,
  following_count: row.following_count ?? 0,
  post_count: row.post_count ?? 0,
  job_count: row.job_count ?? 0,
  event_count: row.event_count ?? 0,

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New User Payload
export const newUserPayload = (): UserDTO => ({
  user_profile_image_url: '',
  user_profile_image_key: '',
  user_profile_image_name: '',
  user_banner_image_url: '',
  user_banner_image_key: '',
  user_banner_image_name: '',
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  mobile: '',
  password: '',
  user_type: UserType.User,
  account_type: AccountType.Public,
  user_details: '',
  friends_count: 0,
  followers_count: 0,
  following_count: 0,
  post_count: 0,
  job_count: 0,
  event_count: 0,

  status: Status.Active,

  time_zone_id: '',
});

// UserLoginPush Create/Update Schema
export const UserLoginPushSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  fcm_token: stringMandatory('Fcm Token', 2, 500),
  platform: enumMandatory('Platform', LoginFrom, LoginFrom.Web),
  user_agent: stringOptional('User Agent', 0, 500),
  ip_address: stringOptional('Ip Address', 0, 45),
  device_id: stringOptional('Device', 0, 120),
  device_model: stringOptional('Device Model', 0, 120),
  os_name: stringOptional('Os Name', 0, 80),
  os_version: stringOptional('Os Version', 0, 60),
  browser_name: stringOptional('Browser Name', 0, 80),
  browser_version: stringOptional('Browser Version', 0, 60),
  app_version: stringOptional('App Version', 0, 40),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserLoginPushDTO = z.infer<typeof UserLoginPushSchema>;

// UserLoginPush Query Schema
export const UserLoginPushQuerySchema = BaseQuerySchema.extend({
  // Self Table
  user_login_push_ids: multi_select_optional('UserLoginPush'), // Multi-selection -> UserLoginPush

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
  platform: enumArrayOptional('Platform', LoginFrom, getAllEnums(LoginFrom)),
});
export type UserLoginPushQueryDTO = z.infer<typeof UserLoginPushQuerySchema>;

// Convert UserLoginPush Data to API Payload
export const toUserLoginPushPayload = (
  row: UserLoginPush,
): UserLoginPushDTO => ({
  user_id: row.user_id || '',

  fcm_token: row.fcm_token || '',
  platform: row.platform || LoginFrom.Web,
  user_agent: row.user_agent || '',
  ip_address: row.ip_address || '',
  device_id: row.device_id || '',
  device_model: row.device_model || '',
  os_name: row.os_name || '',
  os_version: row.os_version || '',
  browser_name: row.browser_name || '',
  browser_version: row.browser_version || '',
  app_version: row.app_version || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New UserLoginPush Payload
export const newUserLoginPushPayload = (): UserLoginPushDTO => ({
  user_id: '',

  fcm_token: '',
  platform: LoginFrom.Web,
  user_agent: '',
  ip_address: '',
  device_id: '',
  device_model: '',
  os_name: '',
  os_version: '',
  browser_name: '',
  browser_version: '',
  app_version: '',

  status: Status.Active,

  time_zone_id: '',
});

// UserResume Create/Update Schema
export const UserResumeSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User
  location_id: single_select_mandatory('MasterLocation'), // Single-Selection -> MasterLocation

  // Image
  resume_image_url: stringOptional('Resume Image Url', 0, 300),
  resume_image_key: stringOptional('Resume Image Key', 0, 300),
  resume_image_name: stringOptional('Resume Image Name', 0, 300),

  // Main Field Details
  resume_full_name: stringOptional('Resume Full Name', 0, 100),
  resume_email: stringOptional('Resume Email', 0, 100),
  resume_mobile: stringOptional('Resume Mobile', 0, 15),
  headline: stringOptional('Headline', 0, 300),
  summary: stringOptional('Summary', 0, 5000),
  hash_tech_stack: stringOptional('Hash Tech Stack', 0, 300),

  // Contact Details (Editable)

  // One Resume per User

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserResumeDTO = z.infer<typeof UserResumeSchema>;

// UserResumeImage Schema
export const UserResumeImageSchema = z.object({
  // Image
  resume_image_url: stringMandatory('Resume Image URL', 0, 300),
  resume_image_key: stringMandatory('Resume Image Key', 0, 300),
  resume_image_name: stringMandatory('Resume Image Name', 0, 300),
});
export type UserResumeImageDTO = z.infer<typeof UserResumeImageSchema>;

// UserResume Query Schema
export const UserResumeQuerySchema = BaseQuerySchema.extend({
  // Self Table
  resume_ids: multi_select_optional('UserResume'), // Multi-selection -> UserResume

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
  location_ids: multi_select_optional('MasterLocation'), // Multi-selection -> MasterLocation

  // Enums
});
export type UserResumeQueryDTO = z.infer<typeof UserResumeQuerySchema>;

// Convert UserResume Data to API Payload
export const toUserResumePayload = (row: UserResume): UserResumeDTO => ({
  user_id: row.user_id || '',
  location_id: row.location_id || '',

  resume_image_url: row.resume_image_url || '',
  resume_image_key: row.resume_image_key || '',
  resume_image_name: row.resume_image_name || '',
  resume_full_name: row.resume_full_name || '',
  resume_email: row.resume_email || '',
  resume_mobile: row.resume_mobile || '',
  headline: row.headline || '',
  summary: row.summary || '',
  hash_tech_stack: row.hash_tech_stack || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New UserResume Payload
export const newUserResumePayload = (): UserResumeDTO => ({
  user_id: '',
  location_id: '',

  resume_image_url: '',
  resume_image_key: '',
  resume_image_name: '',
  resume_full_name: '',
  resume_email: '',
  resume_mobile: '',
  headline: '',
  summary: '',
  hash_tech_stack: '',

  status: Status.Active,

  time_zone_id: '',
});

// ResumeFile Create/Update Schema
export const ResumeFileSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Usage Type
  usage_type: stringMandatory('Usage Type', 2, 100),

  // File Details
  file_type: enumMandatory('File Type', FileType, FileType.PDF),
  file_url: stringOptional('File Url', 0, 300),
  file_key: stringOptional('File Key', 0, 300),
  file_name: stringOptional('File Name', 0, 300),
  file_description: stringOptional('File Description', 0, 2000),
  file_size: numberOptional('File Size', 0),
  file_metadata: dynamicJsonSchema('File Metadata', {}),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type ResumeFileDTO = z.infer<typeof ResumeFileSchema>;

// ResumeFile Query Schema
export const ResumeFileQuerySchema = BaseQuerySchema.extend({
  // Self Table
  resume_file_ids: multi_select_optional('ResumeFile'), // Multi-selection -> ResumeFile

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
  file_type: enumArrayOptional('File Type', FileType, getAllEnums(FileType)),
});
export type ResumeFileQueryDTO = z.infer<typeof ResumeFileQuerySchema>;

// Convert ResumeFile Data to API Payload
export const toResumeFilePayload = (row: ResumeFile): ResumeFileDTO => ({
  user_id: row.user_id || '',

  usage_type: row.usage_type || '',
  file_type: row.file_type || FileType.PDF,
  file_url: row.file_url || '',
  file_key: row.file_key || '',
  file_name: row.file_name || '',
  file_description: row.file_description || '',
  file_size: row.file_size ?? 0,
  file_metadata: row.file_metadata || {},

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New ResumeFile Payload
export const newResumeFilePayload = (): ResumeFileDTO => ({
  user_id: '',

  usage_type: '',
  file_type: FileType.PDF,
  file_url: '',
  file_key: '',
  file_name: '',
  file_description: '',
  file_size: 0,
  file_metadata: {},

  status: Status.Active,

  time_zone_id: '',
});

// ResumeExperience Create/Update Schema
export const ResumeExperienceSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User
  job_company_id: single_select_mandatory('MasterJobCompany'), // Single-Selection -> MasterJobCompany
  job_title_id: single_select_mandatory('MasterJobTitle'), // Single-Selection -> MasterJobTitle
  employment_type_id: single_select_mandatory('MasterEmploymentType'), // Single-Selection -> MasterEmploymentType
  location_id: single_select_mandatory('MasterLocation'), // Single-Selection -> MasterLocation

  // Main Field Details
  start_date: dateOptional('Start Date'),
  end_date: dateOptional('End Date'),
  is_current: enumMandatory('Is Current', YesNo, YesNo.No),
  description: stringOptional('Description', 0, 5000),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type ResumeExperienceDTO = z.infer<typeof ResumeExperienceSchema>;

// ResumeExperience Query Schema
export const ResumeExperienceQuerySchema = BaseQuerySchema.extend({
  // Self Table
  resume_experience_ids: multi_select_optional('ResumeExperience'), // Multi-selection -> ResumeExperience

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
  job_company_ids: multi_select_optional('MasterJobCompany'), // Multi-selection -> MasterJobCompany
  job_title_ids: multi_select_optional('MasterJobTitle'), // Multi-selection -> MasterJobTitle
  employment_type_ids: multi_select_optional('MasterEmploymentType'), // Multi-selection -> MasterEmploymentType
  location_ids: multi_select_optional('MasterLocation'), // Multi-selection -> MasterLocation

  // Enums
  is_current: enumArrayOptional('Is Current', YesNo, getAllEnums(YesNo)),
});
export type ResumeExperienceQueryDTO = z.infer<
  typeof ResumeExperienceQuerySchema
>;

// Convert ResumeExperience Data to API Payload
export const toResumeExperiencePayload = (
  row: ResumeExperience,
): ResumeExperienceDTO => ({
  user_id: row.user_id || '',
  job_company_id: row.job_company_id || '',
  job_title_id: row.job_title_id || '',
  employment_type_id: row.employment_type_id || '',
  location_id: row.location_id || '',

  start_date: row.start_date || '',
  end_date: row.end_date || '',
  is_current: row.is_current || YesNo.No,
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New ResumeExperience Payload
export const newResumeExperiencePayload = (): ResumeExperienceDTO => ({
  user_id: '',
  job_company_id: '',
  job_title_id: '',
  employment_type_id: '',
  location_id: '',

  start_date: '',
  end_date: '',
  is_current: YesNo.No,
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// ResumeProject Create/Update Schema
export const ResumeProjectSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  project_title: stringMandatory('Project Title', 2, 100),
  role: stringOptional('Role', 0, 100),
  tech_stack: stringOptional('Tech Stack', 0, 300),
  project_url: stringOptional('Project Url', 0, 300),
  description: stringOptional('Description', 0, 5000),
  start_date: dateOptional('Start Date'),
  end_date: dateOptional('End Date'),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type ResumeProjectDTO = z.infer<typeof ResumeProjectSchema>;

// ResumeProject Query Schema
export const ResumeProjectQuerySchema = BaseQuerySchema.extend({
  // Self Table
  resume_project_ids: multi_select_optional('ResumeProject'), // Multi-selection -> ResumeProject

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type ResumeProjectQueryDTO = z.infer<typeof ResumeProjectQuerySchema>;

// Convert ResumeProject Data to API Payload
export const toResumeProjectPayload = (
  row: ResumeProject,
): ResumeProjectDTO => ({
  user_id: row.user_id || '',

  project_title: row.project_title || '',
  role: row.role || '',
  tech_stack: row.tech_stack || '',
  project_url: row.project_url || '',
  description: row.description || '',
  start_date: row.start_date || '',
  end_date: row.end_date || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New ResumeProject Payload
export const newResumeProjectPayload = (): ResumeProjectDTO => ({
  user_id: '',

  project_title: '',
  role: '',
  tech_stack: '',
  project_url: '',
  description: '',
  start_date: '',
  end_date: '',

  status: Status.Active,

  time_zone_id: '',
});

// ResumeEducation Create/Update Schema
export const ResumeEducationSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User
  education_level_id: single_select_mandatory('MasterEducationLevel'), // Single-Selection -> MasterEducationLevel
  location_id: single_select_mandatory('MasterLocation'), // Single-Selection -> MasterLocation

  // Main Field Details
  institute_name: stringMandatory('Institute Name', 2, 100),
  degree: stringOptional('Degree', 0, 100),
  field_of_study: stringOptional('Field Of Study', 0, 100),
  start_year: numberOptional('Start Year', 0),
  end_year: numberOptional('End Year', 0),
  grade: stringOptional('Grade', 0, 100),
  percentage: numberOptional('Percentage', 0),
  description: stringOptional('Description', 0, 2000),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type ResumeEducationDTO = z.infer<typeof ResumeEducationSchema>;

// ResumeEducation Query Schema
export const ResumeEducationQuerySchema = BaseQuerySchema.extend({
  // Self Table
  resume_education_ids: multi_select_optional('ResumeEducation'), // Multi-selection -> ResumeEducation

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
  education_level_ids: multi_select_optional('MasterEducationLevel'), // Multi-selection -> MasterEducationLevel
  location_ids: multi_select_optional('MasterLocation'), // Multi-selection -> MasterLocation

  // Enums
});
export type ResumeEducationQueryDTO = z.infer<
  typeof ResumeEducationQuerySchema
>;

// Convert ResumeEducation Data to API Payload
export const toResumeEducationPayload = (
  row: ResumeEducation,
): ResumeEducationDTO => ({
  user_id: row.user_id || '',
  education_level_id: row.education_level_id || '',
  location_id: row.location_id || '',

  institute_name: row.institute_name || '',
  degree: row.degree || '',
  field_of_study: row.field_of_study || '',
  start_year: row.start_year ?? 0,
  end_year: row.end_year ?? 0,
  grade: row.grade || '',
  percentage: row.percentage ?? 0,
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New ResumeEducation Payload
export const newResumeEducationPayload = (): ResumeEducationDTO => ({
  user_id: '',
  education_level_id: '',
  location_id: '',

  institute_name: '',
  degree: '',
  field_of_study: '',
  start_year: 0,
  end_year: 0,
  grade: '',
  percentage: 0,
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// ResumeCertification Create/Update Schema
export const ResumeCertificationSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  certification_name: stringMandatory('Certification Name', 2, 100),
  issued_by: stringOptional('Issued By', 0, 100),
  certificate_number: stringOptional('Certificate Number', 0, 100),
  issue_date: dateOptional('Issue Date'),
  expiry_date: dateOptional('Expiry Date'),
  credential_url: stringOptional('Credential Url', 0, 300),
  description: stringOptional('Description', 0, 2000),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type ResumeCertificationDTO = z.infer<typeof ResumeCertificationSchema>;

// ResumeCertification Query Schema
export const ResumeCertificationQuerySchema = BaseQuerySchema.extend({
  // Self Table
  resume_certification_ids: multi_select_optional('ResumeCertification'), // Multi-selection -> ResumeCertification

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type ResumeCertificationQueryDTO = z.infer<
  typeof ResumeCertificationQuerySchema
>;

// Convert ResumeCertification Data to API Payload
export const toResumeCertificationPayload = (
  row: ResumeCertification,
): ResumeCertificationDTO => ({
  user_id: row.user_id || '',

  certification_name: row.certification_name || '',
  issued_by: row.issued_by || '',
  certificate_number: row.certificate_number || '',
  issue_date: row.issue_date || '',
  expiry_date: row.expiry_date || '',
  credential_url: row.credential_url || '',
  description: row.description || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New ResumeCertification Payload
export const newResumeCertificationPayload = (): ResumeCertificationDTO => ({
  user_id: '',

  certification_name: '',
  issued_by: '',
  certificate_number: '',
  issue_date: '',
  expiry_date: '',
  credential_url: '',
  description: '',

  status: Status.Active,

  time_zone_id: '',
});

// ResumeAchievement Create/Update Schema
export const ResumeAchievementSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  achievement_title: stringMandatory('Achievement Title', 2, 100),
  description: stringOptional('Description', 0, 2000),
  achieved_on: dateOptional('Achieved On'),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type ResumeAchievementDTO = z.infer<typeof ResumeAchievementSchema>;

// ResumeAchievement Query Schema
export const ResumeAchievementQuerySchema = BaseQuerySchema.extend({
  // Self Table
  resume_achievement_ids: multi_select_optional('ResumeAchievement'), // Multi-selection -> ResumeAchievement

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type ResumeAchievementQueryDTO = z.infer<
  typeof ResumeAchievementQuerySchema
>;

// Convert ResumeAchievement Data to API Payload
export const toResumeAchievementPayload = (
  row: ResumeAchievement,
): ResumeAchievementDTO => ({
  user_id: row.user_id || '',

  achievement_title: row.achievement_title || '',
  description: row.description || '',
  achieved_on: row.achieved_on || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New ResumeAchievement Payload
export const newResumeAchievementPayload = (): ResumeAchievementDTO => ({
  user_id: '',

  achievement_title: '',
  description: '',
  achieved_on: '',

  status: Status.Active,

  time_zone_id: '',
});

// ResumeSkillLink Create/Update Schema
export const ResumeSkillLinkSchema = z.object({
  // Relations - Parent
  skill_id: single_select_mandatory('MasterSkill'), // Single-Selection -> MasterSkill
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  skill_level: enumMandatory(
    'Skill Level',
    ResumeSkillLevel,
    ResumeSkillLevel.Intermediate,
  ),
  years: doubleOptional('Years', 0),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type ResumeSkillLinkDTO = z.infer<typeof ResumeSkillLinkSchema>;

// ResumeSkillLink Query Schema
export const ResumeSkillLinkQuerySchema = BaseQuerySchema.extend({
  // Self Table
  resume_skill_link_ids: multi_select_optional('ResumeSkillLink'), // Multi-selection -> ResumeSkillLink

  // Relations - Parent
  skill_ids: multi_select_optional('MasterSkill'), // Multi-selection -> MasterSkill
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
  skill_level: enumArrayOptional(
    'Skill Level',
    ResumeSkillLevel,
    getAllEnums(ResumeSkillLevel),
  ),
});
export type ResumeSkillLinkQueryDTO = z.infer<
  typeof ResumeSkillLinkQuerySchema
>;

// Convert ResumeSkillLink Data to API Payload
export const toResumeSkillLinkPayload = (
  row: ResumeSkillLink,
): ResumeSkillLinkDTO => ({
  skill_id: row.skill_id || '',
  user_id: row.user_id || '',

  skill_level: row.skill_level || ResumeSkillLevel.Intermediate,
  years: row.years ?? 0,

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New ResumeSkillLink Payload
export const newResumeSkillLinkPayload = (): ResumeSkillLinkDTO => ({
  skill_id: '',
  user_id: '',

  skill_level: ResumeSkillLevel.Intermediate,
  years: 0,

  status: Status.Active,

  time_zone_id: '',
});

// ResumeLanguageLink Create/Update Schema
export const ResumeLanguageLinkSchema = z.object({
  // Relations - Parent
  language_id: single_select_mandatory('MasterLanguage'), // Single-Selection -> MasterLanguage
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  proficiency: enumMandatory(
    'Proficiency',
    LanguageProficiency,
    LanguageProficiency.Professional,
  ),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type ResumeLanguageLinkDTO = z.infer<typeof ResumeLanguageLinkSchema>;

// ResumeLanguageLink Query Schema
export const ResumeLanguageLinkQuerySchema = BaseQuerySchema.extend({
  // Self Table
  resume_language_link_ids: multi_select_optional('ResumeLanguageLink'), // Multi-selection -> ResumeLanguageLink

  // Relations - Parent
  language_ids: multi_select_optional('MasterLanguage'), // Multi-selection -> MasterLanguage
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
  proficiency: enumArrayOptional(
    'Proficiency',
    LanguageProficiency,
    getAllEnums(LanguageProficiency),
  ),
});
export type ResumeLanguageLinkQueryDTO = z.infer<
  typeof ResumeLanguageLinkQuerySchema
>;

// Convert ResumeLanguageLink Data to API Payload
export const toResumeLanguageLinkPayload = (
  row: ResumeLanguageLink,
): ResumeLanguageLinkDTO => ({
  language_id: row.language_id || '',
  user_id: row.user_id || '',

  proficiency: row.proficiency || LanguageProficiency.Professional,

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New ResumeLanguageLink Payload
export const newResumeLanguageLinkPayload = (): ResumeLanguageLinkDTO => ({
  language_id: '',
  user_id: '',

  proficiency: LanguageProficiency.Professional,

  status: Status.Active,

  time_zone_id: '',
});

// ResumeUrlLink Create/Update Schema
export const ResumeUrlLinkSchema = z.object({
  // Relations - Parent
  url_id: single_select_mandatory('MasterUrl'), // Single-Selection -> MasterUrl
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  url_value: stringMandatory('Url Value', 2, 500),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type ResumeUrlLinkDTO = z.infer<typeof ResumeUrlLinkSchema>;

// ResumeUrlLink Query Schema
export const ResumeUrlLinkQuerySchema = BaseQuerySchema.extend({
  // Self Table
  resume_url_link_ids: multi_select_optional('ResumeUrlLink'), // Multi-selection -> ResumeUrlLink

  // Relations - Parent
  url_ids: multi_select_optional('MasterUrl'), // Multi-selection -> MasterUrl
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type ResumeUrlLinkQueryDTO = z.infer<typeof ResumeUrlLinkQuerySchema>;

// Convert ResumeUrlLink Data to API Payload
export const toResumeUrlLinkPayload = (
  row: ResumeUrlLink,
): ResumeUrlLinkDTO => ({
  url_id: row.url_id || '',
  user_id: row.user_id || '',

  url_value: row.url_value || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New ResumeUrlLink Payload
export const newResumeUrlLinkPayload = (): ResumeUrlLinkDTO => ({
  url_id: '',
  user_id: '',

  url_value: '',

  status: Status.Active,

  time_zone_id: '',
});

// UserBlock Create/Update Schema
export const UserBlockSchema = z.object({
  // Relations - Parent
  user_id_1: single_select_mandatory('User'), // Single-Selection -> User
  user_id_2: single_select_mandatory('User'), // Single-Selection -> User
  blocker_user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Normalized Pair — smaller UUID always user_id_1

  // Who blocked — direction context

  // Timestamps
  blocked_on: dateTimeMandatory('Blocked On'),

  // ONE row per pair

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserBlockDTO = z.infer<typeof UserBlockSchema>;

// UserBlock Query Schema
export const UserBlockQuerySchema = BaseQuerySchema.extend({
  // Self Table
  block_ids: multi_select_optional('UserBlock'), // Multi-selection -> UserBlock

  // Relations - Parent
  user_id_1_ids: multi_select_optional('User'), // Multi-selection -> User
  user_id_2_ids: multi_select_optional('User'), // Multi-selection -> User
  blocker_user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type UserBlockQueryDTO = z.infer<typeof UserBlockQuerySchema>;

// Convert UserBlock Data to API Payload
export const toUserBlockPayload = (row: UserBlock): UserBlockDTO => ({
  user_id_1: row.user_id_1 || '',
  user_id_2: row.user_id_2 || '',
  blocker_user_id: row.blocker_user_id || '',

  blocked_on: row.blocked_on || '',

  time_zone_id: '',
});

// Create New UserBlock Payload
export const newUserBlockPayload = (): UserBlockDTO => ({
  user_id_1: '',
  user_id_2: '',
  blocker_user_id: '',

  blocked_on: '',

  time_zone_id: '',
});

// UserFriend Create/Update Schema
export const UserFriendSchema = z.object({
  // Relations - Parent
  user_id_1: single_select_mandatory('User'), // Single-Selection -> User
  user_id_2: single_select_mandatory('User'), // Single-Selection -> User
  requester_user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Normalized Pair — smaller UUID always user_id_1

  // Who initiated — direction context

  // State
  friend_status: enumMandatory(
    'Friend Status',
    FriendStatus,
    FriendStatus.Requested,
  ),

  // Timestamps per state
  requested_on: dateOptional('Requested On'),
  friends_since: dateOptional('Friends Since'),

  // ONE row per pair

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserFriendDTO = z.infer<typeof UserFriendSchema>;

// UserFriend Query Schema
export const UserFriendQuerySchema = BaseQuerySchema.extend({
  // Self Table
  friend_ids: multi_select_optional('UserFriend'), // Multi-selection -> UserFriend

  // Relations - Parent
  user_id_1_ids: multi_select_optional('User'), // Multi-selection -> User
  user_id_2_ids: multi_select_optional('User'), // Multi-selection -> User
  requester_user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
  friend_status: enumArrayOptional(
    'Friend Status',
    FriendStatus,
    getAllEnums(FriendStatus),
  ),
});
export type UserFriendQueryDTO = z.infer<typeof UserFriendQuerySchema>;

// Convert UserFriend Data to API Payload
export const toUserFriendPayload = (row: UserFriend): UserFriendDTO => ({
  user_id_1: row.user_id_1 || '',
  user_id_2: row.user_id_2 || '',
  requester_user_id: row.requester_user_id || '',

  friend_status: row.friend_status || FriendStatus.Requested,
  requested_on: row.requested_on || '',
  friends_since: row.friends_since || '',

  time_zone_id: '',
});

// Create New UserFriend Payload
export const newUserFriendPayload = (): UserFriendDTO => ({
  user_id_1: '',
  user_id_2: '',
  requester_user_id: '',

  friend_status: FriendStatus.Requested,
  requested_on: '',
  friends_since: '',

  time_zone_id: '',
});

// UserFollow Create/Update Schema
export const UserFollowSchema = z.object({
  // Relations - Parent
  follower_user_id: single_select_mandatory('User'), // Single-Selection -> User
  following_user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Directional

  // State
  follow_status: enumMandatory(
    'Follow Status',
    FollowStatus,
    FollowStatus.Requested,
  ),

  // Timestamps per state
  requested_on: dateOptional('Requested On'),
  followed_on: dateOptional('Followed On'),

  // ONE follow per direction per pair

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserFollowDTO = z.infer<typeof UserFollowSchema>;

// UserFollow Query Schema
export const UserFollowQuerySchema = BaseQuerySchema.extend({
  // Self Table
  follow_ids: multi_select_optional('UserFollow'), // Multi-selection -> UserFollow

  // Relations - Parent
  follower_user_ids: multi_select_optional('User'), // Multi-selection -> User
  following_user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
  follow_status: enumArrayOptional(
    'Follow Status',
    FollowStatus,
    getAllEnums(FollowStatus),
  ),
});
export type UserFollowQueryDTO = z.infer<typeof UserFollowQuerySchema>;

// Convert UserFollow Data to API Payload
export const toUserFollowPayload = (row: UserFollow): UserFollowDTO => ({
  follower_user_id: row.follower_user_id || '',
  following_user_id: row.following_user_id || '',

  follow_status: row.follow_status || FollowStatus.Requested,
  requested_on: row.requested_on || '',
  followed_on: row.followed_on || '',

  time_zone_id: '',
});

// Create New UserFollow Payload
export const newUserFollowPayload = (): UserFollowDTO => ({
  follower_user_id: '',
  following_user_id: '',

  follow_status: FollowStatus.Requested,
  requested_on: '',
  followed_on: '',

  time_zone_id: '',
});

// UserSocialSummary Create/Update Schema
export const UserSocialSummarySchema = z.object({
  // Relations - Parent
  main_user_id: single_select_mandatory('User'), // Single-Selection -> User
  user_id: single_select_mandatory('User'), // Single-Selection -> User
  block_id: single_select_mandatory('UserBlock'), // Single-Selection -> UserBlock
  friend_id: single_select_mandatory('UserFriend'), // Single-Selection -> UserFriend
  follow_id: single_select_mandatory('UserFollow'), // Single-Selection -> UserFollow

  // Directional — main_user_id is always the viewer

  // Block state
  is_blocked: booleanOptional('Is Blocked'),

  // Friend state
  friend_status: enumOptional(
    'Friend Status',
    FriendStatus,
    FriendStatus.Requested,
  ),

  // Follow state
  follow_status: enumOptional(
    'Follow Status',
    FollowStatus,
    FollowStatus.Requested,
  ),

  // ONE row per direction per pair

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserSocialSummaryDTO = z.infer<typeof UserSocialSummarySchema>;

// UserSocialSummary Query Schema
export const UserSocialSummaryQuerySchema = BaseQuerySchema.extend({
  // Self Table
  user_social_summary_ids: multi_select_optional('UserSocialSummary'), // Multi-selection -> UserSocialSummary

  // Relations - Parent
  main_user_ids: multi_select_optional('User'), // Multi-selection -> User
  user_ids: multi_select_optional('User'), // Multi-selection -> User
  block_ids: multi_select_optional('UserBlock'), // Multi-selection -> UserBlock
  friend_ids: multi_select_optional('UserFriend'), // Multi-selection -> UserFriend
  follow_ids: multi_select_optional('UserFollow'), // Multi-selection -> UserFollow

  // Enums
  friend_status: enumArrayOptional(
    'Friend Status',
    FriendStatus,
    getAllEnums(FriendStatus),
  ),
  follow_status: enumArrayOptional(
    'Follow Status',
    FollowStatus,
    getAllEnums(FollowStatus),
  ),
});
export type UserSocialSummaryQueryDTO = z.infer<
  typeof UserSocialSummaryQuerySchema
>;

// Convert UserSocialSummary Data to API Payload
export const toUserSocialSummaryPayload = (
  row: UserSocialSummary,
): UserSocialSummaryDTO => ({
  main_user_id: row.main_user_id || '',
  user_id: row.user_id || '',
  block_id: row.block_id || '',
  friend_id: row.friend_id || '',
  follow_id: row.follow_id || '',

  is_blocked: row.is_blocked ?? false,
  friend_status: row.friend_status || FriendStatus.Requested,
  follow_status: row.follow_status || FollowStatus.Requested,

  time_zone_id: '',
});

// Create New UserSocialSummary Payload
export const newUserSocialSummaryPayload = (): UserSocialSummaryDTO => ({
  main_user_id: '',
  user_id: '',
  block_id: '',
  friend_id: '',
  follow_id: '',

  is_blocked: false,
  friend_status: FriendStatus.Requested,
  follow_status: FollowStatus.Requested,

  time_zone_id: '',
});

// MasterAdminGroup Create/Update Schema
export const MasterAdminGroupSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Logo
  admin_group_logo_url: stringOptional('Admin Group Logo Url', 0, 300),
  admin_group_logo_key: stringOptional('Admin Group Logo Key', 0, 300),
  admin_group_logo_name: stringOptional('Admin Group Logo Name', 0, 300),

  // Banner Image
  admin_group_banner_image_url: stringOptional(
    'Admin Group Banner Image Url',
    0,
    300,
  ),
  admin_group_banner_image_key: stringOptional(
    'Admin Group Banner Image Key',
    0,
    300,
  ),
  admin_group_banner_image_name: stringOptional(
    'Admin Group Banner Image Name',
    0,
    300,
  ),

  // Counters
  followers_count: numberMandatory('Followers Count', 0),

  // Main Field Details
  admin_group_name: stringMandatory('Admin Group Name', 2, 100),
  description: stringMandatory('Description', 2, 500),
  admin_status: enumMandatory('Admin Status', AdminStatus, AdminStatus.Pending),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type MasterAdminGroupDTO = z.infer<typeof MasterAdminGroupSchema>;

// MasterAdminGroupLogo Schema
export const MasterAdminGroupLogoSchema = z.object({
  // Logo
  admin_group_logo_url: stringMandatory('Admin Group Logo URL', 0, 300),
  admin_group_logo_key: stringMandatory('Admin Group Logo Key', 0, 300),
  admin_group_logo_name: stringMandatory('Admin Group Logo Name', 0, 300),
});
export type MasterAdminGroupLogoDTO = z.infer<
  typeof MasterAdminGroupLogoSchema
>;

// MasterAdminGroupBannerImage Schema
export const MasterAdminGroupBannerImageSchema = z.object({
  // Banner Image
  admin_group_banner_image_url: stringMandatory(
    'Admin Group Banner Image URL',
    0,
    300,
  ),
  admin_group_banner_image_key: stringMandatory(
    'Admin Group Banner Image Key',
    0,
    300,
  ),
  admin_group_banner_image_name: stringMandatory(
    'Admin Group Banner Image Name',
    0,
    300,
  ),
});
export type MasterAdminGroupBannerImageDTO = z.infer<
  typeof MasterAdminGroupBannerImageSchema
>;

// MasterAdminGroup Query Schema
export const MasterAdminGroupQuerySchema = BaseQuerySchema.extend({
  // Self Table
  master_admin_group_ids: multi_select_optional('MasterAdminGroup'), // Multi-selection -> MasterAdminGroup

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
  admin_status: enumArrayOptional(
    'Admin Status',
    AdminStatus,
    getAllEnums(AdminStatus),
  ),
});
export type MasterAdminGroupQueryDTO = z.infer<
  typeof MasterAdminGroupQuerySchema
>;

// Convert MasterAdminGroup Data to API Payload
export const toMasterAdminGroupPayload = (
  row: MasterAdminGroup,
): MasterAdminGroupDTO => ({
  user_id: row.user_id || '',

  admin_group_logo_url: row.admin_group_logo_url || '',
  admin_group_logo_key: row.admin_group_logo_key || '',
  admin_group_logo_name: row.admin_group_logo_name || '',
  admin_group_banner_image_url: row.admin_group_banner_image_url || '',
  admin_group_banner_image_key: row.admin_group_banner_image_key || '',
  admin_group_banner_image_name: row.admin_group_banner_image_name || '',
  followers_count: row.followers_count ?? 0,
  admin_group_name: row.admin_group_name || '',
  description: row.description || '',
  admin_status: row.admin_status || AdminStatus.Pending,

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New MasterAdminGroup Payload
export const newMasterAdminGroupPayload = (): MasterAdminGroupDTO => ({
  user_id: '',

  admin_group_logo_url: '',
  admin_group_logo_key: '',
  admin_group_logo_name: '',
  admin_group_banner_image_url: '',
  admin_group_banner_image_key: '',
  admin_group_banner_image_name: '',
  followers_count: 0,
  admin_group_name: '',
  description: '',
  admin_status: AdminStatus.Pending,

  status: Status.Active,

  time_zone_id: '',
});

// AdminGroupMemberLink Create/Update Schema
export const AdminGroupMemberLinkSchema = z.object({
  // Relations - Parent
  master_admin_group_id: single_select_mandatory('MasterAdminGroup'), // Single-Selection -> MasterAdminGroup
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type AdminGroupMemberLinkDTO = z.infer<
  typeof AdminGroupMemberLinkSchema
>;

// AdminGroupMemberLink Query Schema
export const AdminGroupMemberLinkQuerySchema = BaseQuerySchema.extend({
  // Self Table
  user_group_link_ids: multi_select_optional('AdminGroupMemberLink'), // Multi-selection -> AdminGroupMemberLink

  // Relations - Parent
  master_admin_group_ids: multi_select_optional('MasterAdminGroup'), // Multi-selection -> MasterAdminGroup
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type AdminGroupMemberLinkQueryDTO = z.infer<
  typeof AdminGroupMemberLinkQuerySchema
>;

// Convert AdminGroupMemberLink Data to API Payload
export const toAdminGroupMemberLinkPayload = (
  row: AdminGroupMemberLink,
): AdminGroupMemberLinkDTO => ({
  master_admin_group_id: row.master_admin_group_id || '',
  user_id: row.user_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New AdminGroupMemberLink Payload
export const newAdminGroupMemberLinkPayload = (): AdminGroupMemberLinkDTO => ({
  master_admin_group_id: '',
  user_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// UserChannel Create/Update Schema
export const UserChannelSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User
  channel_category_id: single_select_mandatory('MasterChannelCategory'), // Single-Selection -> MasterChannelCategory

  // Logo
  user_channel_logo_url: stringOptional('User Channel Logo Url', 0, 255),
  user_channel_logo_key: stringOptional('User Channel Logo Key', 0, 255),
  user_channel_logo_name: stringOptional('User Channel Logo Name', 0, 300),

  // Banner Image
  user_channel_banner_image_url: stringOptional(
    'User Channel Banner Image Url',
    0,
    300,
  ),
  user_channel_banner_image_key: stringOptional(
    'User Channel Banner Image Key',
    0,
    300,
  ),
  user_channel_banner_image_name: stringOptional(
    'User Channel Banner Image Name',
    0,
    300,
  ),

  // Counters
  followers_count: numberMandatory('Followers Count', 0),

  // Main Field Details
  user_channel_name: stringMandatory('User Channel Name', 2, 100),
  description: stringMandatory('Description', 2, 500),
  admin_status: enumMandatory('Admin Status', AdminStatus, AdminStatus.Pending),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserChannelDTO = z.infer<typeof UserChannelSchema>;

// UserChannelLogo Schema
export const UserChannelLogoSchema = z.object({
  // Logo
  user_channel_logo_url: stringMandatory('User Channel Logo URL', 0, 255),
  user_channel_logo_key: stringMandatory('User Channel Logo Key', 0, 255),
  user_channel_logo_name: stringMandatory('User Channel Logo Name', 0, 300),
});
export type UserChannelLogoDTO = z.infer<typeof UserChannelLogoSchema>;

// UserChannelBannerImage Schema
export const UserChannelBannerImageSchema = z.object({
  // Banner Image
  user_channel_banner_image_url: stringMandatory(
    'User Channel Banner Image URL',
    0,
    300,
  ),
  user_channel_banner_image_key: stringMandatory(
    'User Channel Banner Image Key',
    0,
    300,
  ),
  user_channel_banner_image_name: stringMandatory(
    'User Channel Banner Image Name',
    0,
    300,
  ),
});
export type UserChannelBannerImageDTO = z.infer<
  typeof UserChannelBannerImageSchema
>;

// UserChannel Query Schema
export const UserChannelQuerySchema = BaseQuerySchema.extend({
  // Self Table
  user_channel_ids: multi_select_optional('UserChannel'), // Multi-selection -> UserChannel

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
  channel_category_ids: multi_select_optional('MasterChannelCategory'), // Multi-selection -> MasterChannelCategory

  // Enums
  admin_status: enumArrayOptional(
    'Admin Status',
    AdminStatus,
    getAllEnums(AdminStatus),
  ),
});
export type UserChannelQueryDTO = z.infer<typeof UserChannelQuerySchema>;

// Convert UserChannel Data to API Payload
export const toUserChannelPayload = (row: UserChannel): UserChannelDTO => ({
  user_id: row.user_id || '',
  channel_category_id: row.channel_category_id || '',

  user_channel_logo_url: row.user_channel_logo_url || '',
  user_channel_logo_key: row.user_channel_logo_key || '',
  user_channel_logo_name: row.user_channel_logo_name || '',
  user_channel_banner_image_url: row.user_channel_banner_image_url || '',
  user_channel_banner_image_key: row.user_channel_banner_image_key || '',
  user_channel_banner_image_name: row.user_channel_banner_image_name || '',
  followers_count: row.followers_count ?? 0,
  user_channel_name: row.user_channel_name || '',
  description: row.description || '',
  admin_status: row.admin_status || AdminStatus.Pending,

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New UserChannel Payload
export const newUserChannelPayload = (): UserChannelDTO => ({
  user_id: '',
  channel_category_id: '',

  user_channel_logo_url: '',
  user_channel_logo_key: '',
  user_channel_logo_name: '',
  user_channel_banner_image_url: '',
  user_channel_banner_image_key: '',
  user_channel_banner_image_name: '',
  followers_count: 0,
  user_channel_name: '',
  description: '',
  admin_status: AdminStatus.Pending,

  status: Status.Active,

  time_zone_id: '',
});

// UserChannelLink Create/Update Schema
export const UserChannelLinkSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User
  user_channel_id: single_select_mandatory('UserChannel'), // Single-Selection -> UserChannel

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserChannelLinkDTO = z.infer<typeof UserChannelLinkSchema>;

// UserChannelLink Query Schema
export const UserChannelLinkQuerySchema = BaseQuerySchema.extend({
  // Self Table
  user_channel_link_ids: multi_select_optional('UserChannelLink'), // Multi-selection -> UserChannelLink

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
  user_channel_ids: multi_select_optional('UserChannel'), // Multi-selection -> UserChannel

  // Enums
});
export type UserChannelLinkQueryDTO = z.infer<
  typeof UserChannelLinkQuerySchema
>;

// Convert UserChannelLink Data to API Payload
export const toUserChannelLinkPayload = (
  row: UserChannelLink,
): UserChannelLinkDTO => ({
  user_id: row.user_id || '',
  user_channel_id: row.user_channel_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New UserChannelLink Payload
export const newUserChannelLinkPayload = (): UserChannelLinkDTO => ({
  user_id: '',
  user_channel_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// UserOrganisation Create/Update Schema
export const UserOrganisationSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User
  location_id: single_select_mandatory('MasterLocation'), // Single-Selection -> MasterLocation

  // Logo
  organisation_logo_url: stringOptional('Organisation Logo Url', 0, 300),
  organisation_logo_key: stringOptional('Organisation Logo Key', 0, 300),
  organisation_logo_name: stringOptional('Organisation Logo Name', 0, 300),

  // Banner Image
  organisation_banner_image_url: stringOptional(
    'Organisation Banner Image Url',
    0,
    300,
  ),
  organisation_banner_image_key: stringOptional(
    'Organisation Banner Image Key',
    0,
    300,
  ),
  organisation_banner_image_name: stringOptional(
    'Organisation Banner Image Name',
    0,
    300,
  ),

  // Counters
  followers_count: numberMandatory('Followers Count', 0),

  // Main Field Details
  organisation_name: stringMandatory('Organisation Name', 2, 100),
  about_organisation: stringOptional('About Organisation', 0, 500),
  organisation_type: enumMandatory(
    'Organisation Type',
    OrganisationType,
    OrganisationType.PrivateLimited,
  ),
  organisation_size: enumMandatory(
    'Organisation Size',
    OrganisationSize,
    OrganisationSize.One01_500,
  ),
  organisation_mobile: stringMandatory('Organisation Mobile', 2, 15),
  organisation_email: stringMandatory('Organisation Email', 2, 100),
  website: stringOptional('Website', 0, 300),
  address: stringOptional('Address', 0, 300),
  admin_status: enumMandatory('Admin Status', AdminStatus, AdminStatus.Pending),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserOrganisationDTO = z.infer<typeof UserOrganisationSchema>;

// UserOrganisationLogo Schema
export const UserOrganisationLogoSchema = z.object({
  // Logo
  organisation_logo_url: stringMandatory('Organisation Logo URL', 0, 300),
  organisation_logo_key: stringMandatory('Organisation Logo Key', 0, 300),
  organisation_logo_name: stringMandatory('Organisation Logo Name', 0, 300),
});
export type UserOrganisationLogoDTO = z.infer<
  typeof UserOrganisationLogoSchema
>;

// UserOrganisationBannerImage Schema
export const UserOrganisationBannerImageSchema = z.object({
  // Banner Image
  organisation_banner_image_url: stringMandatory(
    'Organisation Banner Image URL',
    0,
    300,
  ),
  organisation_banner_image_key: stringMandatory(
    'Organisation Banner Image Key',
    0,
    300,
  ),
  organisation_banner_image_name: stringMandatory(
    'Organisation Banner Image Name',
    0,
    300,
  ),
});
export type UserOrganisationBannerImageDTO = z.infer<
  typeof UserOrganisationBannerImageSchema
>;

// UserOrganisation Query Schema
export const UserOrganisationQuerySchema = BaseQuerySchema.extend({
  // Self Table
  organisation_ids: multi_select_optional('UserOrganisation'), // Multi-selection -> UserOrganisation

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
  location_ids: multi_select_optional('MasterLocation'), // Multi-selection -> MasterLocation

  // Enums
  organisation_type: enumArrayOptional(
    'Organisation Type',
    OrganisationType,
    getAllEnums(OrganisationType),
  ),
  organisation_size: enumArrayOptional(
    'Organisation Size',
    OrganisationSize,
    getAllEnums(OrganisationSize),
  ),
  admin_status: enumArrayOptional(
    'Admin Status',
    AdminStatus,
    getAllEnums(AdminStatus),
  ),
});
export type UserOrganisationQueryDTO = z.infer<
  typeof UserOrganisationQuerySchema
>;

// Convert UserOrganisation Data to API Payload
export const toUserOrganisationPayload = (
  row: UserOrganisation,
): UserOrganisationDTO => ({
  user_id: row.user_id || '',
  location_id: row.location_id || '',

  organisation_logo_url: row.organisation_logo_url || '',
  organisation_logo_key: row.organisation_logo_key || '',
  organisation_logo_name: row.organisation_logo_name || '',
  organisation_banner_image_url: row.organisation_banner_image_url || '',
  organisation_banner_image_key: row.organisation_banner_image_key || '',
  organisation_banner_image_name: row.organisation_banner_image_name || '',
  followers_count: row.followers_count ?? 0,
  organisation_name: row.organisation_name || '',
  about_organisation: row.about_organisation || '',
  organisation_type: row.organisation_type || OrganisationType.PrivateLimited,
  organisation_size: row.organisation_size || OrganisationSize.One01_500,
  organisation_mobile: row.organisation_mobile || '',
  organisation_email: row.organisation_email || '',
  website: row.website || '',
  address: row.address || '',
  admin_status: row.admin_status || AdminStatus.Pending,

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New UserOrganisation Payload
export const newUserOrganisationPayload = (): UserOrganisationDTO => ({
  user_id: '',
  location_id: '',

  organisation_logo_url: '',
  organisation_logo_key: '',
  organisation_logo_name: '',
  organisation_banner_image_url: '',
  organisation_banner_image_key: '',
  organisation_banner_image_name: '',
  followers_count: 0,
  organisation_name: '',
  about_organisation: '',
  organisation_type: OrganisationType.PrivateLimited,
  organisation_size: OrganisationSize.One01_500,
  organisation_mobile: '',
  organisation_email: '',
  website: '',
  address: '',
  admin_status: AdminStatus.Pending,

  status: Status.Active,

  time_zone_id: '',
});

// UserOrganisationLink Create/Update Schema
export const UserOrganisationLinkSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User
  organisation_id: single_select_mandatory('UserOrganisation'), // Single-Selection -> UserOrganisation

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type UserOrganisationLinkDTO = z.infer<
  typeof UserOrganisationLinkSchema
>;

// UserOrganisationLink Query Schema
export const UserOrganisationLinkQuerySchema = BaseQuerySchema.extend({
  // Self Table
  user_organisation_link_ids: multi_select_optional('UserOrganisationLink'), // Multi-selection -> UserOrganisationLink

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
  organisation_ids: multi_select_optional('UserOrganisation'), // Multi-selection -> UserOrganisation

  // Enums
});
export type UserOrganisationLinkQueryDTO = z.infer<
  typeof UserOrganisationLinkQuerySchema
>;

// Convert UserOrganisationLink Data to API Payload
export const toUserOrganisationLinkPayload = (
  row: UserOrganisationLink,
): UserOrganisationLinkDTO => ({
  user_id: row.user_id || '',
  organisation_id: row.organisation_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New UserOrganisationLink Payload
export const newUserOrganisationLinkPayload = (): UserOrganisationLinkDTO => ({
  user_id: '',
  organisation_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// Post Create/Update Schema
export const PostSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User
  user_channel_id: single_select_mandatory('UserChannel'), // Single-Selection -> UserChannel
  parent_post_id: single_select_mandatory('Post'), // Single-Selection -> Post

  content: stringMandatory('Content', 2, 500),
  media_url: stringOptional('Media Url', 0, 300),
  hashtags: stringArrayMandatory('Hashtags'),
  likes_count: numberOptional('Likes Count', 0),
  comments_count: numberOptional('Comments Count', 0),
  views_count: numberOptional('Views Count', 0),
  saves_count: numberOptional('Saves Count', 0),
  shares_count: numberOptional('Shares Count', 0),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs
  PostFileSchema: z
    .array(
      z.lazy(() =>
        PostFileSchema.extend({
          post_id: single_select_optional('Post'), // Single-Selection -> Post
          user_id: single_select_optional('User'), // Single-Selection -> User
        }),
      ),
    )
    .optional()
    .default([]),

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type PostDTO = z.infer<typeof PostSchema>;

// Post Query Schema
export const PostQuerySchema = BaseQuerySchema.extend({
  // Self Table
  post_ids: multi_select_optional('Post'), // Multi-selection -> Post

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
  user_channel_ids: multi_select_optional('UserChannel'), // Multi-selection -> UserChannel
  parent_post_ids: multi_select_optional('Post'), // Multi-selection -> Post

  // Enums
});
export type PostQueryDTO = z.infer<typeof PostQuerySchema>;

// Convert Post Data to API Payload
export const toPostPayload = (row: Post): PostDTO => ({
  user_id: row.user_id || '',
  user_channel_id: row.user_channel_id || '',
  parent_post_id: row.parent_post_id || '',

  content: row.content || '',
  media_url: row.media_url || '',
  hashtags: row.hashtags || [],
  likes_count: row.likes_count ?? 0,
  comments_count: row.comments_count ?? 0,
  views_count: row.views_count ?? 0,
  saves_count: row.saves_count ?? 0,
  shares_count: row.shares_count ?? 0,

  status: row.status || Status.Active,

  PostFileSchema: (row.PostFile || []).map((item) => ({
    post_id: item.post_id || '',
    user_id: item.user_id || '',

    usage_type: item.usage_type || '',
    file_type: item.file_type || FileType.Image,
    file_url: item.file_url || '',
    file_key: item.file_key || '',
    file_name: item.file_name || '',
    file_description: item.file_description || '',
    file_size: item.file_size ?? 0,
    file_metadata: item.file_metadata || {},

    status: item.status || Status.Active,

    time_zone_id: '',
  })),

  time_zone_id: '',
});

// Create New Post Payload
export const newPostPayload = (): PostDTO => ({
  user_id: '',
  user_channel_id: '',
  parent_post_id: '',

  content: '',
  media_url: '',
  hashtags: [],
  likes_count: 0,
  comments_count: 0,
  views_count: 0,
  saves_count: 0,
  shares_count: 0,

  status: Status.Active,

  PostFileSchema: [],

  time_zone_id: '',
});

// PostTag Create/Update Schema
export const PostTagSchema = z.object({
  // Relations - Parent
  post_id: single_select_mandatory('Post'), // Single-Selection -> Post
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type PostTagDTO = z.infer<typeof PostTagSchema>;

// PostTag Query Schema
export const PostTagQuerySchema = BaseQuerySchema.extend({
  // Self Table
  post_tag_ids: multi_select_optional('PostTag'), // Multi-selection -> PostTag

  // Relations - Parent
  post_ids: multi_select_optional('Post'), // Multi-selection -> Post
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type PostTagQueryDTO = z.infer<typeof PostTagQuerySchema>;

// Convert PostTag Data to API Payload
export const toPostTagPayload = (row: PostTag): PostTagDTO => ({
  post_id: row.post_id || '',
  user_id: row.user_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New PostTag Payload
export const newPostTagPayload = (): PostTagDTO => ({
  post_id: '',
  user_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// PostFile Create/Update Schema
export const PostFileSchema = z.object({
  // Relations - Parent
  post_id: single_select_mandatory('Post'), // Single-Selection -> Post
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Usage Type
  usage_type: stringMandatory('Usage Type', 2, 100),

  // File Details
  file_type: enumMandatory('File Type', FileType, FileType.Image),
  file_url: stringOptional('File Url', 0, 300),
  file_key: stringOptional('File Key', 0, 300),
  file_name: stringOptional('File Name', 0, 300),
  file_description: stringOptional('File Description', 0, 2000),
  file_size: numberOptional('File Size', 0),
  file_metadata: dynamicJsonSchema('File Metadata', {}),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type PostFileDTO = z.infer<typeof PostFileSchema>;

// PostFile Query Schema
export const PostFileQuerySchema = BaseQuerySchema.extend({
  // Self Table
  post_file_ids: multi_select_optional('PostFile'), // Multi-selection -> PostFile

  // Relations - Parent
  post_ids: multi_select_optional('Post'), // Multi-selection -> Post
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
  file_type: enumArrayOptional('File Type', FileType, getAllEnums(FileType)),
});
export type PostFileQueryDTO = z.infer<typeof PostFileQuerySchema>;

// Convert PostFile Data to API Payload
export const toPostFilePayload = (row: PostFile): PostFileDTO => ({
  post_id: row.post_id || '',
  user_id: row.user_id || '',

  usage_type: row.usage_type || '',
  file_type: row.file_type || FileType.Image,
  file_url: row.file_url || '',
  file_key: row.file_key || '',
  file_name: row.file_name || '',
  file_description: row.file_description || '',
  file_size: row.file_size ?? 0,
  file_metadata: row.file_metadata || {},

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New PostFile Payload
export const newPostFilePayload = (): PostFileDTO => ({
  post_id: '',
  user_id: '',

  usage_type: '',
  file_type: FileType.Image,
  file_url: '',
  file_key: '',
  file_name: '',
  file_description: '',
  file_size: 0,
  file_metadata: {},

  status: Status.Active,

  time_zone_id: '',
});

// PostLike Create/Update Schema
export const PostLikeSchema = z.object({
  // Relations - Parent
  post_id: single_select_mandatory('Post'), // Single-Selection -> Post
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type PostLikeDTO = z.infer<typeof PostLikeSchema>;

// PostLike Query Schema
export const PostLikeQuerySchema = BaseQuerySchema.extend({
  // Self Table
  post_like_ids: multi_select_optional('PostLike'), // Multi-selection -> PostLike

  // Relations - Parent
  post_ids: multi_select_optional('Post'), // Multi-selection -> Post
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type PostLikeQueryDTO = z.infer<typeof PostLikeQuerySchema>;

// Convert PostLike Data to API Payload
export const toPostLikePayload = (row: PostLike): PostLikeDTO => ({
  post_id: row.post_id || '',
  user_id: row.user_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New PostLike Payload
export const newPostLikePayload = (): PostLikeDTO => ({
  post_id: '',
  user_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// PostComment Create/Update Schema
export const PostCommentSchema = z.object({
  // Relations - Parent
  post_id: single_select_mandatory('Post'), // Single-Selection -> Post
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  comment_text: stringMandatory('Comment Text', 2, 500),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type PostCommentDTO = z.infer<typeof PostCommentSchema>;

// PostComment Query Schema
export const PostCommentQuerySchema = BaseQuerySchema.extend({
  // Self Table
  post_comment_ids: multi_select_optional('PostComment'), // Multi-selection -> PostComment

  // Relations - Parent
  post_ids: multi_select_optional('Post'), // Multi-selection -> Post
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type PostCommentQueryDTO = z.infer<typeof PostCommentQuerySchema>;

// Convert PostComment Data to API Payload
export const toPostCommentPayload = (row: PostComment): PostCommentDTO => ({
  post_id: row.post_id || '',
  user_id: row.user_id || '',

  comment_text: row.comment_text || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New PostComment Payload
export const newPostCommentPayload = (): PostCommentDTO => ({
  post_id: '',
  user_id: '',

  comment_text: '',

  status: Status.Active,

  time_zone_id: '',
});

// PostView Create/Update Schema
export const PostViewSchema = z.object({
  // Relations - Parent
  post_id: single_select_mandatory('Post'), // Single-Selection -> Post
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type PostViewDTO = z.infer<typeof PostViewSchema>;

// PostView Query Schema
export const PostViewQuerySchema = BaseQuerySchema.extend({
  // Self Table
  post_view_ids: multi_select_optional('PostView'), // Multi-selection -> PostView

  // Relations - Parent
  post_ids: multi_select_optional('Post'), // Multi-selection -> Post
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type PostViewQueryDTO = z.infer<typeof PostViewQuerySchema>;

// Convert PostView Data to API Payload
export const toPostViewPayload = (row: PostView): PostViewDTO => ({
  post_id: row.post_id || '',
  user_id: row.user_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New PostView Payload
export const newPostViewPayload = (): PostViewDTO => ({
  post_id: '',
  user_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// PostSaved Create/Update Schema
export const PostSavedSchema = z.object({
  // Relations - Parent
  post_id: single_select_mandatory('Post'), // Single-Selection -> Post
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type PostSavedDTO = z.infer<typeof PostSavedSchema>;

// PostSaved Query Schema
export const PostSavedQuerySchema = BaseQuerySchema.extend({
  // Self Table
  post_saved_ids: multi_select_optional('PostSaved'), // Multi-selection -> PostSaved

  // Relations - Parent
  post_ids: multi_select_optional('Post'), // Multi-selection -> Post
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type PostSavedQueryDTO = z.infer<typeof PostSavedQuerySchema>;

// Convert PostSaved Data to API Payload
export const toPostSavedPayload = (row: PostSaved): PostSavedDTO => ({
  post_id: row.post_id || '',
  user_id: row.user_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New PostSaved Payload
export const newPostSavedPayload = (): PostSavedDTO => ({
  post_id: '',
  user_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// PostReport Create/Update Schema
export const PostReportSchema = z.object({
  // Relations - Parent
  post_id: single_select_mandatory('Post'), // Single-Selection -> Post
  user_id: single_select_mandatory('User'), // Single-Selection -> User
  report_reason_id: single_select_mandatory('MasterReportReason'), // Single-Selection -> MasterReportReason

  description: stringMandatory('Description', 2, 300),
  report_status: enumMandatory(
    'Report Status',
    ReportStatus,
    ReportStatus.Pending,
  ),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type PostReportDTO = z.infer<typeof PostReportSchema>;

// PostReport Query Schema
export const PostReportQuerySchema = BaseQuerySchema.extend({
  // Self Table
  post_report_ids: multi_select_optional('PostReport'), // Multi-selection -> PostReport

  // Relations - Parent
  post_ids: multi_select_optional('Post'), // Multi-selection -> Post
  user_ids: multi_select_optional('User'), // Multi-selection -> User
  report_reason_ids: multi_select_optional('MasterReportReason'), // Multi-selection -> MasterReportReason

  // Enums
  report_status: enumArrayOptional(
    'Report Status',
    ReportStatus,
    getAllEnums(ReportStatus),
  ),
});
export type PostReportQueryDTO = z.infer<typeof PostReportQuerySchema>;

// Convert PostReport Data to API Payload
export const toPostReportPayload = (row: PostReport): PostReportDTO => ({
  post_id: row.post_id || '',
  user_id: row.user_id || '',
  report_reason_id: row.report_reason_id || '',

  description: row.description || '',
  report_status: row.report_status || ReportStatus.Pending,

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New PostReport Payload
export const newPostReportPayload = (): PostReportDTO => ({
  post_id: '',
  user_id: '',
  report_reason_id: '',

  description: '',
  report_status: ReportStatus.Pending,

  status: Status.Active,

  time_zone_id: '',
});

// Job Create/Update Schema
export const JobSchema = z.object({
  // Relations - Parent
  user_id: single_select_mandatory('User'), // Single-Selection -> User
  organisation_id: single_select_mandatory('UserOrganisation'), // Single-Selection -> UserOrganisation
  job_type_id: single_select_mandatory('MasterJobType'), // Single-Selection -> MasterJobType
  employment_type_id: single_select_mandatory('MasterEmploymentType'), // Single-Selection -> MasterEmploymentType
  workplace_type_id: single_select_mandatory('MasterWorkplaceType'), // Single-Selection -> MasterWorkplaceType
  salary_period_id: single_select_mandatory('MasterSalaryPeriod'), // Single-Selection -> MasterSalaryPeriod
  job_category_id: single_select_mandatory('MasterJobCategory'), // Single-Selection -> MasterJobCategory
  shift_type_id: single_select_mandatory('MasterShiftType'), // Single-Selection -> MasterShiftType
  education_level_id: single_select_mandatory('MasterEducationLevel'), // Single-Selection -> MasterEducationLevel

  // Admin Managed
  is_featured: enumMandatory('Is Featured', YesNo, YesNo.No),
  priority_rank: numberMandatory('Priority Rank', 0),
  job_slug: stringOptional('Job Slug', 0, 200),

  // Main Field Details
  job_title: stringMandatory('Job Title', 2, 100),
  job_description: stringMandatory('Job Description', 2, 5000),
  responsibilities: stringOptional('Responsibilities', 0, 5000),
  requirements: stringOptional('Requirements', 0, 5000),
  job_code: stringOptional('Job Code', 0, 100),
  openings_count: numberMandatory('Openings Count', 0),

  // Contact Person
  show_contact_person: enumMandatory('Show Contact Person', YesNo, YesNo.No),
  contact_person_name: stringOptional('Contact Person Name', 0, 100),
  contact_person_email: stringOptional('Contact Person Email', 0, 100),
  contact_person_mobile: stringOptional('Contact Person Mobile', 0, 15),

  // Experience
  experience_text: stringOptional('Experience Text', 0, 100),
  min_experience_years: numberMandatory('Min Experience Years', 0),
  max_experience_years: numberOptional('Max Experience Years', 0),

  // Salary
  show_salary: enumMandatory('Show Salary', YesNo, YesNo.No),
  salary_text: stringOptional('Salary Text', 0, 100),
  currency_code: stringMandatory('Currency Code', 2, 10),
  salary_lpa_min: doubleOptional('Salary Lpa Min', 0),
  salary_lpa_max: doubleOptional('Salary Lpa Max', 0),

  // Candidate Constraints
  max_notice_period_days: numberOptional('Max Notice Period Days', 0),
  visa_sponsorship: enumOptional('Visa Sponsorship', YesNo, YesNo.No),

  // Status / Dates
  job_status: enumMandatory('Job Status', JobStatus, JobStatus.Draft),
  published_on: dateOptional('Published On'),
  expire_on: dateOptional('Expire On'),

  // Counters
  applications_count: numberMandatory('Applications Count', 0),
  saves_count: numberMandatory('Saves Count', 0),
  views_count: numberMandatory('Views Count', 0),
  shares_count: numberMandatory('Shares Count', 0),
  reports_count: numberMandatory('Reports Count', 0),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs
  JobFileSchema: z
    .array(
      z.lazy(() =>
        JobFileSchema.extend({
          job_id: single_select_optional('Job'), // Single-Selection -> Job
          user_id: single_select_optional('User'), // Single-Selection -> User
        }),
      ),
    )
    .optional()
    .default([]),

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type JobDTO = z.infer<typeof JobSchema>;

// Job Query Schema
export const JobQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_ids: multi_select_optional('Job'), // Multi-selection -> Job

  // Relations - Parent
  user_ids: multi_select_optional('User'), // Multi-selection -> User
  organisation_ids: multi_select_optional('UserOrganisation'), // Multi-selection -> UserOrganisation
  job_type_ids: multi_select_optional('MasterJobType'), // Multi-selection -> MasterJobType
  employment_type_ids: multi_select_optional('MasterEmploymentType'), // Multi-selection -> MasterEmploymentType
  workplace_type_ids: multi_select_optional('MasterWorkplaceType'), // Multi-selection -> MasterWorkplaceType
  salary_period_ids: multi_select_optional('MasterSalaryPeriod'), // Multi-selection -> MasterSalaryPeriod
  job_category_ids: multi_select_optional('MasterJobCategory'), // Multi-selection -> MasterJobCategory
  shift_type_ids: multi_select_optional('MasterShiftType'), // Multi-selection -> MasterShiftType
  education_level_ids: multi_select_optional('MasterEducationLevel'), // Multi-selection -> MasterEducationLevel

  // Enums
  is_featured: enumArrayOptional('Is Featured', YesNo, getAllEnums(YesNo)),
  show_contact_person: enumArrayOptional(
    'Show Contact Person',
    YesNo,
    getAllEnums(YesNo),
  ),
  show_salary: enumArrayOptional('Show Salary', YesNo, getAllEnums(YesNo)),
  visa_sponsorship: enumArrayOptional(
    'Visa Sponsorship',
    YesNo,
    getAllEnums(YesNo),
  ),
  job_status: enumArrayOptional(
    'Job Status',
    JobStatus,
    getAllEnums(JobStatus),
  ),
});
export type JobQueryDTO = z.infer<typeof JobQuerySchema>;

// Convert Job Data to API Payload
export const toJobPayload = (row: Job): JobDTO => ({
  user_id: row.user_id || '',
  organisation_id: row.organisation_id || '',
  job_type_id: row.job_type_id || '',
  employment_type_id: row.employment_type_id || '',
  workplace_type_id: row.workplace_type_id || '',
  salary_period_id: row.salary_period_id || '',
  job_category_id: row.job_category_id || '',
  shift_type_id: row.shift_type_id || '',
  education_level_id: row.education_level_id || '',

  is_featured: row.is_featured || YesNo.No,
  priority_rank: row.priority_rank ?? 0,
  job_slug: row.job_slug || '',
  job_title: row.job_title || '',
  job_description: row.job_description || '',
  responsibilities: row.responsibilities || '',
  requirements: row.requirements || '',
  job_code: row.job_code || '',
  openings_count: row.openings_count ?? 0,
  show_contact_person: row.show_contact_person || YesNo.No,
  contact_person_name: row.contact_person_name || '',
  contact_person_email: row.contact_person_email || '',
  contact_person_mobile: row.contact_person_mobile || '',
  experience_text: row.experience_text || '',
  min_experience_years: row.min_experience_years ?? 0,
  max_experience_years: row.max_experience_years ?? 0,
  show_salary: row.show_salary || YesNo.No,
  salary_text: row.salary_text || '',
  currency_code: row.currency_code || '',
  salary_lpa_min: row.salary_lpa_min ?? 0,
  salary_lpa_max: row.salary_lpa_max ?? 0,
  max_notice_period_days: row.max_notice_period_days ?? 0,
  visa_sponsorship: row.visa_sponsorship || YesNo.No,
  job_status: row.job_status || JobStatus.Draft,
  published_on: row.published_on || '',
  expire_on: row.expire_on || '',
  applications_count: row.applications_count ?? 0,
  saves_count: row.saves_count ?? 0,
  views_count: row.views_count ?? 0,
  shares_count: row.shares_count ?? 0,
  reports_count: row.reports_count ?? 0,

  status: row.status || Status.Active,

  JobFileSchema: (row.JobFile || []).map((item) => ({
    job_id: item.job_id || '',
    user_id: item.user_id || '',

    usage_type: item.usage_type || '',
    file_type: item.file_type || FileType.PDF,
    file_url: item.file_url || '',
    file_key: item.file_key || '',
    file_name: item.file_name || '',
    file_description: item.file_description || '',
    file_size: item.file_size ?? 0,
    file_metadata: item.file_metadata || {},

    status: item.status || Status.Active,

    time_zone_id: '',
  })),

  time_zone_id: '',
});

// Create New Job Payload
export const newJobPayload = (): JobDTO => ({
  user_id: '',
  organisation_id: '',
  job_type_id: '',
  employment_type_id: '',
  workplace_type_id: '',
  salary_period_id: '',
  job_category_id: '',
  shift_type_id: '',
  education_level_id: '',

  is_featured: YesNo.No,
  priority_rank: 0,
  job_slug: '',
  job_title: '',
  job_description: '',
  responsibilities: '',
  requirements: '',
  job_code: '',
  openings_count: 0,
  show_contact_person: YesNo.No,
  contact_person_name: '',
  contact_person_email: '',
  contact_person_mobile: '',
  experience_text: '',
  min_experience_years: 0,
  max_experience_years: 0,
  show_salary: YesNo.No,
  salary_text: '',
  currency_code: '',
  salary_lpa_min: 0,
  salary_lpa_max: 0,
  max_notice_period_days: 0,
  visa_sponsorship: YesNo.No,
  job_status: JobStatus.Draft,
  published_on: '',
  expire_on: '',
  applications_count: 0,
  saves_count: 0,
  views_count: 0,
  shares_count: 0,
  reports_count: 0,

  status: Status.Active,

  JobFileSchema: [],

  time_zone_id: '',
});

// JobSkillLink Create/Update Schema
export const JobSkillLinkSchema = z.object({
  // Relations - Parent
  job_id: single_select_mandatory('Job'), // Single-Selection -> Job
  skill_id: single_select_mandatory('MasterSkill'), // Single-Selection -> MasterSkill

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type JobSkillLinkDTO = z.infer<typeof JobSkillLinkSchema>;

// JobSkillLink Query Schema
export const JobSkillLinkQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_skill_link_ids: multi_select_optional('JobSkillLink'), // Multi-selection -> JobSkillLink

  // Relations - Parent
  job_ids: multi_select_optional('Job'), // Multi-selection -> Job
  skill_ids: multi_select_optional('MasterSkill'), // Multi-selection -> MasterSkill

  // Enums
});
export type JobSkillLinkQueryDTO = z.infer<typeof JobSkillLinkQuerySchema>;

// Convert JobSkillLink Data to API Payload
export const toJobSkillLinkPayload = (row: JobSkillLink): JobSkillLinkDTO => ({
  job_id: row.job_id || '',
  skill_id: row.skill_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New JobSkillLink Payload
export const newJobSkillLinkPayload = (): JobSkillLinkDTO => ({
  job_id: '',
  skill_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// JobLocationLink Create/Update Schema
export const JobLocationLinkSchema = z.object({
  // Relations - Parent
  job_id: single_select_mandatory('Job'), // Single-Selection -> Job
  location_id: single_select_mandatory('MasterLocation'), // Single-Selection -> MasterLocation

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type JobLocationLinkDTO = z.infer<typeof JobLocationLinkSchema>;

// JobLocationLink Query Schema
export const JobLocationLinkQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_location_link_ids: multi_select_optional('JobLocationLink'), // Multi-selection -> JobLocationLink

  // Relations - Parent
  job_ids: multi_select_optional('Job'), // Multi-selection -> Job
  location_ids: multi_select_optional('MasterLocation'), // Multi-selection -> MasterLocation

  // Enums
});
export type JobLocationLinkQueryDTO = z.infer<
  typeof JobLocationLinkQuerySchema
>;

// Convert JobLocationLink Data to API Payload
export const toJobLocationLinkPayload = (
  row: JobLocationLink,
): JobLocationLinkDTO => ({
  job_id: row.job_id || '',
  location_id: row.location_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New JobLocationLink Payload
export const newJobLocationLinkPayload = (): JobLocationLinkDTO => ({
  job_id: '',
  location_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// JobFile Create/Update Schema
export const JobFileSchema = z.object({
  // Relations - Parent
  job_id: single_select_mandatory('Job'), // Single-Selection -> Job
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Usage Type
  usage_type: stringMandatory('Usage Type', 2, 100),

  // File Details
  file_type: enumMandatory('File Type', FileType, FileType.PDF),
  file_url: stringOptional('File Url', 0, 300),
  file_key: stringOptional('File Key', 0, 300),
  file_name: stringOptional('File Name', 0, 300),
  file_description: stringOptional('File Description', 0, 2000),
  file_size: numberOptional('File Size', 0),
  file_metadata: dynamicJsonSchema('File Metadata', {}),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type JobFileDTO = z.infer<typeof JobFileSchema>;

// JobFile Query Schema
export const JobFileQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_file_ids: multi_select_optional('JobFile'), // Multi-selection -> JobFile

  // Relations - Parent
  job_ids: multi_select_optional('Job'), // Multi-selection -> Job
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
  file_type: enumArrayOptional('File Type', FileType, getAllEnums(FileType)),
});
export type JobFileQueryDTO = z.infer<typeof JobFileQuerySchema>;

// Convert JobFile Data to API Payload
export const toJobFilePayload = (row: JobFile): JobFileDTO => ({
  job_id: row.job_id || '',
  user_id: row.user_id || '',

  usage_type: row.usage_type || '',
  file_type: row.file_type || FileType.PDF,
  file_url: row.file_url || '',
  file_key: row.file_key || '',
  file_name: row.file_name || '',
  file_description: row.file_description || '',
  file_size: row.file_size ?? 0,
  file_metadata: row.file_metadata || {},

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New JobFile Payload
export const newJobFilePayload = (): JobFileDTO => ({
  job_id: '',
  user_id: '',

  usage_type: '',
  file_type: FileType.PDF,
  file_url: '',
  file_key: '',
  file_name: '',
  file_description: '',
  file_size: 0,
  file_metadata: {},

  status: Status.Active,

  time_zone_id: '',
});

// JobApplication Create/Update Schema
export const JobApplicationSchema = z.object({
  // Relations - Parent
  job_id: single_select_mandatory('Job'), // Single-Selection -> Job
  applicant_user_id: single_select_mandatory('User'), // Single-Selection -> User

  // User Manager
  application_status: enumMandatory(
    'Application Status',
    JobApplicationStatus,
    JobApplicationStatus.Applied,
  ),

  // Main Field Details
  cover_letter: stringOptional('Cover Letter', 0, 5000),
  current_ctc: doubleOptional('Current Ctc', 0),
  expected_ctc: doubleOptional('Expected Ctc', 0),
  notice_period_days: numberOptional('Notice Period Days', 0),
  can_join_in_days: numberOptional('Can Join In Days', 0),
  total_experience_years: doubleOptional('Total Experience Years', 0),
  current_location: stringOptional('Current Location', 0, 150),
  preferred_location: stringOptional('Preferred Location', 0, 150),
  applicant_full_name_snapshot: stringOptional(
    'Applicant Full Name Snapshot',
    0,
    100,
  ),
  applicant_email_snapshot: stringOptional('Applicant Email Snapshot', 0, 100),
  applicant_mobile_snapshot: stringOptional('Applicant Mobile Snapshot', 0, 15),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs
  JobApplicationFileSchema: z
    .array(
      z.lazy(() =>
        JobApplicationFileSchema.extend({
          job_application_id: single_select_optional('JobApplication'), // Single-Selection -> JobApplication
          applicant_user_id: single_select_optional('User'), // Single-Selection -> User
        }),
      ),
    )
    .optional()
    .default([]),

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type JobApplicationDTO = z.infer<typeof JobApplicationSchema>;

// JobApplication Query Schema
export const JobApplicationQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_application_ids: multi_select_optional('JobApplication'), // Multi-selection -> JobApplication

  // Relations - Parent
  job_ids: multi_select_optional('Job'), // Multi-selection -> Job
  applicant_user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
  application_status: enumArrayOptional(
    'Application Status',
    JobApplicationStatus,
    getAllEnums(JobApplicationStatus),
  ),
});
export type JobApplicationQueryDTO = z.infer<typeof JobApplicationQuerySchema>;

// Convert JobApplication Data to API Payload
export const toJobApplicationPayload = (
  row: JobApplication,
): JobApplicationDTO => ({
  job_id: row.job_id || '',
  applicant_user_id: row.applicant_user_id || '',

  application_status: row.application_status || JobApplicationStatus.Applied,
  cover_letter: row.cover_letter || '',
  current_ctc: row.current_ctc ?? 0,
  expected_ctc: row.expected_ctc ?? 0,
  notice_period_days: row.notice_period_days ?? 0,
  can_join_in_days: row.can_join_in_days ?? 0,
  total_experience_years: row.total_experience_years ?? 0,
  current_location: row.current_location || '',
  preferred_location: row.preferred_location || '',
  applicant_full_name_snapshot: row.applicant_full_name_snapshot || '',
  applicant_email_snapshot: row.applicant_email_snapshot || '',
  applicant_mobile_snapshot: row.applicant_mobile_snapshot || '',

  status: row.status || Status.Active,

  JobApplicationFileSchema: (row.JobApplicationFile || []).map((item) => ({
    job_application_id: item.job_application_id || '',
    applicant_user_id: item.applicant_user_id || '',

    usage_type: item.usage_type || '',
    file_type: item.file_type || FileType.PDF,
    file_url: item.file_url || '',
    file_key: item.file_key || '',
    file_name: item.file_name || '',
    file_description: item.file_description || '',
    file_size: item.file_size ?? 0,
    file_metadata: item.file_metadata || {},

    status: item.status || Status.Active,

    time_zone_id: '',
  })),

  time_zone_id: '',
});

// Create New JobApplication Payload
export const newJobApplicationPayload = (): JobApplicationDTO => ({
  job_id: '',
  applicant_user_id: '',

  application_status: JobApplicationStatus.Applied,
  cover_letter: '',
  current_ctc: 0,
  expected_ctc: 0,
  notice_period_days: 0,
  can_join_in_days: 0,
  total_experience_years: 0,
  current_location: '',
  preferred_location: '',
  applicant_full_name_snapshot: '',
  applicant_email_snapshot: '',
  applicant_mobile_snapshot: '',

  status: Status.Active,

  JobApplicationFileSchema: [],

  time_zone_id: '',
});

// JobApplicationFile Create/Update Schema
export const JobApplicationFileSchema = z.object({
  // Relations - Parent
  job_application_id: single_select_mandatory('JobApplication'), // Single-Selection -> JobApplication
  applicant_user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Usage Type
  usage_type: stringMandatory('Usage Type', 2, 100),

  // File Details
  file_type: enumMandatory('File Type', FileType, FileType.PDF),
  file_url: stringOptional('File Url', 0, 300),
  file_key: stringOptional('File Key', 0, 300),
  file_name: stringOptional('File Name', 0, 300),
  file_description: stringOptional('File Description', 0, 2000),
  file_size: numberOptional('File Size', 0),
  file_metadata: dynamicJsonSchema('File Metadata', {}),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type JobApplicationFileDTO = z.infer<typeof JobApplicationFileSchema>;

// JobApplicationFile Query Schema
export const JobApplicationFileQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_application_file_ids: multi_select_optional('JobApplicationFile'), // Multi-selection -> JobApplicationFile

  // Relations - Parent
  job_application_ids: multi_select_optional('JobApplication'), // Multi-selection -> JobApplication
  applicant_user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
  file_type: enumArrayOptional('File Type', FileType, getAllEnums(FileType)),
});
export type JobApplicationFileQueryDTO = z.infer<
  typeof JobApplicationFileQuerySchema
>;

// Convert JobApplicationFile Data to API Payload
export const toJobApplicationFilePayload = (
  row: JobApplicationFile,
): JobApplicationFileDTO => ({
  job_application_id: row.job_application_id || '',
  applicant_user_id: row.applicant_user_id || '',

  usage_type: row.usage_type || '',
  file_type: row.file_type || FileType.PDF,
  file_url: row.file_url || '',
  file_key: row.file_key || '',
  file_name: row.file_name || '',
  file_description: row.file_description || '',
  file_size: row.file_size ?? 0,
  file_metadata: row.file_metadata || {},

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New JobApplicationFile Payload
export const newJobApplicationFilePayload = (): JobApplicationFileDTO => ({
  job_application_id: '',
  applicant_user_id: '',

  usage_type: '',
  file_type: FileType.PDF,
  file_url: '',
  file_key: '',
  file_name: '',
  file_description: '',
  file_size: 0,
  file_metadata: {},

  status: Status.Active,

  time_zone_id: '',
});

// JobSaved Create/Update Schema
export const JobSavedSchema = z.object({
  // Relations - Parent
  job_id: single_select_mandatory('Job'), // Single-Selection -> Job
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type JobSavedDTO = z.infer<typeof JobSavedSchema>;

// JobSaved Query Schema
export const JobSavedQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_saved_ids: multi_select_optional('JobSaved'), // Multi-selection -> JobSaved

  // Relations - Parent
  job_ids: multi_select_optional('Job'), // Multi-selection -> Job
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type JobSavedQueryDTO = z.infer<typeof JobSavedQuerySchema>;

// Convert JobSaved Data to API Payload
export const toJobSavedPayload = (row: JobSaved): JobSavedDTO => ({
  job_id: row.job_id || '',
  user_id: row.user_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New JobSaved Payload
export const newJobSavedPayload = (): JobSavedDTO => ({
  job_id: '',
  user_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// JobView Create/Update Schema
export const JobViewSchema = z.object({
  // Relations - Parent
  job_id: single_select_mandatory('Job'), // Single-Selection -> Job
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type JobViewDTO = z.infer<typeof JobViewSchema>;

// JobView Query Schema
export const JobViewQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_view_ids: multi_select_optional('JobView'), // Multi-selection -> JobView

  // Relations - Parent
  job_ids: multi_select_optional('Job'), // Multi-selection -> Job
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type JobViewQueryDTO = z.infer<typeof JobViewQuerySchema>;

// Convert JobView Data to API Payload
export const toJobViewPayload = (row: JobView): JobViewDTO => ({
  job_id: row.job_id || '',
  user_id: row.user_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New JobView Payload
export const newJobViewPayload = (): JobViewDTO => ({
  job_id: '',
  user_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// JobShare Create/Update Schema
export const JobShareSchema = z.object({
  // Relations - Parent
  job_id: single_select_mandatory('Job'), // Single-Selection -> Job
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  platform: stringOptional('Platform', 0, 100),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type JobShareDTO = z.infer<typeof JobShareSchema>;

// JobShare Query Schema
export const JobShareQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_share_ids: multi_select_optional('JobShare'), // Multi-selection -> JobShare

  // Relations - Parent
  job_ids: multi_select_optional('Job'), // Multi-selection -> Job
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type JobShareQueryDTO = z.infer<typeof JobShareQuerySchema>;

// Convert JobShare Data to API Payload
export const toJobSharePayload = (row: JobShare): JobShareDTO => ({
  job_id: row.job_id || '',
  user_id: row.user_id || '',

  platform: row.platform || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New JobShare Payload
export const newJobSharePayload = (): JobShareDTO => ({
  job_id: '',
  user_id: '',

  platform: '',

  status: Status.Active,

  time_zone_id: '',
});

// JobReport Create/Update Schema
export const JobReportSchema = z.object({
  // Relations - Parent
  job_id: single_select_mandatory('Job'), // Single-Selection -> Job
  user_id: single_select_mandatory('User'), // Single-Selection -> User
  report_reason_id: single_select_mandatory('MasterReportReason'), // Single-Selection -> MasterReportReason

  // Main Field Details
  description: stringMandatory('Description', 2, 300),
  report_status: enumMandatory(
    'Report Status',
    ReportStatus,
    ReportStatus.Pending,
  ),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type JobReportDTO = z.infer<typeof JobReportSchema>;

// JobReport Query Schema
export const JobReportQuerySchema = BaseQuerySchema.extend({
  // Self Table
  job_report_ids: multi_select_optional('JobReport'), // Multi-selection -> JobReport

  // Relations - Parent
  job_ids: multi_select_optional('Job'), // Multi-selection -> Job
  user_ids: multi_select_optional('User'), // Multi-selection -> User
  report_reason_ids: multi_select_optional('MasterReportReason'), // Multi-selection -> MasterReportReason

  // Enums
  report_status: enumArrayOptional(
    'Report Status',
    ReportStatus,
    getAllEnums(ReportStatus),
  ),
});
export type JobReportQueryDTO = z.infer<typeof JobReportQuerySchema>;

// Convert JobReport Data to API Payload
export const toJobReportPayload = (row: JobReport): JobReportDTO => ({
  job_id: row.job_id || '',
  user_id: row.user_id || '',
  report_reason_id: row.report_reason_id || '',

  description: row.description || '',
  report_status: row.report_status || ReportStatus.Pending,

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New JobReport Payload
export const newJobReportPayload = (): JobReportDTO => ({
  job_id: '',
  user_id: '',
  report_reason_id: '',

  description: '',
  report_status: ReportStatus.Pending,

  status: Status.Active,

  time_zone_id: '',
});

// Event Create/Update Schema
export const EventSchema = z.object({
  // Relations - Parent
  location_id: single_select_mandatory('MasterLocation'), // Single-Selection -> MasterLocation
  user_id: single_select_mandatory('User'), // Single-Selection -> User
  organisation_id: single_select_mandatory('UserOrganisation'), // Single-Selection -> UserOrganisation
  event_type_id: single_select_mandatory('MasterEventType'), // Single-Selection -> MasterEventType
  event_category_id: single_select_mandatory('MasterEventCategory'), // Single-Selection -> MasterEventCategory

  // Logo
  event_logo_url: stringOptional('Event Logo Url', 0, 300),
  event_logo_key: stringOptional('Event Logo Key', 0, 300),
  event_logo_name: stringOptional('Event Logo Name', 0, 300),

  // Banner Image
  event_banner_image_url: stringOptional('Event Banner Image Url', 0, 300),
  event_banner_image_key: stringOptional('Event Banner Image Key', 0, 300),
  event_banner_image_name: stringOptional('Event Banner Image Name', 0, 300),

  // Video
  event_video_url: stringOptional('Event Video Url', 0, 300),
  event_video_key: stringOptional('Event Video Key', 0, 300),
  event_video_name: stringOptional('Event Video Name', 0, 300),

  // Admin Managed
  is_featured: enumMandatory('Is Featured', YesNo, YesNo.No),
  priority_rank: numberMandatory('Priority Rank', 0),
  event_slug: stringOptional('Event Slug', 0, 200),

  // Main Field Details
  event_title: stringMandatory('Event Title', 2, 100),
  event_description: stringMandatory('Event Description', 2, 5000),
  agenda: stringOptional('Agenda', 0, 5000),
  meeting_url: stringOptional('Meeting Url', 0, 300),

  // Schedule
  start_date_time: dateTimeMandatory('Start Date Time'),
  end_date_time: dateTimeOptional('End Date Time'),
  is_all_day: enumMandatory('Is All Day', YesNo, YesNo.No),

  // Offline Details
  venue_name: stringOptional('Venue Name', 0, 100),
  address: stringOptional('Address', 0, 300),
  venue_latitude: doubleOptional('Venue Latitude', 0),
  venue_longitude: doubleOptional('Venue Longitude', 0),

  // Status / Dates
  event_status: enumMandatory('Event Status', EventStatus, EventStatus.Draft),
  published_on: dateOptional('Published On'),
  expire_on: dateOptional('Expire On'),

  // Counters
  interested_count: numberMandatory('Interested Count', 0),
  saved_count: numberMandatory('Saved Count', 0),
  views_count: numberMandatory('Views Count', 0),
  visited_count: numberMandatory('Visited Count', 0),
  shares_count: numberMandatory('Shares Count', 0),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type EventDTO = z.infer<typeof EventSchema>;

// EventLogo Schema
export const EventLogoSchema = z.object({
  // Logo
  event_logo_url: stringMandatory('Event Logo URL', 0, 300),
  event_logo_key: stringMandatory('Event Logo Key', 0, 300),
  event_logo_name: stringMandatory('Event Logo Name', 0, 300),
});
export type EventLogoDTO = z.infer<typeof EventLogoSchema>;

// EventBannerImage Schema
export const EventBannerImageSchema = z.object({
  // Banner Image
  event_banner_image_url: stringMandatory('Event Banner Image URL', 0, 300),
  event_banner_image_key: stringMandatory('Event Banner Image Key', 0, 300),
  event_banner_image_name: stringMandatory('Event Banner Image Name', 0, 300),
});
export type EventBannerImageDTO = z.infer<typeof EventBannerImageSchema>;

// EventVideo Schema
export const EventVideoSchema = z.object({
  // Video
  event_video_url: stringMandatory('Event Video URL', 0, 300),
  event_video_key: stringMandatory('Event Video Key', 0, 300),
  event_video_name: stringMandatory('Event Video Name', 0, 300),
});
export type EventVideoDTO = z.infer<typeof EventVideoSchema>;

// Event Query Schema
export const EventQuerySchema = BaseQuerySchema.extend({
  // Self Table
  event_ids: multi_select_optional('Event'), // Multi-selection -> Event

  // Relations - Parent
  location_ids: multi_select_optional('MasterLocation'), // Multi-selection -> MasterLocation
  user_ids: multi_select_optional('User'), // Multi-selection -> User
  organisation_ids: multi_select_optional('UserOrganisation'), // Multi-selection -> UserOrganisation
  event_type_ids: multi_select_optional('MasterEventType'), // Multi-selection -> MasterEventType
  event_category_ids: multi_select_optional('MasterEventCategory'), // Multi-selection -> MasterEventCategory

  // Enums
  is_featured: enumArrayOptional('Is Featured', YesNo, getAllEnums(YesNo)),
  is_all_day: enumArrayOptional('Is All Day', YesNo, getAllEnums(YesNo)),
  event_status: enumArrayOptional(
    'Event Status',
    EventStatus,
    getAllEnums(EventStatus),
  ),
});
export type EventQueryDTO = z.infer<typeof EventQuerySchema>;

// Convert Event Data to API Payload
export const toEventPayload = (row: Event): EventDTO => ({
  location_id: row.location_id || '',
  user_id: row.user_id || '',
  organisation_id: row.organisation_id || '',
  event_type_id: row.event_type_id || '',
  event_category_id: row.event_category_id || '',

  event_logo_url: row.event_logo_url || '',
  event_logo_key: row.event_logo_key || '',
  event_logo_name: row.event_logo_name || '',
  event_banner_image_url: row.event_banner_image_url || '',
  event_banner_image_key: row.event_banner_image_key || '',
  event_banner_image_name: row.event_banner_image_name || '',
  event_video_url: row.event_video_url || '',
  event_video_key: row.event_video_key || '',
  event_video_name: row.event_video_name || '',
  is_featured: row.is_featured || YesNo.No,
  priority_rank: row.priority_rank ?? 0,
  event_slug: row.event_slug || '',
  event_title: row.event_title || '',
  event_description: row.event_description || '',
  agenda: row.agenda || '',
  meeting_url: row.meeting_url || '',
  start_date_time: row.start_date_time || '',
  end_date_time: row.end_date_time || '',
  is_all_day: row.is_all_day || YesNo.No,
  venue_name: row.venue_name || '',
  address: row.address || '',
  venue_latitude: row.venue_latitude ?? 0,
  venue_longitude: row.venue_longitude ?? 0,
  event_status: row.event_status || EventStatus.Draft,
  published_on: row.published_on || '',
  expire_on: row.expire_on || '',
  interested_count: row.interested_count ?? 0,
  saved_count: row.saved_count ?? 0,
  views_count: row.views_count ?? 0,
  visited_count: row.visited_count ?? 0,
  shares_count: row.shares_count ?? 0,

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New Event Payload
export const newEventPayload = (): EventDTO => ({
  location_id: '',
  user_id: '',
  organisation_id: '',
  event_type_id: '',
  event_category_id: '',

  event_logo_url: '',
  event_logo_key: '',
  event_logo_name: '',
  event_banner_image_url: '',
  event_banner_image_key: '',
  event_banner_image_name: '',
  event_video_url: '',
  event_video_key: '',
  event_video_name: '',
  is_featured: YesNo.No,
  priority_rank: 0,
  event_slug: '',
  event_title: '',
  event_description: '',
  agenda: '',
  meeting_url: '',
  start_date_time: '',
  end_date_time: '',
  is_all_day: YesNo.No,
  venue_name: '',
  address: '',
  venue_latitude: 0,
  venue_longitude: 0,
  event_status: EventStatus.Draft,
  published_on: '',
  expire_on: '',
  interested_count: 0,
  saved_count: 0,
  views_count: 0,
  visited_count: 0,
  shares_count: 0,

  status: Status.Active,

  time_zone_id: '',
});

// EventContactPerson Create/Update Schema
export const EventContactPersonSchema = z.object({
  // Relations - Parent
  event_id: single_select_mandatory('Event'), // Single-Selection -> Event

  // Main Field Details
  contact_person_name: stringMandatory('Contact Person Name', 2, 100),
  contact_person_designation: stringOptional(
    'Contact Person Designation',
    0,
    100,
  ),
  contact_person_email: stringOptional('Contact Person Email', 0, 120),
  contact_person_mobile: stringOptional('Contact Person Mobile', 0, 15),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type EventContactPersonDTO = z.infer<typeof EventContactPersonSchema>;

// EventContactPerson Query Schema
export const EventContactPersonQuerySchema = BaseQuerySchema.extend({
  // Self Table
  event_contact_person_ids: multi_select_optional('EventContactPerson'), // Multi-selection -> EventContactPerson

  // Relations - Parent
  event_ids: multi_select_optional('Event'), // Multi-selection -> Event

  // Enums
});
export type EventContactPersonQueryDTO = z.infer<
  typeof EventContactPersonQuerySchema
>;

// Convert EventContactPerson Data to API Payload
export const toEventContactPersonPayload = (
  row: EventContactPerson,
): EventContactPersonDTO => ({
  event_id: row.event_id || '',

  contact_person_name: row.contact_person_name || '',
  contact_person_designation: row.contact_person_designation || '',
  contact_person_email: row.contact_person_email || '',
  contact_person_mobile: row.contact_person_mobile || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New EventContactPerson Payload
export const newEventContactPersonPayload = (): EventContactPersonDTO => ({
  event_id: '',

  contact_person_name: '',
  contact_person_designation: '',
  contact_person_email: '',
  contact_person_mobile: '',

  status: Status.Active,

  time_zone_id: '',
});

// EventInterested Create/Update Schema
export const EventInterestedSchema = z.object({
  // Relations - Parent
  event_id: single_select_mandatory('Event'), // Single-Selection -> Event
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type EventInterestedDTO = z.infer<typeof EventInterestedSchema>;

// EventInterested Query Schema
export const EventInterestedQuerySchema = BaseQuerySchema.extend({
  // Self Table
  event_interested_ids: multi_select_optional('EventInterested'), // Multi-selection -> EventInterested

  // Relations - Parent
  event_ids: multi_select_optional('Event'), // Multi-selection -> Event
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type EventInterestedQueryDTO = z.infer<
  typeof EventInterestedQuerySchema
>;

// Convert EventInterested Data to API Payload
export const toEventInterestedPayload = (
  row: EventInterested,
): EventInterestedDTO => ({
  event_id: row.event_id || '',
  user_id: row.user_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New EventInterested Payload
export const newEventInterestedPayload = (): EventInterestedDTO => ({
  event_id: '',
  user_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// EventSaved Create/Update Schema
export const EventSavedSchema = z.object({
  // Relations - Parent
  event_id: single_select_mandatory('Event'), // Single-Selection -> Event
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type EventSavedDTO = z.infer<typeof EventSavedSchema>;

// EventSaved Query Schema
export const EventSavedQuerySchema = BaseQuerySchema.extend({
  // Self Table
  event_saved_ids: multi_select_optional('EventSaved'), // Multi-selection -> EventSaved

  // Relations - Parent
  event_ids: multi_select_optional('Event'), // Multi-selection -> Event
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type EventSavedQueryDTO = z.infer<typeof EventSavedQuerySchema>;

// Convert EventSaved Data to API Payload
export const toEventSavedPayload = (row: EventSaved): EventSavedDTO => ({
  event_id: row.event_id || '',
  user_id: row.user_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New EventSaved Payload
export const newEventSavedPayload = (): EventSavedDTO => ({
  event_id: '',
  user_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// EventView Create/Update Schema
export const EventViewSchema = z.object({
  // Relations - Parent
  event_id: single_select_mandatory('Event'), // Single-Selection -> Event
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type EventViewDTO = z.infer<typeof EventViewSchema>;

// EventView Query Schema
export const EventViewQuerySchema = BaseQuerySchema.extend({
  // Self Table
  event_view_ids: multi_select_optional('EventView'), // Multi-selection -> EventView

  // Relations - Parent
  event_ids: multi_select_optional('Event'), // Multi-selection -> Event
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type EventViewQueryDTO = z.infer<typeof EventViewQuerySchema>;

// Convert EventView Data to API Payload
export const toEventViewPayload = (row: EventView): EventViewDTO => ({
  event_id: row.event_id || '',
  user_id: row.user_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New EventView Payload
export const newEventViewPayload = (): EventViewDTO => ({
  event_id: '',
  user_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// EventVisited Create/Update Schema
export const EventVisitedSchema = z.object({
  // Relations - Parent
  event_id: single_select_mandatory('Event'), // Single-Selection -> Event
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type EventVisitedDTO = z.infer<typeof EventVisitedSchema>;

// EventVisited Query Schema
export const EventVisitedQuerySchema = BaseQuerySchema.extend({
  // Self Table
  event_visited_ids: multi_select_optional('EventVisited'), // Multi-selection -> EventVisited

  // Relations - Parent
  event_ids: multi_select_optional('Event'), // Multi-selection -> Event
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type EventVisitedQueryDTO = z.infer<typeof EventVisitedQuerySchema>;

// Convert EventVisited Data to API Payload
export const toEventVisitedPayload = (row: EventVisited): EventVisitedDTO => ({
  event_id: row.event_id || '',
  user_id: row.user_id || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New EventVisited Payload
export const newEventVisitedPayload = (): EventVisitedDTO => ({
  event_id: '',
  user_id: '',

  status: Status.Active,

  time_zone_id: '',
});

// EventShare Create/Update Schema
export const EventShareSchema = z.object({
  // Relations - Parent
  event_id: single_select_mandatory('Event'), // Single-Selection -> Event
  user_id: single_select_mandatory('User'), // Single-Selection -> User

  // Main Field Details
  platform: stringOptional('Platform', 0, 100),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type EventShareDTO = z.infer<typeof EventShareSchema>;

// EventShare Query Schema
export const EventShareQuerySchema = BaseQuerySchema.extend({
  // Self Table
  event_share_ids: multi_select_optional('EventShare'), // Multi-selection -> EventShare

  // Relations - Parent
  event_ids: multi_select_optional('Event'), // Multi-selection -> Event
  user_ids: multi_select_optional('User'), // Multi-selection -> User

  // Enums
});
export type EventShareQueryDTO = z.infer<typeof EventShareQuerySchema>;

// Convert EventShare Data to API Payload
export const toEventSharePayload = (row: EventShare): EventShareDTO => ({
  event_id: row.event_id || '',
  user_id: row.user_id || '',

  platform: row.platform || '',

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New EventShare Payload
export const newEventSharePayload = (): EventShareDTO => ({
  event_id: '',
  user_id: '',

  platform: '',

  status: Status.Active,

  time_zone_id: '',
});

// EventReport Create/Update Schema
export const EventReportSchema = z.object({
  // Relations - Parent
  event_id: single_select_mandatory('Event'), // Single-Selection -> Event
  user_id: single_select_mandatory('User'), // Single-Selection -> User
  report_reason_id: single_select_mandatory('MasterReportReason'), // Single-Selection -> MasterReportReason

  // Main Field Details
  description: stringMandatory('Description', 2, 300),
  report_status: enumMandatory(
    'Report Status',
    ReportStatus,
    ReportStatus.Pending,
  ),

  // Metadata
  status: enumMandatory('Status', Status, Status.Active),

  // Relations - Childs

  // Other
  time_zone_id: single_select_optional('MasterMainTimeZone'),
});
export type EventReportDTO = z.infer<typeof EventReportSchema>;

// EventReport Query Schema
export const EventReportQuerySchema = BaseQuerySchema.extend({
  // Self Table
  event_report_ids: multi_select_optional('EventReport'), // Multi-selection -> EventReport

  // Relations - Parent
  event_ids: multi_select_optional('Event'), // Multi-selection -> Event
  user_ids: multi_select_optional('User'), // Multi-selection -> User
  report_reason_ids: multi_select_optional('MasterReportReason'), // Multi-selection -> MasterReportReason

  // Enums
  report_status: enumArrayOptional(
    'Report Status',
    ReportStatus,
    getAllEnums(ReportStatus),
  ),
});
export type EventReportQueryDTO = z.infer<typeof EventReportQuerySchema>;

// Convert EventReport Data to API Payload
export const toEventReportPayload = (row: EventReport): EventReportDTO => ({
  event_id: row.event_id || '',
  user_id: row.user_id || '',
  report_reason_id: row.report_reason_id || '',

  description: row.description || '',
  report_status: row.report_status || ReportStatus.Pending,

  status: row.status || Status.Active,

  time_zone_id: '',
});

// Create New EventReport Payload
export const newEventReportPayload = (): EventReportDTO => ({
  event_id: '',
  user_id: '',
  report_reason_id: '',

  description: '',
  report_status: ReportStatus.Pending,

  status: Status.Active,

  time_zone_id: '',
});
