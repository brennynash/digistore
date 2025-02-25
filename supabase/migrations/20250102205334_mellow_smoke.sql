/*
  # Initial Database Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (decimal)
      - `image` (text)
      - `rating` (decimal)
      - `in_stock` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `discounts`
      - `id` (uuid, primary key) 
      - `product_id` (uuid, foreign key)
      - `min_quantity` (integer)
      - `max_quantity` (integer)
      - `percentage` (decimal)
      - `active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `news`
      - `id` (uuid, primary key)
      - `title` (text)
      - `preview` (text)
      - `emoji` (text)
      - `type` (text)
      - `read` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  image text,
  rating decimal(2,1) DEFAULT 5.0,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Discounts Table
CREATE TABLE IF NOT EXISTS discounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  min_quantity integer NOT NULL,
  max_quantity integer NOT NULL,
  percentage decimal(5,2) NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- News Table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  preview text,
  emoji text,
  type text CHECK (type IN ('update', 'alert', 'promo', 'info')),
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE discounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin full access"
  ON products
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public read access"
  ON discounts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin full access"
  ON discounts
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public read access"
  ON news FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin full access"
  ON news
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_discounts_updated_at
  BEFORE UPDATE ON discounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();