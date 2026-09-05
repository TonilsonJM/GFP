# Requirements: Remove Supabase from Auth Pages

## Feature Name
remove-supabase-from-auth-pages

## Overview
Remove all Supabase client dependencies from authentication pages and disable password recovery functionality while the system migrates to the custom JWT-based authentication system.

---

## Acceptance Criteria

### Requirement 1: Remove Supabase Imports

**User Story:** As a developer, I want to remove Supabase client imports from the auth pages, so that the application uses only the custom authentication system.

#### Acceptance Criteria

1. WHEN the forgot-password page is loaded THEN the system SHALL NOT import `supabaseClient`
2. WHEN checking the forgot-password page source THEN the system SHALL NOT contain any reference to `supabase.auth.resetPasswordForEmail`
3. WHEN the application builds THEN it SHALL complete successfully without Supabase-related imports in forgot-password/page.tsx

---

### Requirement 2: Disable Password Recovery

**User Story:** As a product owner, I want to temporarily disable password recovery functionality, so that users cannot attempt password resets until the feature is properly implemented with the custom system.

#### Acceptance Criteria

1. WHEN a user navigates to `/auth/forgot-password` THEN the system SHALL display a message indicating password recovery is currently disabled
2. WHEN the form is submitted THEN the system SHALL not process any password recovery requests
3. WHEN the page is rendered THEN all form input fields and submission buttons SHALL be disabled or hidden

---

### Requirement 3: Verify Authentication Pages Are Clean

**User Story:** As a developer, I want to verify that login and register pages use only API endpoints, so that I can confirm the entire auth system is decoupled from Supabase.

#### Acceptance Criteria

1. WHEN inspecting login/page.tsx THEN the system SHALL only use `/api/auth/login` endpoint (no Supabase imports)
2. WHEN inspecting register/page.tsx THEN the system SHALL only use `/api/auth/register` endpoint (no Supabase imports)
3. WHEN checking the entire auth directory THEN the system SHALL have no Supabase client imports (except potentially in supabaseClient.ts)

---

### Requirement 4: Clean Up Unused Supabase Client

**User Story:** As a developer, I want to identify and clean up the supabaseClient.ts file if it's no longer used, so that the codebase remains lean and maintainable.

#### Acceptance Criteria

1. WHEN searching the codebase THEN the system SHALL identify all remaining references to `supabaseClient.ts`
2. IF supabaseClient.ts is not imported anywhere THEN it SHALL be safely deleted
3. IF supabaseClient.ts is still referenced THEN the system SHALL document the locations and defer deletion

---

### Requirement 5: Build and Deployment Validation

**User Story:** As a developer, I want to ensure the build process completes successfully and verify no broken imports remain, so that the feature can be safely deployed.

#### Acceptance Criteria

1. WHEN running `npm run build` THEN the system SHALL complete without errors
2. WHEN running `npm run build` THEN the system SHALL produce no build warnings related to Supabase imports
3. WHEN running the development server (`npm run dev`) THEN the system SHALL start without errors

---

## Implementation Notes

- The password recovery feature should show a friendly message to users instead of being completely unavailable
- The custom JWT-based authentication system is already implemented and working for login/register
- All authentication endpoints use the custom auth system, not Supabase
- The application uses Next.js 14+ with TypeScript

---

## Success Criteria

- ✅ supabaseClient import removed from forgot-password/page.tsx
- ✅ Password recovery functionality is disabled with user-friendly messaging
- ✅ Login and register pages verified to use only API endpoints
- ✅ supabaseClient.ts dependency status identified
- ✅ Local build completes without errors
- ✅ Production build completes without warnings
