import {createClient} from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getUsers() {
    try {
        console.log('Fetching users...');
        const {data, error} = await supabase.from('profiles').select();
        if (error) {
            console.error('Error fetching users:', error);
            return {success: false, message: error};
        }
        if (data) {
            console.log('Users fetched successfully:', data);
            return {success: true, data: data, message: 'User list successfully fetched'};
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}