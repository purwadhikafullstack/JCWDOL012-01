'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/config/firebase';

const UserContext = createContext<any | undefined>(undefined);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser: any) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
      setUser('');
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
