import React, { createContext, useState } from "react";

const FireBaseContext = createContext<any>(null);

export default FireBaseContext;

export const authContext = createContext<any>(null);

export function Context({ children }: {children:React.ReactNode}) {
  const [user, setUser] = useState<any>(null);

  return (
    <authContext.Provider value={{ user, setUser }}>
        {children}
    </authContext.Provider>
  );
}
