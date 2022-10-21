import { useRouter } from "next/router";
import { useAuthenticationStatus } from "@nhost/nextjs";

export function authProtected(Comp: any) {
  return function AuthProtected(props: any) {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuthenticationStatus();

    if (isLoading) {
      return <div className="p-4">Loading...</div>;
    }

    if (!isAuthenticated) {
      router.push("/");
      return null;
    }
    return <Comp {...props} />;
  };
}
