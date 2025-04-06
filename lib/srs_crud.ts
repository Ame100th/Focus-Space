// In lib/srs_crud.ts

import supabase from './supabase'; // Your Supabase client instance
// Remove User import if not directly used here
// import { User } from '@supabase/supabase-js';

const SRS_TABLE_NAME = 'srs_items';

// Type definition remains the same
export interface SrsItemRecord {
  id: number; // PK from srs_items table
  user_id: string;
  question: string;
  answer: string;
  next_review_date: string | null; // ISO string date
  interval: number;
  ease_factor: number;
  is_new: boolean;
}

// getTodayDateString function can be removed if not used elsewhere

/**
 * Fetches SRS items due for review for a given user.
 * Includes new items and items where next_review_date is today or earlier.
 * REMOVED: Logic to auto-create items based on a predefined list.
 */
export async function getDueSrsItems(userId: string): Promise<SrsItemRecord[]> { // Removed learnableItems parameter
    // REMOVED: Section 1 (Ensuring records exist) is no longer needed as items are added by the user.

    // Fetch due items
    const today = new Date();
    const nowTimestamp = today.toISOString(); // Use full timestamp

    const { data: dueData, error: dueError } = await supabase
        .from(SRS_TABLE_NAME)
        .select('*')
        .eq('user_id', userId)
        // Filter remains the same: new cards or cards due
        .or(`is_new.eq.true,next_review_date.lte.${nowTimestamp}`)
        .order('next_review_date', { ascending: true, nullsFirst: true }); // Show new cards first, then oldest due

    if (dueError) {
        console.error('Error fetching due SRS items:', dueError);
        throw new Error(dueError.message);
    }

    return dueData || [];
}

/**
 * Adds a new SRS item (question/answer card) for a specific user.
 */
export async function addSrsItem(
    userId: string,
    question: string,
    answer: string
): Promise<SrsItemRecord | null> { // Return the created item or null on error

    const newItemData = {
        user_id: userId,
        question: question,
        answer: answer,
        // Let the database handle defaults for:
        // next_review_date (should default to null or now() based on your table setup)
        // interval (defaults to 0)
        // ease_factor (defaults to 2.5)
        // is_new (defaults to true)
        // created_at, updated_at (defaults to now())
    };

    const { data, error } = await supabase
        .from(SRS_TABLE_NAME)
        .insert(newItemData)
        .select() // Return the newly created row
        .single(); // Expecting a single row back

    if (error) {
        console.error('Error adding SRS item:', error);
        // Don't throw here, let the calling component handle UI feedback
        return null;
    }

    return data;
}


// updateSrsItem function remains the same
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
        throw new Error(error.message); // Okay to throw here as it's during review flow
    }
    return data;
}

// addDays helper function remains the same
export function addDays(date: Date | string, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}