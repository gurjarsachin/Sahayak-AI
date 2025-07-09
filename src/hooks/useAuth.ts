'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { auth, db } from '../lib/firebase';

interface User {
  uid: string;
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Handle client-side hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in
        try {
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data();
          
          setUser({
            uid: firebaseUser.uid,
            name: userData?.name || firebaseUser.displayName || 'User',
            email: firebaseUser.email || ''
          });
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'User',
            email: firebaseUser.email || ''
          });
          setIsAuthenticated(true);
        }
      } else {
        // User is signed out
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    unsubscribeRef.current = unsubscribe;

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [isHydrated]);

  const signup = async (email: string, password: string, name: string) => {
    if (!isHydrated) {
      return { success: false, error: 'Application is still loading. Please try again.' };
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, { displayName: name });

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        createdAt: new Date().toISOString()
      });

      return { success: true };
    } catch (error: unknown) {
      console.error('Signup error:', error);
      
      let errorMessage = 'An error occurred during signup. Please try again.';
      if (error instanceof FirebaseError) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const login = async (email: string, password: string) => {
    if (!isHydrated) {
      return { success: false, error: 'Application is still loading. Please try again.' };
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: unknown) {
      console.error('Login error:', error);
      
      // Convert Firebase error codes to user-friendly messages
      let userFriendlyMessage = 'An error occurred during login. Please try again.';
      
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-credential':
            userFriendlyMessage = 'Invalid email or password. Please check your credentials.';
            break;
          case 'auth/user-not-found':
            userFriendlyMessage = 'No account found with this email address.';
            break;
          case 'auth/wrong-password':
            userFriendlyMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/invalid-email':
            userFriendlyMessage = 'Please enter a valid email address.';
            break;
          case 'auth/user-disabled':
            userFriendlyMessage = 'This account has been disabled. Please contact support.';
            break;
          case 'auth/too-many-requests':
            userFriendlyMessage = 'Too many failed attempts. Please try again later.';
            break;
          default:
            userFriendlyMessage = 'Login failed. Please try again.';
        }
      }
      
      return { success: false, error: userFriendlyMessage };
    }
  };

  const logout = async () => {
    if (!isHydrated) return;

    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || !isHydrated,
    signup,
    login,
    logout
  };
}