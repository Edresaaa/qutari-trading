-- Create storage bucket for public assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('assets', 'assets', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow public read access to assets
CREATE POLICY "Public can view assets" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'assets');