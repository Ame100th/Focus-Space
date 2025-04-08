import supabase from './supabase';

const SRS_TABLE_NAME = 'srs_items';

export interface SrsItemRecord {
  id: number;
  user_id: string;
  question: string;
  answer: string;
  next_review_date: string | null;
  interval: number;
  ease_factor: number;
  is_new: boolean;
}


export async function getDueSrsItems(userId: string): Promise<SrsItemRecord[]> { 

    const today = new Date();
    const nowTimestamp = today.toISOString(); 

    const { data: dueData, error: dueError } = await supabase
        .from(SRS_TABLE_NAME)
        .select('*')
        .eq('user_id', userId)
        .or(`is_new.eq.true,next_review_date.lte.${nowTimestamp}`)
        .order('next_review_date', { ascending: true, nullsFirst: true }); 

    if (dueError) {
        console.error('Error fetching due SRS items:', dueError);
        throw new Error(dueError.message);
    }

    return dueData || [];
}

export async function addSrsItem(
    userId: string,
    question: string,
    answer: string
): Promise<SrsItemRecord | null> { 

    const newItemData = {
        user_id: userId,
        question: question,
        answer: answer,
    };

    const { data, error } = await supabase
        .from(SRS_TABLE_NAME)
        .insert(newItemData)
        .select() 
        .single();

    if (error) {
        console.error('Error adding SRS item:', error);
        return null;
    }

    return data;
}


export async function updateSrsItem(
    itemId: number,
    updates: Partial<Pick<SrsItemRecord, 'next_review_date' | 'interval' | 'ease_factor' | 'is_new'>>
): Promise<SrsItemRecord | null> {
    const { data, error } = await supabase
        .from(SRS_TABLE_NAME)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', itemId)
        .select()
        .single();

    if (error) {
        console.error('Error updating SRS item:', error);
        throw new Error(error.message); 
    }
    return data;
}

export function addDays(date: Date | string, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}