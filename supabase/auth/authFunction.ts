import { Alert } from "react-native";
import { supabase } from "../supabase";

export const signUpWithEmail = async (username: string, email: string, password: string) => {
    const { data: { session }, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                display_name: username
            }
        }
    })
    if (error || !session) {
        console.log(error.message);
        return { success: false, message: error.message }
    }

    if (session) {
        return { success: true }
    }
}


