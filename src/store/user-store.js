import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: null,
    fetchUser: async (token) => {
        toast.loading("Fetching user...");
        try {
            const { data } = await axios.get(
                "https://sayan-translator-backend.onrender.com/auth/users/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            set({ user: data });
        } catch (error) {
            console.log("Error fetching user:", error);
            return;
        }
        toast.dismiss();
    },
}));