'use client';
import { auth } from '@/components/firebase/firebaseConfig';
import { createContext, useContext, useEffect, useState } from 'react';

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
      setUser('hahahah');
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
