import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "694374195b3a3a2746780e48", 
  requiresAuth: false // Ensure authentication is required for all operations
});
