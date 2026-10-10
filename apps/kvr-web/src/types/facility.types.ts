/**
 * KVRAT.ai Facility Registration Types
 * Comprehensive type definitions for the B2B Packaging Industry Network
 */

// ============================================================================
// Enums & Constants
// ============================================================================

export enum FacilityType {
  SUPPLIER = 'supplier',
  MANUFACTURER = 'manufacturer',
  DISTRIBUTOR = 'distributor',
  WAREHOUSE = 'warehouse',
  LOGISTICS = 'logistics',
}

export enum SectorCategory {
  HOME_APPLIANCES = 'home_appliances',
  FOOD_PHARMA = 'food_pharma',
  PAPER_CARDBOARD = 'paper_cardboard',
  PLASTIC_FLEXIBLE = 'plastic_flexible',
  INDUSTRIAL_LOGISTICS = 'industrial_logistics',
}

export enum VerificationStatus {
  REGISTERED = 'registered',
  IN_REVIEW = 'in_review',
  VERIFIED = 'verified',
  COMMERCIALLY_ACTIVE = 'commercially_active',
  SUSPENDED = 'suspended',
  REJECTED = 'rejected',
}

export enum CertificationType {
  ISO_9001 = 'iso_9001',
  ISO_14001 = 'iso_14001',
  HALAL = 'halal',
  FDA = 'fda',
  CE_MARKING = 'ce_marking',
  OTHER = 'other',
}

// ============================================================================
// Stage 1: Identity & Company Information
// ============================================================================

export interface Stage1IdentityData {
  facilityType: FacilityType;
  brandName: string;
  country: string;
  city: string;
  contactPerson: string;
  email: string;
  phoneCountryCode: string; // e.g., "+966" for Saudi Arabia
  phoneNumber: string;
  primarySector: SectorCategory;
  description: string;
  consent: boolean; // Terms and conditions acceptance
}

// ============================================================================
// Stage 2: Industrial Profile & Capabilities
// ============================================================================

export interface Stage2IndustrialProfile {
  annualCapacity: string; // e.g., "1,000,000 units/year"
  minimumOrderQuantity: number; // MOQ in units
  rawMaterials: string[]; // e.g., ["PE", "PP", "PET", "Paper"]
  productDimensions: {
    width: number;
    height: number;
    depth: number;
    unit: 'cm' | 'inch';
  };
  certificates: CertificationType[];
  catalogs: Array<{
    name: string;
    url: string; // Signed URL to S3/Storage
  }>;
  additionalCapabilities: string;
}

// ============================================================================
// Stage 3: Verification & Commercial Status
// ============================================================================

export interface Stage3VerificationStatus {
  referenceNumber: string;
  verificationStatus: VerificationStatus;
  verifiedAt?: Date;
  verifiedBy?: string;
  commerciallyActiveSince?: Date;
  notes?: string;
}

// ============================================================================
// Complete Facility Profile
// ============================================================================

export interface FacilityProfile {
  // Metadata
  id: string;
  referenceNumber: string;
  createdAt: Date;
  updatedAt: Date;

  // Identity (Stage 1)
  facilityType: FacilityType;
  brandName: string;
  country: string;
  city: string;
  contactPerson: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  primarySector: SectorCategory;
  description: string;

  // Industrial Profile (Stage 2)
  annualCapacity?: string;
  minimumOrderQuantity?: number;
  rawMaterials?: string[];
  productDimensions?: {
    width: number;
    height: number;
    depth: number;
    unit: 'cm' | 'inch';
  };
  certificates?: CertificationType[];
  additionalCapabilities?: string;

  // Verification (Stage 3)
  verificationStatus: VerificationStatus;
  verifiedAt?: Date;
  verifiedBy?: string;
  commerciallyActiveSince?: Date;

  // Encrypted Sensitive Data (Admin-only)
  taxId?: string; // Encrypted
  commercialRegister?: string; // Encrypted
  slaAgreement?: string; // Encrypted - URL to document
}

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface RegisterFacilityRequest extends Stage1IdentityData {}

export interface RegisterFacilityResponse {
  success: boolean;
  data: {
    id: string;
    referenceNumber: string;
    status: VerificationStatus;
    token: string; // JWT for Stage 2 access
  };
}

export interface UpdateFacilityProfileRequest extends Partial<Stage2IndustrialProfile> {
  facilityId: string;
}

export interface UpdateFacilityProfileResponse {
  success: boolean;
  data: FacilityProfile;
}

export interface GetFacilityResponse {
  success: boolean;
  data: FacilityProfile;
}

export interface ListFacilitiesResponse {
  success: boolean;
  data: Array<Omit<FacilityProfile, 'taxId' | 'commercialRegister' | 'slaAgreement'>>;
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
}

// ============================================================================
// Admin Management Types
// ============================================================================

export interface AdminVerificationRequest {
  facilityId: string;
  status: VerificationStatus;
  notes?: string;
}

export interface AdminVerificationResponse {
  success: boolean;
  data: FacilityProfile;
}

export interface AdminFacilityListFilters {
  status?: VerificationStatus;
  sector?: SectorCategory;
  facilityType?: FacilityType;
  country?: string;
  page?: number;
  pageSize?: number;
}

// ============================================================================
// Form Validation Types
// ============================================================================

export interface FormValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: FormValidationError[];
}

// ============================================================================
// Onboarding State Management
// ============================================================================

export interface OnboardingState {
  currentStage: 1 | 2 | 3;
  stage1Data?: Stage1IdentityData;
  stage2Data?: Stage2IndustrialProfile;
  referenceNumber?: string;
  authToken?: string;
  isLoading: boolean;
  error?: string;
}
