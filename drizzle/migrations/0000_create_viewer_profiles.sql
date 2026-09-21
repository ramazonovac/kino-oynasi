CREATE TABLE public.profiles (
  user_id uuid PRIMARY KEY,
  display_name text NOT NULL DEFAULT '',
  avatar_url text,
  movie_preferences text[] NOT NULL DEFAULT ARRAY[]::text[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT profiles_display_name_length CHECK (char_length(display_name) <= 80),
  CONSTRAINT profiles_avatar_url_length CHECK (avatar_url IS NULL OR char_length(avatar_url) <= 1200),
  CONSTRAINT profiles_preferences_limit CHECK (cardinality(movie_preferences) <= 20)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Create own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Delete own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();