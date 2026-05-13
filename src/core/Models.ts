/* eslint-disable @typescript-eslint/no-empty-object-type */
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

// AWSFileKey Interface
export interface AWSFileKey extends Record<string, unknown> {
  // Primary Field
  aws_file_key_id: string;

  // Main Field Details
  file_key: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// CronJobList Interface
export interface CronJobList extends Record<string, unknown> {
  // Primary Field
  cron_job_id: string;

  // Main Field Details
  app_name: string;
  job_name: string;
  category_name?: string;
  sub_category_name?: string;
  job_description?: string;
  cron_name: string;
  cron_expression?: string;
  cron_expression_description?: string;
  is_enabled: YesNo;

  // Next Run Details
  next_run_date_time?: string;
  next_run_date_time_f?: string;

  // Last Run Details
  run_type: RunType;
  execution_status: ExecutionStatus;
  start_date_time?: string;
  start_date_time_f?: string;
  end_date_time?: string;
  end_date_time_f?: string;
  success_details?: string;
  error_details?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child
  CronJobLog?: CronJobLog[];

  // Relations - Child Count
  _count?: {
    CronJobLog?: number;
  };
}

// CronJobLog Interface
export interface CronJobLog extends Record<string, unknown> {
  // Primary Field
  cron_job_log_id: string;

  // Main Field Details
  run_type: RunType;
  execution_status: ExecutionStatus;
  start_date_time?: string;
  start_date_time_f?: string;
  end_date_time?: string;
  end_date_time_f?: string;
  error_details?: string;
  success_details?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent
  cron_job_id: string;
  CronJobList?: CronJobList;
  app_name?: string;
  cron_name?: string;
  is_latest_run: YesNo;

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// APIDataShare Interface
export interface APIDataShare extends Record<string, unknown> {
  // Primary Field
  api_data_share_id: string;

  // Main Field Details
  api_name: string;
  vendor_name: string;
  purpose?: string;
  description?: string;

  // Control
  is_enabled: YesNo;

  // Authentication
  auth_type: APIAuthType;
  api_key?: string;
  username?: string;
  password?: string;

  // Rate limit
  rate_limit_rpm: number;
  allowed_ips: string[];

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child
  APIDataShareLog?: APIDataShareLog[];

  // Relations - Child Count
  _count?: {
    APIDataShareLog?: number;
  };
}

// APIDataShareLog Interface
export interface APIDataShareLog extends Record<string, unknown> {
  // Primary Field
  api_data_share_log_id: string;

  // Main Field Details
  request_date_time: string;
  request_date_time_f: string;
  request_id?: string;
  ip_address?: string;
  user_agent?: string;
  is_auth_success: YesNo;
  failed_message?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent
  api_data_share_id: string;
  APIDataShare?: APIDataShare;
  api_name?: string;
  vendor_name?: string;

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// ContactUsDetail Interface
export interface ContactUsDetail extends Record<string, unknown> {
  // Primary Field
  contact_us_details_id: string;

  // Main Field Details
  mobile_number?: string;
  email?: string;
  facebook_link?: string;
  twitter_link?: string;
  instagram_link?: string;
  youtube_link?: string;
  linkedin_link?: string;
  pinterest_link?: string;
  whats_app_chat_url?: string;
  telegram_chat_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// FAQ Interface
export interface FAQ extends Record<string, unknown> {
  // Primary Field
  faq_id: string;

  // Main Field Details
  faq_section?: string;
  faq_header?: string;
  faq_content?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// StaticPage Interface
export interface StaticPage extends Record<string, unknown> {
  // Primary Field
  page_id: string;

  // Main Field Details
  page_name?: string;
  page_code?: string;
  page_url?: string;
  page_content?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// MasterMainCountry Interface
export interface MasterMainCountry extends Record<string, unknown> {
  // Primary Field
  country_id: string;

  // Main Field Details
  country_name: string;
  country_code: string;
  country_mobile_code: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child
  MasterMainTimeZone?: MasterMainTimeZone[];

  // Relations - Child Count
  _count?: {
    MasterMainTimeZone?: number;
  };
}

// MasterMainTimeZone Interface
export interface MasterMainTimeZone extends Record<string, unknown> {
  // Primary Field
  time_zone_id: string;

  // Main Field Details
  time_zone_code: string;
  time_zone_identifier: string;
  time_zone_abbrevation: string;
  time_zone_offset: string;
  time_zone_offset_seconds: number;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent
  country_id: string;
  MasterMainCountry?: MasterMainCountry;
  country_name?: string;

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// MasterMainDateFormat Interface
export interface MasterMainDateFormat extends Record<string, unknown> {
  // Primary Field
  date_format_id: string;

  // Main Field Details
  date_format_date: string;
  date_format_time: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// MasterChannelCategory Interface
export interface MasterChannelCategory extends Record<string, unknown> {
  // Primary Field
  channel_category_id: string;

  // Main Field Details
  channel_category: string;
  description?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  UserChannel?: UserChannel[];

  // Relations - Child Count
  _count?: {
    UserChannel?: number;
  };
}

// MasterReportReason Interface
export interface MasterReportReason extends Record<string, unknown> {
  // Primary Field
  report_reason_id: string;

  // Main Field Details
  report_reason: string;
  description?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  PostReport?: PostReport[];
  JobReport?: JobReport[];
  EventReport?: EventReport[];

  // Relations - Child Count
  _count?: {
    PostReport?: number;
    JobReport?: number;
    EventReport?: number;
  };
}

// MasterJobType Interface
export interface MasterJobType extends Record<string, unknown> {
  // Primary Field
  job_type_id: string;

  // Main Field Details
  job_type: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  Job?: Job[];

  //Index

  // Relations - Child Count
  _count?: {
    Job?: number;
  };
}

// MasterEmploymentType Interface
export interface MasterEmploymentType extends Record<string, unknown> {
  // Primary Field
  employment_type_id: string;

  // Main Field Details
  employment_type: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  Job?: Job[];
  ResumeExperience?: ResumeExperience[];

  //Index

  // Relations - Child Count
  _count?: {
    Job?: number;
    ResumeExperience?: number;
  };
}

// MasterWorkplaceType Interface
export interface MasterWorkplaceType extends Record<string, unknown> {
  // Primary Field
  workplace_type_id: string;

  // Main Field Details
  workplace_type: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  Job?: Job[];

  //Index

  // Relations - Child Count
  _count?: {
    Job?: number;
  };
}

// MasterSalaryPeriod Interface
export interface MasterSalaryPeriod extends Record<string, unknown> {
  // Primary Field
  salary_period_id: string;

  // Main Field Details
  salary_period: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  Job?: Job[];

  //Index

  // Relations - Child Count
  _count?: {
    Job?: number;
  };
}

// MasterJobCategory Interface
export interface MasterJobCategory extends Record<string, unknown> {
  // Primary Field
  job_category_id: string;

  // Main Field Details
  job_category: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  Job?: Job[];

  //Index

  // Relations - Child Count
  _count?: {
    Job?: number;
  };
}

// MasterEducationLevel Interface
export interface MasterEducationLevel extends Record<string, unknown> {
  // Primary Field
  education_level_id: string;

  // Main Field Details
  education_level: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  Job?: Job[];
  ResumeEducation?: ResumeEducation[];

  //Index

  // Relations - Child Count
  _count?: {
    Job?: number;
    ResumeEducation?: number;
  };
}

// MasterShiftType Interface
export interface MasterShiftType extends Record<string, unknown> {
  // Primary Field
  shift_type_id: string;

  // Main Field Details
  shift_type: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  Job?: Job[];

  //Index

  // Relations - Child Count
  _count?: {
    Job?: number;
  };
}

// MasterLocation Interface
export interface MasterLocation extends Record<string, unknown> {
  // Primary Field
  location_id: string;

  // Main Field Details
  city_name: string;
  state_name: string;
  country_name: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  UserResume?: UserResume[];
  ResumeEducation?: ResumeEducation[];
  ResumeExperience?: ResumeExperience[];
  JobLocationLink?: JobLocationLink[];
  Event?: Event[];
  UserOrganisation?: UserOrganisation[];

  // Relations - Child Count
  _count?: {
    UserResume?: number;
    ResumeEducation?: number;
    ResumeExperience?: number;
    JobLocationLink?: number;
    Event?: number;
    UserOrganisation?: number;
  };
}

// MasterSkill Interface
export interface MasterSkill extends Record<string, unknown> {
  // Primary Field
  skill_id: string;

  // Main Field Details
  skill: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  JobSkillLink?: JobSkillLink[];
  ResumeSkillLink?: ResumeSkillLink[];

  //Index

  // Relations - Child Count
  _count?: {
    JobSkillLink?: number;
    ResumeSkillLink?: number;
  };
}

// MasterLanguage Interface
export interface MasterLanguage extends Record<string, unknown> {
  // Primary Field
  language_id: string;

  // Main Field Details
  language: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  ResumeLanguageLink?: ResumeLanguageLink[];

  //Index

  // Relations - Child Count
  _count?: {
    ResumeLanguageLink?: number;
  };
}

// MasterUrl Interface
export interface MasterUrl extends Record<string, unknown> {
  // Primary Field
  url_id: string;

  // Main Field Details
  url: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  ResumeUrlLink?: ResumeUrlLink[];

  //Index

  // Relations - Child Count
  _count?: {
    ResumeUrlLink?: number;
  };
}

// MasterJobTitle Interface
export interface MasterJobTitle extends Record<string, unknown> {
  // Primary Field
  job_title_id: string;

  // Main Field Details
  job_title: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  ResumeExperience?: ResumeExperience[];

  //Index

  // Relations - Child Count
  _count?: {
    ResumeExperience?: number;
  };
}

// MasterJobCompany Interface
export interface MasterJobCompany extends Record<string, unknown> {
  // Primary Field
  job_company_id: string;

  // Logo
  company_logo_url?: string;
  company_logo_key?: string;
  company_logo_name?: string;

  // Main Field Details
  company_name: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  ResumeExperience?: ResumeExperience[];

  //Index

  // Relations - Child Count
  _count?: {
    ResumeExperience?: number;
  };
}

// MasterEventType Interface
export interface MasterEventType extends Record<string, unknown> {
  // Primary Field
  event_type_id: string;

  // Main Field Details
  event_type: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  Event?: Event[];

  //Index

  // Relations - Child Count
  _count?: {
    Event?: number;
  };
}

// MasterEventCategory Interface
export interface MasterEventCategory extends Record<string, unknown> {
  // Primary Field
  event_category_id: string;

  // Main Field Details
  event_category: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  Event?: Event[];

  //Index

  // Relations - Child Count
  _count?: {
    Event?: number;
  };
}

// UserAdmin Interface
export interface UserAdmin extends Record<string, unknown> {
  // Primary Field
  admin_id: string;

  // Image
  admin_image_url?: string;
  admin_image_key?: string;
  admin_image_name?: string;

  // Main Field Details
  admin_name: string;
  email: string;
  mobile?: string;
  password?: string;
  admin_role: AdminRole;
  admin_details?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent

  // Relations - Child
  UserAdminFile?: UserAdminFile[];
  UserAdminLoginPush?: UserAdminLoginPush[];

  // Relations - Child Count
  _count?: {
    UserAdminFile?: number;
    UserAdminLoginPush?: number;
  };
}

// UserAdminFile Interface
export interface UserAdminFile extends Record<string, unknown> {
  // Primary Field
  admin_file_id: string;

  // Main Field Details

  // Usage Type -> Aadhaar Front Image, Aadhaar Back Image,  Pan Image
  usage_type: string;

  // File Details
  file_type: FileType;
  file_url?: string;
  file_key?: string;
  file_name?: string;
  file_description?: string;
  file_size?: number;
  file_metadata?: Record<string, unknown>;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent
  admin_id: string;
  UserAdmin?: UserAdmin;
  admin_details?: string;
  admin_image_url?: string;

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// UserAdminLoginPush Interface
export interface UserAdminLoginPush extends Record<string, unknown> {
  // Primary Field
  admin_login_push_id: string;

  // Main Field Details
  fcm_token: string;
  platform: LoginFrom;
  user_agent?: string;
  ip_address?: string;
  device_id?: string;
  device_model?: string;
  os_name?: string;
  os_version?: string;
  browser_name?: string;
  browser_version?: string;
  app_version?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Parent
  admin_id: string;
  UserAdmin?: UserAdmin;
  admin_details?: string;
  admin_image_url?: string;

  // Relations - Child

  // Relations - Child Count
  _count?: {};
}

// User Interface
export interface User extends Record<string, unknown> {
  // Primary Field
  user_id: string;

  // Profile Image
  user_profile_image_url?: string;
  user_profile_image_key?: string;
  user_profile_image_name?: string;

  // Banner Image
  user_banner_image_url?: string;
  user_banner_image_key?: string;
  user_banner_image_name?: string;

  // Main Field Details
  first_name: string;
  last_name?: string;
  email: string;
  username?: string;
  mobile?: string;
  password?: string;
  user_type: UserType;
  account_type: AccountType;
  user_details?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Counters
  friends_count: number;
  followers_count: number;
  following_count: number;
  post_count: number;
  job_count: number;
  event_count: number;

  // Relations - Child
  UserLoginPush?: UserLoginPush[];

  // Masters
  MasterJobType?: MasterJobType[];
  MasterEmploymentType?: MasterEmploymentType[];
  MasterWorkplaceType?: MasterWorkplaceType[];
  MasterSalaryPeriod?: MasterSalaryPeriod[];
  MasterJobCategory?: MasterJobCategory[];
  MasterShiftType?: MasterShiftType[];
  MasterEducationLevel?: MasterEducationLevel[];
  MasterLocation?: MasterLocation[];
  MasterSkill?: MasterSkill[];
  MasterLanguage?: MasterLanguage[];
  MasterUrl?: MasterUrl[];
  MasterJobTitle?: MasterJobTitle[];
  MasterJobCompany?: MasterJobCompany[];
  MasterEventType?: MasterEventType[];
  MasterEventCategory?: MasterEventCategory[];

  // Resume
  UserResume?: UserResume;
  ResumeFile?: ResumeFile[];
  ResumeExperience?: ResumeExperience[];
  ResumeProject?: ResumeProject[];
  ResumeEducation?: ResumeEducation[];
  ResumeCertification?: ResumeCertification[];
  ResumeAchievement?: ResumeAchievement[];
  ResumeSkillLink?: ResumeSkillLink[];
  ResumeLanguageLink?: ResumeLanguageLink[];
  ResumeUrlLink?: ResumeUrlLink[];

  // Block
  UserBlock_1?: UserBlock[];
  UserBlock_2?: UserBlock[];
  UserBlock_blocker?: UserBlock[];

  // Friend
  UserFriend_1?: UserFriend[];
  UserFriend_2?: UserFriend[];
  UserFriend_requester?: UserFriend[];

  // Follow
  UserFollow_follower?: UserFollow[];
  UserFollow_following?: UserFollow[];

  // Social Summary
  UserSocialSummary_main?: UserSocialSummary[];
  UserSocialSummary_secondary?: UserSocialSummary[];

  // Admin Groups
  MasterAdminGroup?: MasterAdminGroup[];
  AdminGroupMemberLink?: AdminGroupMemberLink[];

  // Channels
  UserChannel?: UserChannel[];
  UserChannelLink?: UserChannelLink[];

  // Organisations
  UserOrganisation?: UserOrganisation[];
  UserOrganisationLink?: UserOrganisationLink[];

  // Posts
  Post?: Post[];
  PostLike?: PostLike[];
  PostComment?: PostComment[];
  PostSaved?: PostSaved[];
  PostView?: PostView[];
  PostReport?: PostReport[];
  PostTag?: PostTag[];
  PostFile?: PostFile[];

  // Jobs
  Job?: Job[];
  JobFile?: JobFile[];
  JobApplication?: JobApplication[];
  JobApplicationFile?: JobApplicationFile[];
  JobSaved?: JobSaved[];
  JobView?: JobView[];
  JobShare?: JobShare[];
  JobReport?: JobReport[];

  // Events
  Event?: Event[];
  EventInterested?: EventInterested[];
  EventSaved?: EventSaved[];
  EventView?: EventView[];
  EventVisited?: EventVisited[];
  EventShare?: EventShare[];
  EventReport?: EventReport[];

  // Relations - Child Count
  _count?: {
    UserLoginPush?: number;
    MasterJobType?: number;
    MasterEmploymentType?: number;
    MasterWorkplaceType?: number;
    MasterSalaryPeriod?: number;
    MasterJobCategory?: number;
    MasterShiftType?: number;
    MasterEducationLevel?: number;
    MasterLocation?: number;
    MasterSkill?: number;
    MasterLanguage?: number;
    MasterUrl?: number;
    MasterJobTitle?: number;
    MasterJobCompany?: number;
    MasterEventType?: number;
    MasterEventCategory?: number;
    ResumeFile?: number;
    ResumeExperience?: number;
    ResumeProject?: number;
    ResumeEducation?: number;
    ResumeCertification?: number;
    ResumeAchievement?: number;
    ResumeSkillLink?: number;
    ResumeLanguageLink?: number;
    ResumeUrlLink?: number;
    UserBlock_1?: number;
    UserBlock_2?: number;
    UserBlock_blocker?: number;
    UserFriend_1?: number;
    UserFriend_2?: number;
    UserFriend_requester?: number;
    UserFollow_follower?: number;
    UserFollow_following?: number;
    UserSocialSummary_main?: number;
    UserSocialSummary_secondary?: number;
    MasterAdminGroup?: number;
    AdminGroupMemberLink?: number;
    UserChannel?: number;
    UserChannelLink?: number;
    UserOrganisation?: number;
    UserOrganisationLink?: number;
    Post?: number;
    PostLike?: number;
    PostComment?: number;
    PostSaved?: number;
    PostView?: number;
    PostReport?: number;
    PostTag?: number;
    PostFile?: number;
    Job?: number;
    JobFile?: number;
    JobApplication?: number;
    JobApplicationFile?: number;
    JobSaved?: number;
    JobView?: number;
    JobShare?: number;
    JobReport?: number;
    Event?: number;
    EventInterested?: number;
    EventSaved?: number;
    EventView?: number;
    EventVisited?: number;
    EventShare?: number;
    EventReport?: number;
  };
}

// UserLoginPush Interface
export interface UserLoginPush extends Record<string, unknown> {
  // Primary Field
  user_login_push_id: string;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;
  fcm_token: string;
  platform: LoginFrom;
  user_agent?: string;
  ip_address?: string;
  device_id?: string;
  device_model?: string;
  os_name?: string;
  os_version?: string;
  browser_name?: string;
  browser_version?: string;
  app_version?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// UserResume Interface
export interface UserResume extends Record<string, unknown> {
  // Primary Field
  resume_id: string;

  // Image
  resume_image_url?: string;
  resume_image_key?: string;
  resume_image_name?: string;

  // Main Field Details
  resume_full_name?: string;
  resume_email?: string;
  resume_mobile?: string;
  headline?: string;
  summary?: string;
  hash_tech_stack?: string;

  // Contact Details (Editable)

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;
  location_id: string;
  MasterLocation?: MasterLocation;
  city_name?: string;
  state_name?: string;
  country_name?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // One Resume per User

  // Relations - Child Count
  _count?: {};
}

// ResumeFile Interface
export interface ResumeFile extends Record<string, unknown> {
  // Primary Field
  resume_file_id: string;

  // Usage Type
  usage_type: string;

  // File Details
  file_type: FileType;
  file_url?: string;
  file_key?: string;
  file_name?: string;
  file_description?: string;
  file_size?: number;
  file_metadata?: Record<string, unknown>;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// ResumeExperience Interface
export interface ResumeExperience extends Record<string, unknown> {
  // Primary Field
  resume_experience_id: string;

  // Main Field Details
  start_date?: string;
  start_date_f?: string;
  end_date?: string;
  end_date_f?: string;
  is_current: YesNo;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;
  job_company_id: string;
  MasterJobCompany?: MasterJobCompany;
  company_name?: string;
  company_logo_url?: string;
  job_title_id: string;
  MasterJobTitle?: MasterJobTitle;
  job_title?: string;
  employment_type_id: string;
  MasterEmploymentType?: MasterEmploymentType;
  employment_type?: string;
  location_id: string;
  MasterLocation?: MasterLocation;
  city_name?: string;
  state_name?: string;
  country_name?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// ResumeProject Interface
export interface ResumeProject extends Record<string, unknown> {
  // Primary Field
  resume_project_id: string;

  // Main Field Details
  project_title: string;
  role?: string;
  tech_stack?: string;
  project_url?: string;
  description?: string;
  start_date?: string;
  start_date_f?: string;
  end_date?: string;
  end_date_f?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// ResumeEducation Interface
export interface ResumeEducation extends Record<string, unknown> {
  // Primary Field
  resume_education_id: string;

  // Main Field Details
  institute_name: string;
  degree?: string;
  field_of_study?: string;
  start_year?: number;
  end_year?: number;
  grade?: string;
  percentage?: number;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;
  education_level_id?: string;
  MasterEducationLevel?: MasterEducationLevel;
  education_level?: string;
  location_id: string;
  MasterLocation?: MasterLocation;
  city_name?: string;
  state_name?: string;
  country_name?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// ResumeCertification Interface
export interface ResumeCertification extends Record<string, unknown> {
  // Primary Field
  resume_certification_id: string;

  // Main Field Details
  certification_name: string;
  issued_by?: string;
  certificate_number?: string;
  issue_date?: string;
  issue_date_f?: string;
  expiry_date?: string;
  expiry_date_f?: string;
  credential_url?: string;
  description?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// ResumeAchievement Interface
export interface ResumeAchievement extends Record<string, unknown> {
  // Primary Field
  resume_achievement_id: string;

  // Main Field Details
  achievement_title: string;
  description?: string;
  achieved_on?: string;
  achieved_on_f?: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// ResumeSkillLink Interface
export interface ResumeSkillLink extends Record<string, unknown> {
  // Primary Field
  resume_skill_link_id: string;

  // Main Field Details
  skill_level: ResumeSkillLevel;
  years?: number;

  // Relations - Parent
  skill_id: string;
  MasterSkill?: MasterSkill;
  skill?: string;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// ResumeLanguageLink Interface
export interface ResumeLanguageLink extends Record<string, unknown> {
  // Primary Field
  resume_language_link_id: string;

  // Main Field Details
  proficiency: LanguageProficiency;

  // Relations - Parent
  language_id: string;
  MasterLanguage?: MasterLanguage;
  language?: string;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// ResumeUrlLink Interface
export interface ResumeUrlLink extends Record<string, unknown> {
  // Primary Field
  resume_url_link_id: string;

  // Main Field Details
  url_value: string;

  // Relations - Parent
  url_id: string;
  MasterUrl?: MasterUrl;
  url?: string;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// UserBlock Interface
export interface UserBlock extends Record<string, unknown> {
  // Primary Field
  block_id: string;

  // Normalized Pair — smaller UUID always user_id_1
  user_id_1: string;
  user_1?: User;
  user_details_1?: string;
  user_profile_image_url_1?: string;
  user_id_2: string;
  user_2?: User;
  user_details_2?: string;
  user_profile_image_url_2?: string;

  // Who blocked — direction context
  blocker_user_id: string;
  blocker_user?: User;
  blocker_user_details?: string;
  blocker_user_profile_image_url?: string;

  // Timestamps
  blocked_on: string;
  blocked_on_f: string;

  // Metadata
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  UserSocialSummary?: UserSocialSummary[];

  // ONE row per pair

  // Relations - Child Count
  _count?: {
    UserSocialSummary?: number;
  };
}

// UserFriend Interface
export interface UserFriend extends Record<string, unknown> {
  // Primary Field
  friend_id: string;

  // Normalized Pair — smaller UUID always user_id_1
  user_id_1: string;
  user_1?: User;
  user_details_1?: string;
  user_profile_image_url_1?: string;
  user_id_2: string;
  user_2?: User;
  user_details_2?: string;
  user_profile_image_url_2?: string;

  // Who initiated — direction context
  requester_user_id: string;
  requester_user?: User;
  requester_user_details?: string;
  requester_user_profile_image_url?: string;

  // State
  friend_status: FriendStatus;

  // Timestamps per state
  requested_on?: string;
  requested_on_f?: string;
  friends_since?: string;
  friends_since_f?: string;

  // Metadata
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  UserSocialSummary?: UserSocialSummary[];

  // ONE row per pair

  // Relations - Child Count
  _count?: {
    UserSocialSummary?: number;
  };
}

// UserFollow Interface
export interface UserFollow extends Record<string, unknown> {
  // Primary Field
  follow_id: string;

  // Directional
  follower_user_id: string;
  follower_user?: User;
  follower_user_details?: string;
  follower_user_profile_image_url?: string;
  following_user_id: string;
  following_user?: User;
  following_user_details?: string;
  following_user_profile_image_url?: string;

  // State
  follow_status: FollowStatus;

  // Timestamps per state
  requested_on?: string;
  requested_on_f?: string;
  followed_on?: string;
  followed_on_f?: string;

  // Metadata
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  UserSocialSummary?: UserSocialSummary[];

  // ONE follow per direction per pair

  // Relations - Child Count
  _count?: {
    UserSocialSummary?: number;
  };
}

// UserSocialSummary Interface
export interface UserSocialSummary extends Record<string, unknown> {
  // Primary Field
  user_social_summary_id: string;

  // Directional — main_user_id is always the viewer
  main_user_id: string;
  main_user?: User;
  main_user_details?: string;
  main_user_profile_image_url?: string;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Block state
  is_blocked?: boolean;
  block_id?: string;
  UserBlock?: UserBlock;

  // Friend state
  friend_status?: FriendStatus;
  friend_id?: string;
  UserFriend?: UserFriend;

  // Follow state
  follow_status?: FollowStatus;
  follow_id?: string;
  UserFollow?: UserFollow;

  // ONE row per direction per pair

  // Relations - Child Count
  _count?: {};
}

// MasterAdminGroup Interface
export interface MasterAdminGroup extends Record<string, unknown> {
  // Primary Field
  master_admin_group_id: string;

  // Logo
  admin_group_logo_url?: string;
  admin_group_logo_key?: string;
  admin_group_logo_name?: string;

  // Banner Image
  admin_group_banner_image_url?: string;
  admin_group_banner_image_key?: string;
  admin_group_banner_image_name?: string;

  // Counters
  followers_count: number;

  // Main Field Details
  admin_group_name: string;
  description: string;
  admin_status: AdminStatus;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Relations - Child
  AdminGroupMemberLink?: AdminGroupMemberLink[];

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {
    AdminGroupMemberLink?: number;
  };
}

// AdminGroupMemberLink Interface
export interface AdminGroupMemberLink extends Record<string, unknown> {
  // Primary Field
  user_group_link_id: string;

  // Relations - Parent
  master_admin_group_id: string;
  MasterAdminGroup?: MasterAdminGroup;
  admin_group_name?: string;
  admin_group_logo_url?: string;
  admin_group_banner_image_url?: string;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// UserChannel Interface
export interface UserChannel extends Record<string, unknown> {
  // Primary Field
  user_channel_id: string;

  // Logo
  user_channel_logo_url?: string;
  user_channel_logo_key?: string;
  user_channel_logo_name?: string;

  // Banner Image
  user_channel_banner_image_url?: string;
  user_channel_banner_image_key?: string;
  user_channel_banner_image_name?: string;

  // Counters
  followers_count: number;

  // Main Field Details
  user_channel_name: string;
  description: string;
  admin_status: AdminStatus;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;
  channel_category_id: string;
  MasterChannelCategory?: MasterChannelCategory;
  channel_category?: string;

  // Relations - Child
  UserChannelLink?: UserChannelLink[];
  Post?: Post[];

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {
    UserChannelLink?: number;
    Post?: number;
  };
}

// UserChannelLink Interface
export interface UserChannelLink extends Record<string, unknown> {
  // Primary Field
  user_channel_link_id: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;
  user_channel_id: string;
  UserChannel?: UserChannel;
  user_channel_name?: string;
  user_channel_logo_url?: string;
  user_channel_banner_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// UserOrganisation Interface
export interface UserOrganisation extends Record<string, unknown> {
  // Primary Field
  organisation_id: string;

  // Logo
  organisation_logo_url?: string;
  organisation_logo_key?: string;
  organisation_logo_name?: string;

  // Banner Image
  organisation_banner_image_url?: string;
  organisation_banner_image_key?: string;
  organisation_banner_image_name?: string;

  // Counters
  followers_count: number;

  // Main Field Details
  organisation_name: string;
  about_organisation?: string;
  organisation_type: OrganisationType;
  organisation_size: OrganisationSize;
  organisation_mobile: string;
  organisation_email: string;
  website?: string;
  address?: string;
  admin_status: AdminStatus;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;
  location_id?: string;
  MasterLocation?: MasterLocation;
  city_name?: string;
  state_name?: string;
  country_name?: string;

  // Relations - Child
  UserOrganisationLink?: UserOrganisationLink[];
  Job?: Job[];
  Event?: Event[];

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {
    UserOrganisationLink?: number;
    Job?: number;
    Event?: number;
  };
}

// UserOrganisationLink Interface
export interface UserOrganisationLink extends Record<string, unknown> {
  // Primary Field
  user_organisation_link_id: string;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;
  organisation_id: string;
  UserOrganisation?: UserOrganisation;
  organisation_name?: string;
  organisation_logo_url?: string;
  organisation_banner_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// Post Interface
export interface Post extends Record<string, unknown> {
  post_id: string;
  content: string;
  media_url?: string;
  hashtags: string[];
  likes_count?: number;
  comments_count?: number;
  views_count?: number;
  saves_count?: number;
  shares_count?: number;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;
  user_channel_id?: string;
  UserChannel?: UserChannel;
  user_channel_name?: string;
  user_channel_logo_url?: string;
  user_channel_banner_image_url?: string;
  parent_post_id?: string;
  ParentPost?: Post;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  PostFile?: PostFile[];
  PostTag?: PostTag[];
  PostLike?: PostLike[];
  PostComment?: PostComment[];
  PostView?: PostView[];
  PostSaved?: PostSaved[];
  PostShare?: Post[];
  PostReport?: PostReport[];

  // Relations - Child Count
  _count?: {
    PostFile?: number;
    PostTag?: number;
    PostLike?: number;
    PostComment?: number;
    PostView?: number;
    PostSaved?: number;
    PostShare?: number;
    PostReport?: number;
  };
}

// PostTag Interface
export interface PostTag extends Record<string, unknown> {
  post_tag_id: string;

  // Relations - Parent
  post_id: string;
  Post?: Post;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// PostFile Interface
export interface PostFile extends Record<string, unknown> {
  // Primary Field
  post_file_id: string;

  // Usage Type
  usage_type: string;

  // File Details
  file_type: FileType;
  file_url?: string;
  file_key?: string;
  file_name?: string;
  file_description?: string;
  file_size?: number;
  file_metadata?: Record<string, unknown>;

  // Relations - Parent
  post_id: string;
  Post?: Post;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// PostLike Interface
export interface PostLike extends Record<string, unknown> {
  post_like_id: string;

  // Relations - Parent
  post_id: string;
  Post?: Post;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// PostComment Interface
export interface PostComment extends Record<string, unknown> {
  post_comment_id: string;
  comment_text: string;

  // Relations - Parent
  post_id: string;
  Post?: Post;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// PostView Interface
export interface PostView extends Record<string, unknown> {
  post_view_id: string;

  // Relations - Parent
  post_id: string;
  Post?: Post;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// PostSaved Interface
export interface PostSaved extends Record<string, unknown> {
  post_saved_id: string;

  // Relations - Parent
  post_id: string;
  Post?: Post;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// PostReport Interface
export interface PostReport extends Record<string, unknown> {
  post_report_id: string;
  description: string;
  report_status: ReportStatus;

  // Relations - Parent
  post_id: string;
  Post?: Post;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;
  report_reason_id: string;
  MasterReportReason?: MasterReportReason;
  report_reason?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// Job Interface
export interface Job extends Record<string, unknown> {
  // Primary Field
  job_id: string;

  // Admin Managed
  is_featured: YesNo;
  priority_rank: number;
  job_slug?: string;

  // Main Field Details
  job_title: string;
  job_description: string;
  responsibilities?: string;
  requirements?: string;
  job_code?: string;
  openings_count: number;

  // Contact Person
  show_contact_person: YesNo;
  contact_person_name?: string;
  contact_person_email?: string;
  contact_person_mobile?: string;

  // Experience
  experience_text?: string;
  min_experience_years: number;
  max_experience_years?: number;

  // Salary
  show_salary: YesNo;
  salary_text?: string;
  currency_code: string;
  salary_lpa_min?: number;
  salary_lpa_max?: number;

  // Candidate Constraints
  max_notice_period_days?: number;
  visa_sponsorship?: YesNo;

  // Status / Dates
  job_status: JobStatus;
  published_on?: string;
  published_on_f?: string;
  expire_on?: string;
  expire_on_f?: string;

  // Counters
  applications_count: number;
  saves_count: number;
  views_count: number;
  shares_count: number;
  reports_count: number;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;
  organisation_id: string;
  UserOrganisation?: UserOrganisation;
  organisation_name?: string;
  organisation_logo_url?: string;
  organisation_banner_image_url?: string;
  job_type_id: string;
  MasterJobType?: MasterJobType;
  job_type?: string;
  employment_type_id: string;
  MasterEmploymentType?: MasterEmploymentType;
  employment_type?: string;
  workplace_type_id: string;
  MasterWorkplaceType?: MasterWorkplaceType;
  workplace_type?: string;
  salary_period_id: string;
  MasterSalaryPeriod?: MasterSalaryPeriod;
  salary_period?: string;
  job_category_id?: string;
  MasterJobCategory?: MasterJobCategory;
  job_category?: string;
  shift_type_id?: string;
  MasterShiftType?: MasterShiftType;
  shift_type?: string;
  education_level_id?: string;
  MasterEducationLevel?: MasterEducationLevel;
  education_level?: string;

  // Relations - Child
  JobSkillLink?: JobSkillLink[];
  JobLocationLink?: JobLocationLink[];
  JobFile?: JobFile[];
  JobApplication?: JobApplication[];
  JobSaved?: JobSaved[];
  JobView?: JobView[];
  JobShare?: JobShare[];
  JobReport?: JobReport[];

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {
    JobSkillLink?: number;
    JobLocationLink?: number;
    JobFile?: number;
    JobApplication?: number;
    JobSaved?: number;
    JobView?: number;
    JobShare?: number;
    JobReport?: number;
  };
}

// JobSkillLink Interface
export interface JobSkillLink extends Record<string, unknown> {
  // Primary Field
  job_skill_link_id: string;

  // Relations - Parent
  job_id: string;
  Job?: Job;
  skill_id: string;
  MasterSkill?: MasterSkill;
  skill?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// JobLocationLink Interface
export interface JobLocationLink extends Record<string, unknown> {
  // Primary Field
  job_location_link_id: string;

  // Relations - Parent
  job_id: string;
  Job?: Job;
  location_id: string;
  MasterLocation?: MasterLocation;
  city_name?: string;
  state_name?: string;
  country_name?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// JobFile Interface
export interface JobFile extends Record<string, unknown> {
  // Primary Field
  job_file_id: string;

  // Usage Type
  usage_type: string;

  // File Details
  file_type: FileType;
  file_url?: string;
  file_key?: string;
  file_name?: string;
  file_description?: string;
  file_size?: number;
  file_metadata?: Record<string, unknown>;

  // Relations - Parent
  job_id: string;
  Job?: Job;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// JobApplication Interface
export interface JobApplication extends Record<string, unknown> {
  // Primary Field
  job_application_id: string;

  // User Manager
  application_status: JobApplicationStatus;

  // Main Field Details
  cover_letter?: string;
  current_ctc?: number;
  expected_ctc?: number;
  notice_period_days?: number;
  can_join_in_days?: number;
  total_experience_years?: number;
  current_location?: string;
  preferred_location?: string;
  applicant_full_name_snapshot?: string;
  applicant_email_snapshot?: string;
  applicant_mobile_snapshot?: string;

  // Relations - Parent
  job_id: string;
  Job?: Job;
  applicant_user_id: string;
  ApplicantUser?: User;
  applicant_user_details?: string;
  applicant_user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child
  JobApplicationFile?: JobApplicationFile[];

  // Relations - Child Count
  _count?: {
    JobApplicationFile?: number;
  };
}

// JobApplicationFile Interface
export interface JobApplicationFile extends Record<string, unknown> {
  // Primary Field
  job_application_file_id: string;

  // Usage Type
  usage_type: string;

  // File Details
  file_type: FileType;
  file_url?: string;
  file_key?: string;
  file_name?: string;
  file_description?: string;
  file_size?: number;
  file_metadata?: Record<string, unknown>;

  // Relations - Parent
  job_application_id: string;
  JobApplication?: JobApplication;
  applicant_user_id: string;
  ApplicantUser?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// JobSaved Interface
export interface JobSaved extends Record<string, unknown> {
  // Primary Field
  job_saved_id: string;

  // Relations - Parent
  job_id: string;
  Job?: Job;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// JobView Interface
export interface JobView extends Record<string, unknown> {
  // Primary Field
  job_view_id: string;

  // Relations - Parent
  job_id: string;
  Job?: Job;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// JobShare Interface
export interface JobShare extends Record<string, unknown> {
  // Primary Field
  job_share_id: string;

  // Main Field Details
  platform?: string;

  // Relations - Parent
  job_id: string;
  Job?: Job;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// JobReport Interface
export interface JobReport extends Record<string, unknown> {
  // Primary Field
  job_report_id: string;

  // Main Field Details
  description: string;
  report_status: ReportStatus;

  // Relations - Parent
  job_id: string;
  Job?: Job;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;
  report_reason_id: string;
  MasterReportReason?: MasterReportReason;
  report_reason?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// Event Interface
export interface Event extends Record<string, unknown> {
  // Primary Field
  event_id: string;

  // Logo
  event_logo_url?: string;
  event_logo_key?: string;
  event_logo_name?: string;

  // Banner Image
  event_banner_image_url?: string;
  event_banner_image_key?: string;
  event_banner_image_name?: string;

  // Video
  event_video_url?: string;
  event_video_key?: string;
  event_video_name?: string;

  // Admin Managed
  is_featured: YesNo;
  priority_rank: number;
  event_slug?: string;

  // Main Field Details
  event_title: string;
  event_description: string;
  agenda?: string;
  meeting_url?: string;

  // Schedule
  start_date_time: string;
  start_date_time_f: string;
  end_date_time?: string;
  end_date_time_f?: string;
  is_all_day: YesNo;

  // Offline Details
  venue_name?: string;
  address?: string;
  venue_latitude?: number;
  venue_longitude?: number;
  location_id?: string;
  MasterLocation?: MasterLocation;
  city_name?: string;
  state_name?: string;
  country_name?: string;

  // Status / Dates
  event_status: EventStatus;
  published_on?: string;
  published_on_f?: string;
  expire_on?: string;
  expire_on_f?: string;

  // Counters
  interested_count: number;
  saved_count: number;
  views_count: number;
  visited_count: number;
  shares_count: number;

  // Relations - Parent
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;
  organisation_id: string;
  UserOrganisation?: UserOrganisation;
  organisation_name?: string;
  organisation_logo_url?: string;
  organisation_banner_image_url?: string;
  event_type_id: string;
  MasterEventType?: MasterEventType;
  event_type?: string;
  event_category_id: string;
  MasterEventCategory?: MasterEventCategory;
  event_category?: string;

  // Relations - Child
  EventContactPerson?: EventContactPerson[];
  EventInterested?: EventInterested[];
  EventSaved?: EventSaved[];
  EventView?: EventView[];
  EventVisited?: EventVisited[];
  EventShare?: EventShare[];
  EventReport?: EventReport[];

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {
    EventContactPerson?: number;
    EventInterested?: number;
    EventSaved?: number;
    EventView?: number;
    EventVisited?: number;
    EventShare?: number;
    EventReport?: number;
  };
}

// EventContactPerson Interface
export interface EventContactPerson extends Record<string, unknown> {
  // Primary Field
  event_contact_person_id: string;

  // Main Field Details
  contact_person_name: string;
  contact_person_designation?: string;
  contact_person_email?: string;
  contact_person_mobile?: string;

  // Relations - Parent
  event_id: string;
  Event?: Event;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// EventInterested Interface
export interface EventInterested extends Record<string, unknown> {
  // Primary Field
  event_interested_id: string;

  // Relations - Parent
  event_id: string;
  Event?: Event;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// EventSaved Interface
export interface EventSaved extends Record<string, unknown> {
  // Primary Field
  event_saved_id: string;

  // Relations - Parent
  event_id: string;
  Event?: Event;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// EventView Interface
export interface EventView extends Record<string, unknown> {
  // Primary Field
  event_view_id: string;

  // Relations - Parent
  event_id: string;
  Event?: Event;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// EventVisited Interface
export interface EventVisited extends Record<string, unknown> {
  // Primary Field
  event_visited_id: string;

  // Relations - Parent
  event_id: string;
  Event?: Event;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// EventShare Interface
export interface EventShare extends Record<string, unknown> {
  // Primary Field
  event_share_id: string;

  // Main Field Details
  platform?: string;

  // Relations - Parent
  event_id: string;
  Event?: Event;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}

// EventReport Interface
export interface EventReport extends Record<string, unknown> {
  // Primary Field
  event_report_id: string;

  // Main Field Details
  description: string;
  report_status: ReportStatus;

  // Relations - Parent
  event_id: string;
  Event?: Event;
  user_id: string;
  User?: User;
  user_details?: string;
  user_profile_image_url?: string;
  report_reason_id: string;
  MasterReportReason?: MasterReportReason;
  report_reason?: string;

  // Metadata
  status: Status;
  added_date_time: string;
  added_date_time_f: string;
  modified_date_time: string;
  modified_date_time_f: string;

  // Relations - Child Count
  _count?: {};
}
