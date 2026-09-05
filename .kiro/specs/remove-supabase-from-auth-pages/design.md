# Design: Remove Supabase from Auth Pages

## Architecture Overview

The goal is to remove all Supabase client dependencies from the authentication system and consolidate on the custom JWT-based authentication that is already implemented and working for login and register.

### Current State
- **Login/Register**: Already using custom JWT auth via `/api/auth/` endpoints ✅
- **Forgot Password**: Currently using Supabase `resetPasswordForEmail()` ❌
- **supabaseClient.ts**: Active client file, may or may not be used elsewhere

### Target State
- **Forgot Password**: Disabled with friendly user messaging
- **supabaseClient.ts**: Either deleted (if unused) or documented (if still needed)
- **All Auth Pages**: Using only custom JWT authentication system
- **Build Output**: Zero Supabase-related import errors or warnings

---

## Implementation Strategy

### Phase 1: Disable Forgot Password Page
**File:** `app/auth/forgot-password/page.tsx`

**Changes:**
1. Remove the import statement: `import { supabase } from '@/lib/supabaseClient';`
2. Remove the `handleSubmit` function that calls `supabase.auth.resetPasswordForEmail()`
3. Replace form with disabled state message
4. Show message: "Password recovery is currently disabled. Please contact support for assistance."
5. Remove all form input elements and keep only navigation links

**Before:**
```typescript
'use client';

import { supabase } from '@/lib/supabaseClient';

export default function ForgotPasswordPage() {
  const handleSubmit = async (e: React.FormEvent) => {
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    // ... error handling
  };
  
  return <form onSubmit={handleSubmit}>/* form elements */</form>;
}
```

**After:**
```typescript
'use client';

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="p-8 rounded-3xl" style={{ /* styling */ }}>
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔑</div>
          <h1 className="text-3xl font-bold mb-2">Recuperar Senha</h1>
          <p className="text-slate-400">Recurso temporariamente desabilitado</p>
        </div>

        <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
          <p className="text-yellow-300 text-center font-medium">
            ⚠️ A recuperação de senha está temporariamente desabilitada.
          </p>
          <p className="text-yellow-300/80 text-center text-sm mt-2">
            Entre em contato com o suporte para assistência.
          </p>
        </div>

        {/* Navigation links */}
        <div className="space-y-3">
          <Link href="/auth/login" className="block w-full py-3 rounded-lg bg-white/10 border border-white/20 text-white font-medium text-center hover:bg-white/20 transition-all">
            ← Voltar para Login
          </Link>
          <Link href="/auth/register" className="block w-full py-3 rounded-lg bg-white/10 border border-white/20 text-white font-medium text-center hover:bg-white/20 transition-all">
            📝 Criar Conta
          </Link>
        </div>
      </div>
    </div>
  );
}
```

### Phase 2: Verify Login and Register Pages
**Files:** `app/auth/login/page.tsx`, `app/auth/register/page.tsx`

**Verification Points:**
1. No imports from `@/lib/supabaseClient` ✅ (already verified)
2. All auth calls go to `/api/auth/login` and `/api/auth/register` ✅ (already verified)
3. No Supabase API calls in component logic ✅ (already verified)

Both pages are already clean and using the custom JWT system exclusively.

### Phase 3: Identify and Clean Supabase Client
**File:** `lib/supabaseClient.ts`

**Process:**
1. Search entire codebase for imports of `supabaseClient.ts`
2. Current findings (from grep search):
   - `app/auth/forgot-password/page.tsx` - Will be removed in Phase 1 ✓
   - `context/AuthContext.tsx` - References `useSupabase` hook
   
3. If only reference is `context/AuthContext.tsx` and it's not actively used:
   - Document the location and status
   - Defer deletion until confirmed unused

**Note:** `context/AuthContext.tsx` appears to reference a `useSupabase()` hook that doesn't exist in the current `supabaseClient.ts` file, suggesting it may be dead code or a legacy reference.

### Phase 4: Build Validation
**Commands to verify:**
```bash
# Local development build
npm run build

# Check for type errors
npx tsc --noEmit

# Development server startup
npm run dev
```

**Success Criteria:**
- Build completes without errors
- No TypeScript errors related to missing imports
- No runtime errors on page loads
- Development server starts successfully

---

## Component Architecture

### forgot-password/page.tsx
- **Type:** Client Component ('use client')
- **Dependencies:** React (useState not needed after changes), Link from next/link
- **State:** None (no form state needed)
- **Rendering:** Static disabled message with navigation
- **Error Handling:** None needed (no async operations)

### login/page.tsx
- **Type:** Client Component ('use client')
- **Dependencies:** React, useRouter, Link
- **Auth Calls:** POST to `/api/auth/login`
- **Status:** ✅ Already clean

### register/page.tsx
- **Type:** Client Component ('use client')
- **Dependencies:** React, useRouter, Link
- **Auth Calls:** POST to `/api/auth/register`
- **Status:** ✅ Already clean

---

## Data Models

No data models are affected by this change. All authentication data flows through:
1. API request to `/api/auth/` endpoints
2. Custom JWT validation in middleware
3. User session via secure HTTP-only cookies

---

## Error Handling

### Error Cases Eliminated
1. Supabase API failures in forgot-password
2. Email sending failures from Supabase
3. Network timeouts to Supabase service
4. Supabase authentication key issues

### Remaining Error Handling
- Form validation is removed (form is disabled)
- Navigation links always work
- No error states needed

---

## Testing Considerations

### Unit Tests
- Verify forgot-password page renders without crashing
- Verify no Supabase imports in page component
- Verify navigation links are present and functional

### Integration Tests
- Full page load of `/auth/forgot-password` without errors
- Navigation from forgot-password to login and register
- Build succeeds without TypeScript errors

### Build Verification
- `npm run build` completes without errors
- No import resolution errors
- No dead code warnings

---

## Migration Path

### Immediate (This Sprint)
1. Remove Supabase import from forgot-password
2. Disable form with messaging
3. Verify login/register are clean
4. Run full build test

### Future (When Implementing Password Reset)
1. Create new `/api/auth/forgot-password` endpoint
2. Implement email sending (SendGrid, Resend, etc.)
3. Create `/api/auth/reset-password` endpoint
4. Update forgot-password page with proper form
5. Add email verification flow

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Supabase Import Removed

*For any* source code in `app/auth/forgot-password/page.tsx`, the file shall not contain an import statement for `supabaseClient` from `@/lib/supabaseClient`.

**Validates: Requirements 1.1, 1.2**

### Property 2: Forgot Password Form is Disabled

*For any* render of the forgot-password page, the page shall display a disabled state message and shall not contain an active form with input fields that accept user submission.

**Validates: Requirements 2.1, 2.2, 2.3**

### Property 3: Login Page Uses Custom Auth Only

*For any* source code in `app/auth/login/page.tsx`, the file shall contain only POST calls to `/api/auth/login` endpoint and shall not contain any imports from `supabaseClient` or calls to Supabase authentication methods.

**Validates: Requirements 3.1**

### Property 4: Register Page Uses Custom Auth Only

*For any* source code in `app/auth/register/page.tsx`, the file shall contain only POST calls to `/api/auth/register` endpoint and shall not contain any imports from `supabaseClient` or calls to Supabase authentication methods.

**Validates: Requirements 3.2**

### Property 5: No Supabase Imports in Auth Directory

*For any* file in the `app/auth/` directory (excluding `supabaseClient.ts`), the file shall not contain imports from `@/lib/supabaseClient`.

**Validates: Requirements 3.3**

### Property 6: Build Succeeds Without Supabase Errors

*For any* build execution with `npm run build`, the build process shall complete with exit code 0 and shall not produce any errors or warnings related to missing Supabase imports in authentication pages.

**Validates: Requirements 5.1, 5.2, 5.3**

### Property 7: Supabase Client Usage Identified

*For any* codebase search, the system shall identify all remaining references to `supabaseClient.ts` (if any) or confirm that the file is no longer imported anywhere.

**Validates: Requirements 4.1, 4.2**

---

## Rollback Plan

If issues arise after deployment:

1. **Immediate Rollback:** Revert the git commit to restore forgot-password page with Supabase functionality
2. **Partial Rollback:** If only certain pages have issues, revert only those files
3. **Build Verification:** Run full build suite after rollback
4. **Testing:** Verify all auth pages work correctly after rollback

---

## Dependencies

### Removed
- `@supabase/supabase-js` (if no longer used anywhere in the application)
- References to `supabaseClient` from auth pages

### Unchanged
- `bcryptjs` (custom auth)
- `jsonwebtoken` (custom JWT)
- `next` framework
- TypeScript

### Verification Needed
- Confirm `@supabase/supabase-js` is not used in other parts of the application
- Confirm no environment variables reference Supabase in auth context

---

## Success Metrics

✅ **Code Quality:**
- Zero imports of supabaseClient in `app/auth/`
- Zero Supabase API calls in auth pages
- 100% TypeScript compilation success

✅ **Functionality:**
- Forgot-password page loads without errors
- Navigation to/from forgot-password works
- User sees disabled state message

✅ **Build:**
- `npm run build` completes successfully
- `npm run dev` starts without errors
- No unresolved import warnings

✅ **Testing:**
- All existing auth tests pass
- No new test failures introduced
- Build verification tests pass
