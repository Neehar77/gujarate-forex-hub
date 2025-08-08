const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface QuoteRequestData {
  name: string;
  email: string;
  phone: string;
  service: string;
  amount?: number;
  currency?: string;
  additionalInfo?: string;
}

export interface ServiceInquiryData {
  name: string;
  email: string;
  phone: string;
  service: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

// Contact form submission
export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Quote request submission
export async function submitQuoteRequest(data: QuoteRequestData): Promise<ApiResponse> {
  return apiRequest('/quote', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Service inquiry submission
export async function submitServiceInquiry(data: ServiceInquiryData): Promise<ApiResponse> {
  return apiRequest('/service-inquiry', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Get exchange rates
export async function getExchangeRates(): Promise<ApiResponse> {
  return apiRequest('/exchange-rates');
}

// Get services
export async function getServices(): Promise<ApiResponse> {
  return apiRequest('/services');
}

// Health check
export async function checkApiHealth(): Promise<ApiResponse> {
  return apiRequest('/health');
}
