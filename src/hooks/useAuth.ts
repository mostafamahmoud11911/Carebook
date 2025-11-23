import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import apiCall from "@/services/apiCall";
import { AxiosError } from "axios";
import { Role } from "@/constants/constants";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";

type UserState = "user" | "provider";

export default function useAuth(initialState: UserState = "user") {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<UserState>(initialState);
  const router = useRouter();

  const handleApiResponse = async (data: { message: string; user: { id: number; username: string; email: string; rolePending: string; role: "user" | "admin" | "provider"; isApproved: string } }, path?: string, loginWith?: string) => {
    toast.success(data.message);
    useAuthStore.getState().setUser(data.user);
    const { role, rolePending } = data.user;

    if (rolePending === Role.PROVIDER) {
      return router.push("/pending-approval");
    }

    if (role === Role.ADMIN || role === Role.PROVIDER) {
      return router.push("/dashboard");
    }

    if (role === Role.USER && path === "register") {
      return router.push("/login");
    }

    if (loginWith === "google") {
      return router.push("/");
    }

    return router.push("/");
  };

  const submitForm = async (url: string, path: string, payload: { username?: string; email: string; password: string }) => {
    try {
      setLoading(true);
      const { data } = await apiCall.post(url, payload);
      Cookies.set("token", data.token, {
        expires: 7,
      });
      await handleApiResponse(data, path);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    const client = window.google.accounts.oauth2.initCodeClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      scope: "openid email profile https://www.googleapis.com/auth/calendar",
      ux_mode: "popup",
      access_type: "offline",
      prompt: "consent",
      callback: async (response: { code: string }) => {
        try {
          setLoading(true);
          const { data } = await apiCall.post("/auth/loginWithGoogle", {
            code: response.code,
            state,
          });

          Cookies.set("token", data.token, {
            expires: 7,
          });
          await handleApiResponse(data, "", "google");
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          toast.error(err.response?.data.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      },
    });

    client.requestCode();
  };

  return {
    setState,
    loading,
    submitForm,
    loginWithGoogle,
  };
}
