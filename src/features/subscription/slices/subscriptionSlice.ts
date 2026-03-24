import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import type { RootState } from '@/store';

// Types
export interface PlanFeature {
  id: string;
  name: string;
  description: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  code: string;
  price: number;
  currency: string;
  period: 'month' | 'year';
  description: string;
  limits: {
    users: number | null;
    warehouses: number | null;
    storage: number;
    apiCalls: number;
    products: number | null;
  };
  features: PlanFeature[];
  popular: boolean;
  isActive: boolean;
}

export interface CurrentSubscription {
  id: string;
  planId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'cancelled' | 'past_due' | 'paused';
  startDate: string;
  renewalDate: string;
  cancelledDate?: string;
  billingCycle: 'month' | 'year';
  autoRenew: boolean;
  totalCost: number;
  discount?: number;
}

export interface UsageMetrics {
  users: { used: number; limit: number | null };
  warehouses: { used: number; limit: number | null };
  storage: { used: number; limit: number };
  apiCalls: { used: number; limit: number };
  products: { used: number; limit: number | null };
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  isDefault: boolean;
  last4: string;
  expiryMonth?: number;
  expiryYear?: number;
  bankName?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  tax: number;
  total: number;
  currency: string;
  status: 'paid' | 'draft' | 'void' | 'past_due';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  pdfUrl: string;
  items: {
    description: string;
    amount: number;
    quantity: number;
  }[];
}

export interface SubscriptionState {
  // Current subscription
  currentSubscription: CurrentSubscription | null;
  
  // Plans
  plans: SubscriptionPlan[];
  
  // Usage
  usageMetrics: UsageMetrics | null;
  
  // Payment
  paymentMethods: PaymentMethod[];
  
  // Invoices
  invoices: Invoice[];
  invoicesTotalCount: number;
  
  // Add-ons
  activeAddOns: string[];
  availableAddOns: { id: string; name: string; price: number; description: string }[];
  
  // Loading & Error
  loading: boolean;
  error: string | null;
  operationInProgress: string | null;
}

const initialState: SubscriptionState = {
  currentSubscription: null,
  plans: [],
  usageMetrics: null,
  paymentMethods: [],
  invoices: [],
  invoicesTotalCount: 0,
  activeAddOns: [],
  availableAddOns: [],
  loading: false,
  error: null,
  operationInProgress: null,
};

// Async Thunks
export const fetchPlans = createAsyncThunk<SubscriptionPlan[], void, { rejectValue: string }>(
  'subscription/fetchPlans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.subscription.getPlans();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch plans');
    }
  }
);

export const fetchCurrentSubscription = createAsyncThunk<CurrentSubscription, void, { rejectValue: string }>(
  'subscription/fetchCurrent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.subscription.getCurrentSubscription();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch subscription');
    }
  }
);

export const fetchUsageMetrics = createAsyncThunk<UsageMetrics, void, { rejectValue: string }>(
  'subscription/fetchUsageMetrics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.subscription.getUsageMetrics();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch usage metrics');
    }
  }
);

export const fetchPaymentMethods = createAsyncThunk<PaymentMethod[], void, { rejectValue: string }>(
  'subscription/fetchPaymentMethods',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.subscription.getPaymentMethods();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch payment methods');
    }
  }
);

export const fetchInvoices = createAsyncThunk<{ data: Invoice[]; total: number }, { page: number; pageSize: number }, { rejectValue: string }>(
  'subscription/fetchInvoices',
  async (params: { page: number; pageSize: number }, { rejectWithValue }) => {
    try {
      const response = await apiService.subscription.getInvoices(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch invoices');
    }
  }
);

export const upgradePlan = createAsyncThunk<CurrentSubscription, { planId: string; billingCycle: 'month' | 'year' }, { rejectValue: string }>(
  'subscription/upgradePlan',
  async (
    payload: { planId: string; billingCycle: 'month' | 'year' },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiService.subscription.upgradePlan(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to upgrade plan');
    }
  }
);

export const downgradePlan = createAsyncThunk<CurrentSubscription, { planId: string; effectiveDate: 'immediate' | 'next_billing' }, { rejectValue: string }>(
  'subscription/downgradePlan',
  async (
    payload: { planId: string; effectiveDate: 'immediate' | 'next_billing' },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiService.subscription.downgradePlan(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to downgrade plan');
    }
  }
);

export const addPaymentMethod = createAsyncThunk<PaymentMethod, { type: 'card' | 'bank'; tokenId: string; setDefault: boolean }, { rejectValue: string }>(
  'subscription/addPaymentMethod',
  async (
    payload: { type: 'card' | 'bank'; tokenId: string; setDefault: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiService.subscription.addPaymentMethod(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add payment method');
    }
  }
);

export const setDefaultPaymentMethod = createAsyncThunk<PaymentMethod, string, { rejectValue: string }>(
  'subscription/setDefaultPaymentMethod',
  async (methodId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.subscription.setDefaultPaymentMethod(methodId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to set default payment method');
    }
  }
);

export const cancelSubscription = createAsyncThunk<CurrentSubscription, { reason: string; feedback: string }, { rejectValue: string }>(
  'subscription/cancel',
  async (
    payload: { reason: string; feedback: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiService.subscription.cancelSubscription(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to cancel subscription');
    }
  }
);

export const pauseSubscription = createAsyncThunk<CurrentSubscription, number, { rejectValue: string }>(
  'subscription/pause',
  async (months: number, { rejectWithValue }) => {
    try {
      const response = await apiService.subscription.pauseSubscription(months);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to pause subscription');
    }
  }
);

// Slice
const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOperationStatus: (state) => {
      state.operationInProgress = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Plans
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Current Subscription
    builder
      .addCase(fetchCurrentSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubscription = action.payload;
      })
      .addCase(fetchCurrentSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Usage Metrics
    builder
      .addCase(fetchUsageMetrics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsageMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.usageMetrics = action.payload;
      })
      .addCase(fetchUsageMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Payment Methods
    builder
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.operationInProgress = 'fetchPaymentMethods';
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.operationInProgress = null;
        state.paymentMethods = action.payload;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.operationInProgress = null;
        state.error = action.payload as string;
      });

    // Fetch Invoices
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.operationInProgress = 'fetchInvoices';
      })
      .addCase(fetchInvoices.fulfilled, (state, action: any) => {
        state.operationInProgress = null;
        state.invoices = action.payload.data;
        state.invoicesTotalCount = action.payload.total;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.operationInProgress = null;
        state.error = action.payload as string;
      });

    // Upgrade Plan
    builder
      .addCase(upgradePlan.pending, (state) => {
        state.operationInProgress = 'upgrade';
        state.error = null;
      })
      .addCase(upgradePlan.fulfilled, (state, action) => {
        state.operationInProgress = null;
        state.currentSubscription = action.payload;
      })
      .addCase(upgradePlan.rejected, (state, action) => {
        state.operationInProgress = null;
        state.error = action.payload as string;
      });

    // Downgrade Plan
    builder
      .addCase(downgradePlan.pending, (state) => {
        state.operationInProgress = 'downgrade';
        state.error = null;
      })
      .addCase(downgradePlan.fulfilled, (state, action) => {
        state.operationInProgress = null;
        state.currentSubscription = action.payload;
      })
      .addCase(downgradePlan.rejected, (state, action) => {
        state.operationInProgress = null;
        state.error = action.payload as string;
      });

    // Add Payment Method
    builder
      .addCase(addPaymentMethod.pending, (state) => {
        state.operationInProgress = 'addPayment';
      })
      .addCase(addPaymentMethod.fulfilled, (state, action) => {
        state.operationInProgress = null;
        state.paymentMethods.push(action.payload);
      })
      .addCase(addPaymentMethod.rejected, (state, action) => {
        state.operationInProgress = null;
        state.error = action.payload as string;
      });

    // Set Default Payment Method
    builder
      .addCase(setDefaultPaymentMethod.pending, (state) => {
        state.operationInProgress = 'setDefault';
      })
      .addCase(setDefaultPaymentMethod.fulfilled, (state, action) => {
        state.operationInProgress = null;
        state.paymentMethods = state.paymentMethods.map((m) => ({
          ...m,
          isDefault: m.id === action.payload.id,
        }));
      })
      .addCase(setDefaultPaymentMethod.rejected, (state, action) => {
        state.operationInProgress = null;
        state.error = action.payload as string;
      });

    // Cancel Subscription
    builder
      .addCase(cancelSubscription.pending, (state) => {
        state.operationInProgress = 'cancel';
        state.error = null;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.operationInProgress = null;
        state.currentSubscription = action.payload;
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.operationInProgress = null;
        state.error = action.payload as string;
      });

    // Pause Subscription
    builder
      .addCase(pauseSubscription.pending, (state) => {
        state.operationInProgress = 'pause';
        state.error = null;
      })
      .addCase(pauseSubscription.fulfilled, (state, action) => {
        state.operationInProgress = null;
        state.currentSubscription = action.payload;
      })
      .addCase(pauseSubscription.rejected, (state, action) => {
        state.operationInProgress = null;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearOperationStatus } = subscriptionSlice.actions;

// Selectors
export const selectCurrentSubscription = (state: RootState) =>
  state.subscription?.currentSubscription;
export const selectPlans = (state: RootState) => state.subscription?.plans || [];
export const selectUsageMetrics = (state: RootState) => state.subscription?.usageMetrics;
export const selectPaymentMethods = (state: RootState) =>
  state.subscription?.paymentMethods || [];
export const selectInvoices = (state: RootState) => state.subscription?.invoices || [];
export const selectLoading = (state: RootState) => state.subscription?.loading || false;
export const selectError = (state: RootState) => state.subscription?.error;
export const selectOperationInProgress = (state: RootState) =>
  state.subscription?.operationInProgress;

export default subscriptionSlice.reducer;
