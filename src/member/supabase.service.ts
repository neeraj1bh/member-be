import { createClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupabaseService {
  private supabaseUrl = process.env.SUPABASE_URL;
  private supabaseKey = process.env.SUPABASE_ANON_KEY;
  public supabase = createClient(this.supabaseUrl, this.supabaseKey);
}

export default SupabaseService;
