# CineClub authentication and viewer profiles

## What will be added
- A public `/auth` screen matching the supplied glassmorphism reference: dark frosted card, CineClub branding, Uzbek login/signup copy, email and password fields with icons, remember-me option, password visibility control, primary action, password recovery, and login/signup switching.
- Email/password registration and login through Lovable Cloud authentication, including confirmation-email messaging, session-aware redirects, logout, and a header account entry that reflects whether the viewer is signed in.
- A public `/reset-password` screen where recovery-link users can securely choose a new password.
- A protected `/profil` screen where signed-in viewers can set a display name, upload/change an avatar, and select preferred movie genres.

## Data and access
- Add a `profiles` table keyed by the authenticated viewer ID, with display name, avatar URL, movie preferences, and timestamps.
- Grant only signed-in viewers access and enforce row-level rules so each viewer can read, create, and update only their own profile.
- Add a private avatar storage area with per-user upload paths and access rules.
- Validate profile and authentication inputs, limit avatar file type/size, and never expose privileged credentials.

## User flow
1. A viewer opens the account entry and logs in or switches to registration.
2. New registrations receive a confirmation message and sign in after confirming their email.
3. After sign-in, the viewer is sent to profile setup, where they can save their name, avatar, and genre preferences.
4. Signed-in viewers can revisit their profile or log out; forgotten-password links lead to the password reset screen.

## Technical details
- Use the existing TanStack routes and generated Lovable Cloud client.
- Put the profile page under the managed authenticated route boundary.
- Keep the existing separate admin-password workflow unchanged.
- Add route-specific title, description, Open Graph, and Twitter metadata to every new page.
- Verify login UI and profile responsiveness on mobile and desktop; validate types after implementation.
