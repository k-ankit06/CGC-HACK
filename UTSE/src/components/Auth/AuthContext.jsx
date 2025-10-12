// import { createContext, useContext, useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// const AuthContext = createContext()

// export const useAuth = () => useContext(AuthContext)

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user')
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
//     setLoading(false)
//   }, [])

//   const login = (userData) => {
//     setUser(userData)
//     localStorage.setItem('user', JSON.stringify(userData))
//   }

//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem('user')
//     localStorage.removeItem('touristData')
//   }

//   const updateUser = (updatedData) => {
//     const newUser = { ...user, ...updatedData }
//     setUser(newUser)
//     localStorage.setItem('user', JSON.stringify(newUser))
//   }

//   const value = {
//     user,
//     login,
//     logout,
//     updateUser,
//     loading
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }

// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check for existing user session
//     const storedUser = localStorage.getItem('touristSafetyUser');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password, role) => {
//     try {
//       // In a real app, you would call your authentication API here
//       setLoading(true);

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       const userData = {
//         id: Math.random().toString(36).substr(2, 9),
//         email,
//         role,
//         name: role === 'tourist' ? 'Tourist User' : 'Authority User'
//       };

//       setUser(userData);
//       localStorage.setItem('touristSafetyUser', JSON.stringify(userData));

//       // Redirect based on role
//       if (role === 'tourist') {
//         navigate('/tourist/dashboard');
//       } else {
//         navigate('/authority/dashboard');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('touristSafetyUser');
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const storedUser = localStorage.getItem('touristSafetyUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      setLoading(true);

      // In a real app, you would call your authentication API here
      console.log('Logging in with:', { email, password, role });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Return mock user data
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role,
        name: role === 'tourist' ? 'Tourist User' : 'Authority User'
      };

      setUser(userData);
      localStorage.setItem('touristSafetyUser', JSON.stringify(userData));

      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('touristSafetyUser');
    // Navigation should be handled by the component that calls logout
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};