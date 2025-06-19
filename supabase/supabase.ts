import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://qcetqaefuxopkymojakx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZXRxYWVmdXhvcGt5bW9qYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzIwNTcsImV4cCI6MjA2NTY0ODA1N30.jdIrUU335cpNlr-km5mKJ9wz0sHJUs-o1T9hwj20fzA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})