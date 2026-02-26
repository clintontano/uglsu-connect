
-- Create law_firms table
CREATE TABLE public.law_firms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  website text NOT NULL DEFAULT '',
  logo_url text,
  practice_areas text[] DEFAULT '{}'::text[],
  founded_year integer,
  partner_count integer,
  status text NOT NULL DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create external_competitions table
CREATE TABLE public.external_competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organizer text NOT NULL,
  type text NOT NULL,
  level text NOT NULL,
  description text NOT NULL DEFAULT '',
  deadline text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  participants text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'upcoming',
  image_url text,
  application_guidelines text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.law_firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.external_competitions ENABLE ROW LEVEL SECURITY;

-- RLS policies for law_firms
CREATE POLICY "Everyone can view law firms" ON public.law_firms FOR SELECT USING (true);
CREATE POLICY "Admins can insert law firms" ON public.law_firms FOR INSERT WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update law firms" ON public.law_firms FOR UPDATE USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete law firms" ON public.law_firms FOR DELETE USING (public.is_admin(auth.uid()));

-- RLS policies for external_competitions
CREATE POLICY "Everyone can view external competitions" ON public.external_competitions FOR SELECT USING (true);
CREATE POLICY "Admins can insert external competitions" ON public.external_competitions FOR INSERT WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update external competitions" ON public.external_competitions FOR UPDATE USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete external competitions" ON public.external_competitions FOR DELETE USING (public.is_admin(auth.uid()));

-- Add updated_at triggers
CREATE TRIGGER update_law_firms_updated_at BEFORE UPDATE ON public.law_firms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_external_competitions_updated_at BEFORE UPDATE ON public.external_competitions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
