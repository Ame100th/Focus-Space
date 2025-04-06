import supabase from './supabase';

export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw new Error(`Sign up failed: ${error.message}`);
    }

    return data.user;
}

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(`Sign in failed: ${error.message}`);
    }

    return data.user;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(`Sign out failed: ${error.message}`);
    }

    return true;
}