'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';

interface SessionContextType {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined,
);

const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cookies = useCookies();
  const [token, setToken] = useState<string | undefined>(cookies.get('token'));
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      setIsUserLoggedIn(true);
    }
  }, [token]);

  return (
    <SessionContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
