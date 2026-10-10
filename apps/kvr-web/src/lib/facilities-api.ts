/**
 * Facility Registration API Client
 * Handles all facility onboarding and profile management requests
 */

import axios, { AxiosInstance } from 'axios';
import {
  RegisterFacilityRequest,
  RegisterFacilityResponse,
  UpdateFacilityProfileRequest,
  UpdateFacilityProfileResponse,
  GetFacilityResponse,
  ListFacilitiesResponse,
  AdminVerificationRequest,
  AdminVerificationResponse,
  AdminFacilityListFilters,
} from '@/types/facility.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

class FacilityAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}/api/v1`,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add interceptor to include auth token
    this.client.interceptors.request.use((config) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('facility_token') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // ========================================================================
  // Public API: Registration & Profile
  // ========================================================================

  /**
   * Stage 1: Register facility with basic identity information
   * Returns: Reference Number + JWT Token for Stage 2
   */
  async registerFacility(data: RegisterFacilityRequest): Promise<RegisterFacilityResponse> {
    try {
      const response = await this.client.post('/facilities/register', data);
      // Store token for subsequent requests
      if (response.data?.data?.token) {
        localStorage.setItem('facility_token', response.data.data.token);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Stage 2: Update facility with industrial profile & capabilities
   */
  async updateFacilityProfile(data: UpdateFacilityProfileRequest): Promise<UpdateFacilityProfileResponse> {
    try {
      const { facilityId, ...profileData } = data;
      const response = await this.client.patch(`/facilities/${facilityId}/profile`, profileData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get facility details (public data only)
   */
  async getFacility(facilityId: string): Promise<GetFacilityResponse> {
    try {
      const response = await this.client.get(`/facilities/${facilityId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * List all public facilities with pagination and filters
   */
  async listFacilities(filters: AdminFacilityListFilters = {}): Promise<ListFacilitiesResponse> {
    try {
      const response = await this.client.get('/facilities', { params: filters });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Upload facility documents/catalogs
   */
  async uploadCatalog(
    facilityId: string,
    file: File,
  ): Promise<{ success: boolean; data: { url: string; name: string } }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('facilityId', facilityId);

      const response = await axios.post(`${API_BASE_URL}/api/v1/facilities/${facilityId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('facility_token')}`,
        },
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ========================================================================
  // Admin API: Verification & Management
  // ========================================================================

  /**
   * Admin: Update facility verification status
   */
  async verifyFacility(data: AdminVerificationRequest): Promise<AdminVerificationResponse> {
    try {
      const { facilityId, ...verificationData } = data;
      const response = await this.client.patch(`/admin/facilities/${facilityId}/verify`, verificationData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Admin: Get facility with sensitive data (encrypted fields)
   */
  async adminGetFacility(facilityId: string): Promise<GetFacilityResponse> {
    try {
      const response = await this.client.get(`/admin/facilities/${facilityId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Admin: List all facilities with filters and pagination
   */
  async adminListFacilities(filters: AdminFacilityListFilters = {}): Promise<ListFacilitiesResponse> {
    try {
      const response = await this.client.get('/admin/facilities', { params: filters });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ========================================================================
  // Error Handling
  // ========================================================================

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return new Error(`API Error: ${message}`);
    }
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
}

export const facilityAPI = new FacilityAPI();
