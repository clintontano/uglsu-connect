-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('event-flyers', 'event-flyers', true, 20971520, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']),
  ('library-documents', 'library-documents', true, 20971520, ARRAY['application/pdf']),
  ('blog-pdfs', 'blog-pdfs', true, 20971520, ARRAY['application/pdf']);

-- Storage policies for event-flyers
CREATE POLICY "Anyone can view event flyers" ON storage.objects FOR SELECT USING (bucket_id = 'event-flyers');
CREATE POLICY "Admins can upload event flyers" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'event-flyers' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can update event flyers" ON storage.objects FOR UPDATE USING (bucket_id = 'event-flyers' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete event flyers" ON storage.objects FOR DELETE USING (bucket_id = 'event-flyers' AND public.is_admin(auth.uid()));

-- Storage policies for library-documents
CREATE POLICY "Anyone can view library documents" ON storage.objects FOR SELECT USING (bucket_id = 'library-documents');
CREATE POLICY "Admins can upload library documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'library-documents' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can update library documents" ON storage.objects FOR UPDATE USING (bucket_id = 'library-documents' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete library documents" ON storage.objects FOR DELETE USING (bucket_id = 'library-documents' AND public.is_admin(auth.uid()));

-- Storage policies for blog-pdfs
CREATE POLICY "Anyone can view blog pdfs" ON storage.objects FOR SELECT USING (bucket_id = 'blog-pdfs');
CREATE POLICY "Admins can upload blog pdfs" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-pdfs' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can update blog pdfs" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-pdfs' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete blog pdfs" ON storage.objects FOR DELETE USING (bucket_id = 'blog-pdfs' AND public.is_admin(auth.uid()));

-- Update events table
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS flyer_url TEXT;
ALTER TABLE public.events DROP COLUMN IF EXISTS type;

-- Update notices table
ALTER TABLE public.notices DROP COLUMN IF EXISTS type;
ALTER TABLE public.notices DROP COLUMN IF EXISTS download_link;

-- Update library_documents table
ALTER TABLE public.library_documents ADD COLUMN IF NOT EXISTS file_url TEXT;
ALTER TABLE public.library_documents DROP COLUMN IF EXISTS type;
ALTER TABLE public.library_documents ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'Books';

-- Update blog_posts table
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS pdf_url TEXT;
ALTER TABLE public.blog_posts DROP COLUMN IF EXISTS category;

-- Create suggestions table
CREATE TABLE IF NOT EXISTS public.suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view suggestions" ON public.suggestions FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Anyone can submit suggestions" ON public.suggestions FOR INSERT WITH CHECK (true);

-- Create community_members table
CREATE TABLE IF NOT EXISTS public.community_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view community members" ON public.community_members FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can insert community members" ON public.community_members FOR INSERT WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update community members" ON public.community_members FOR UPDATE USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete community members" ON public.community_members FOR DELETE USING (public.is_admin(auth.uid()));

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view newsletter subscribers" ON public.newsletter_subscribers FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can insert newsletter subscribers" ON public.newsletter_subscribers FOR INSERT WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update newsletter subscribers" ON public.newsletter_subscribers FOR UPDATE USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete newsletter subscribers" ON public.newsletter_subscribers FOR DELETE USING (public.is_admin(auth.uid()));