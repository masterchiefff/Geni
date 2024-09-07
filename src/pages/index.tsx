import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Montserrat as FontSans } from "next/font/google";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setToken, setUser } from '@/store/authSlice';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter(); 
  const token = useSelector((state) => state.auth.token); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const generateToken = async () => {
    try {
      const response = await axios.post('https://api.geni.africa/generatetoken', {});
      dispatch(setToken(response.data.token)); 
    } catch (error) {
      console.error('Error generating token:', error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message
  
    const data = JSON.stringify({ email, password });
  
    try {
      const response = await axios.post('https://api.geni.africa/login', data, {
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
      });
  
      const saveUser = {
        email: response.data.data.email,
        name: response.data.data.name,
        token: token,
      };
  
      if (response.data.info === 'login success') {
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('user', JSON.stringify(saveUser));
        sessionStorage.setItem('token', token); 
  
        // Dispatch token and user to Redux store
        dispatch(setToken(response.data.token));
        dispatch(setUser(saveUser));
  
        // Redirect to dashboard
        router.push('/dashboard'); 
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Check if the user is already authenticated
    generateToken();
  }, [router]);

  return (
    <div className={cn("w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen", fontSans.className)}>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Error message display */}
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}