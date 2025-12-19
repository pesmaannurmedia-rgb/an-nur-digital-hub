import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

interface LogActivityParams {
  action: 'create' | 'update' | 'delete' | 'view';
  entityType: string;
  entityId?: string;
  entityName?: string;
  details?: Record<string, unknown>;
}

export function useActivityLog() {
  const logActivity = async ({
    action,
    entityType,
    entityId,
    entityName,
    details,
  }: LogActivityParams) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      await supabase.from('activity_logs').insert([{
        user_id: user.id,
        user_email: user.email,
        action,
        entity_type: entityType,
        entity_id: entityId,
        entity_name: entityName,
        details: (details || null) as Json,
      }]);
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  return { logActivity };
}
