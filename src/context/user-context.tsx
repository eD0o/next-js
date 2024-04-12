'use client';

import logout from '@/actions/logout';
import validateToken from '@/actions/validate-token';
import { createContext, useContext, useEffect, useState } from 'react';

type IUserContext = {
  user: User | null;
  setUserState: React.Dispatch<React.SetStateAction<User | null>>;
};

type User = {
  id: number;
  nome: string;
  username: string;
  email: string;
};

export const UserContext = createContext<IUserContext | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useContext must be inside Provider.');
  }

  return context;
};

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [userState, setUserState] = useState<User | null>(user);

  useEffect(() => {
    async function validate() {
      const { ok } = await validateToken();
      if (!ok) await logout();
    }
    if (userState) validate();
  }, [userState]);

  return (
    <UserContext.Provider value={{ user: userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
}
