import { Alert } from "react-native";
import { supabase } from "../../supabase/supabase";

export const signUpWithEmail = async (username: string, email: string, password: string) => {
    const { data: { session }, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username
            }
        }
    })
    if (error) {
        Alert.alert(error.message);
        console.log(error.message);
    }
    if (!session) {
        Alert.alert('Please check your inbox for email verification!');
    }
}

export const signInWithEmail = async (email: string, password: string) => {
    const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    if (error) {
        console.error("Sign-in failed:", error.message);
        return { success: false, error: error.message };
    }

    if (session) {
        console.log("Sign-in successful for:", email);
        return { success: true };
    } else {
        console.warn("Sign-in attempt returned no session.");
        return { success: false, error: "No session returned." };
    }
}

export const getUserData = async () => {
    const user = await supabase.auth.getSession();
    return user;
}

export const logout = async () => {
    await supabase.auth.signOut();
}

export const signInWithOtpFunc = async (email: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                shouldCreateUser: false, // Don't create user if they don't exist
            },
        });
        if (error) {
            Alert.alert('OTP Error', error.message);
            console.log('OTP error:', error);
            return { success: false, error };
        }
        console.log('OTP sent successfully:', data);
        return { success: true, data };
    } catch (error) {
        console.error('OTP error:', error);
        Alert.alert('OTP Error', 'An unexpected error occurred');
        return { success: false, error };
    }
};

export const verifyOTP = async (email: string, otp: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
    });

    console.log(data);

    if (error) {
        console.log("error in verifyOTP", error);
        return { success: false, messsage: error.message }
    }

    if (data) {
        console.log("otp is verifed");
        return { success: true, message: data };
    }


}

