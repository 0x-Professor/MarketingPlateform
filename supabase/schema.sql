-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    website TEXT,
    company TEXT,
    role TEXT,
    
    CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Set up RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create email campaigns table
CREATE TABLE IF NOT EXISTS public.email_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    email_type TEXT NOT NULL,
    company_name TEXT,
    product_name TEXT,
    target_audience TEXT,
    key_message TEXT,
    tone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up RLS for email campaigns
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own campaigns
CREATE POLICY "Users can view own campaigns" ON public.email_campaigns
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own campaigns
CREATE POLICY "Users can insert own campaigns" ON public.email_campaigns
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own campaigns
CREATE POLICY "Users can update own campaigns" ON public.email_campaigns
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own campaigns
CREATE POLICY "Users can delete own campaigns" ON public.email_campaigns
    FOR DELETE USING (auth.uid() = user_id);

-- Create copy content table
CREATE TABLE IF NOT EXISTS public.copy_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    content_type TEXT NOT NULL,
    platform TEXT,
    topic TEXT,
    tone TEXT,
    keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up RLS for copy content
ALTER TABLE public.copy_content ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own copy content
CREATE POLICY "Users can view own copy content" ON public.copy_content
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own copy content
CREATE POLICY "Users can insert own copy content" ON public.copy_content
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own copy content
CREATE POLICY "Users can update own copy content" ON public.copy_content
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own copy content
CREATE POLICY "Users can delete own copy content" ON public.copy_content
    FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER handle_updated_at_profiles
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_email_campaigns
    BEFORE UPDATE ON public.email_campaigns
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_copy_content
    BEFORE UPDATE ON public.copy_content
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
