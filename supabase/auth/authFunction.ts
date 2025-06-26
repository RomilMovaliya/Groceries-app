import { supabase } from "../../supabase/supabase";

export const checkUserExists = async (email: string) => {
  try {
    const { data, error } = await supabase.rpc("check_user_exists", {
      user_email: email,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.message };
  }
};

export const signUpWithEmail = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const existingUser = await checkUserExists(email);
    if (existingUser) {
      throw Error("user already exits");
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: username,
        },
      },
    });

    if (error) {
      console.log(error.message);
      return { success: false, message: error.message };
    }

    if (data) {
      return { success: true, message: null };
    }
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.message };
  }
};

export const resendOtp = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    console.log("data", data);

    if (error) {
      return { suceess: false, message: error.message };
    }

    return { success: true, message: "otp resended successfully." };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.message };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.log("Sign-in failed:", error.message);
      return { success: false, error: error.message };
    }

    if (session) {
      console.log("Sign-in successful for:", email);
      return { success: true };
    } else {
      console.warn("Sign-in attempt returned no session.");
      return { success: false, error: "No session returned." };
    }
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.message };
  }
};

export const getUserSession = async () => {
  try {
    const { data: user, error } = await supabase.auth.getSession();
    if (error) {
      console.log("error in getuser", error.message);
      return { success: false, message: error.message };
    }
    return { success: true, message: "data getting successfully.", user };
  } catch (error) {
    console.log("error in catch", error.message);
    return { success: false, message: error.message };
  }
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error during logout", error.message);
      return { success: false, message: error.message };
    }
    return { success: true, message:"logout successful." };
  } catch (error) {
    console.log("Error in catch", error.message);
    return { success: false, message: error.message };
  }
};

export const signInWithOtpFunc = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false,
      },
    });
    if (error) {
      console.log("OTP error:", error);
      return { success: false, error };
    }
    console.log("OTP sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("OTP error:", error);
    return { success: false, error };
  }
};

export const verifyOTP = async (email: string, otp: string) => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      console.log("error in verifyOTP", error);
      return { success: false, messsage: error.message };
    }
    if (data) {
      console.log("otp is verifed");
      return { success: true, message: data };
    }
  } catch (error) {
    console.error("OTP error:", error.message);
    return { success: false, message: error.messsage };
  }
};
