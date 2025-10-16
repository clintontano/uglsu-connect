-- Create judicial_decisions table
CREATE TABLE public.judicial_decisions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT,
  pdf_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.judicial_decisions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Everyone can view judicial decisions"
ON public.judicial_decisions
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert judicial decisions"
ON public.judicial_decisions
FOR INSERT
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update judicial decisions"
ON public.judicial_decisions
FOR UPDATE
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete judicial decisions"
ON public.judicial_decisions
FOR DELETE
USING (is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_judicial_decisions_updated_at
BEFORE UPDATE ON public.judicial_decisions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for judicial decisions
INSERT INTO storage.buckets (id, name, public)
VALUES ('judicial-decisions', 'judicial-decisions', true);

-- Storage policies
CREATE POLICY "Public can view judicial decision PDFs"
ON storage.objects
FOR SELECT
USING (bucket_id = 'judicial-decisions');

CREATE POLICY "Admins can upload judicial decision PDFs"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'judicial-decisions' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update judicial decision PDFs"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'judicial-decisions' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete judicial decision PDFs"
ON storage.objects
FOR DELETE
USING (bucket_id = 'judicial-decisions' AND is_admin(auth.uid()));