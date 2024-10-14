import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

// Define the shape of your user object
interface User {
  id: number;
  name: string;
  // Add other fields as per your user object
}

// Define the shape of the context
interface UserContextType {
  user: User | null;
  logout: () => void;
}

// Create the context with the correct typing
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook to use the User context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Define the props for the provider, especially `children`
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Simulate a delay if needed
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="authLoader">
          <span className="authLoader-text">loading</span>
          <span className="load"></span>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};
