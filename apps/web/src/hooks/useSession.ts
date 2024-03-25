import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";

export default function useSession() {
  const cookies = useCookies();
  const setSessionCookie = (session: any): void => {
    cookies.remove("session");
    cookies.set("session", JSON.stringify(session), { expires: 7 });
  };

  const removeSessionCookie = (): void => {
    cookies.remove('session');
  };

  const getSessionCookie: any = async () => {
    const sessionCookie = cookies.get("session");

    if (sessionCookie === undefined) {
      return {};
    } else {
      return await JSON.parse(sessionCookie);
    }
  };

  const [session, setSession] = useState<any>();

  useEffect(() => {
    const fetchSession = async () => {
      setSession(await getSessionCookie());
    };
    fetchSession();
  }, []);

  return {
    setSessionCookie,
    session,
    removeSessionCookie,
  };
}