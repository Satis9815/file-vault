/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { baseUrl } from "@/apiConfigs/urlConfigs"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: 'satis@gmail.com',
    password: '1234',
    name:'Satis Kumar Chaudhary'
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg('');

    try {
      const res = await fetch(`${baseUrl}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg('✅ Registration successful!');
        setFormData({
          email: '', password: '',
          name: ""
        });

      } else {
        setResponseMsg(data.message || '⚠️ Something went wrong.');
      }
    } catch (error) {
      console.log(error);
      setResponseMsg('❌ Network error or server issue.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-rose-500"
            >
              <path d="M20 11V5c0-1.1-.9-2-2-2h-9l-2.5 2.5L2 10c0 1.1.9 2 2 2h7" />
              <path d="M20 19V7c0-1.1-.9-2-2-2h-5" />
              <path d="M23 19h-6c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2Z" />
              <path d="M12 19h-2c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2Z" />
            </svg>
          </Link>
          <span>FileVault</span>
        </div>
      </header>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-rose-500"
            >
              <path d="M20 11V5c0-1.1-.9-2-2-2h-9l-2.5 2.5L2 10c0 1.1.9 2 2 2h7" />
              <path d="M20 19V7c0-1.1-.9-2-2-2h-5" />
              <path d="M23 19h-6c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2Z" />
              <path d="M12 19h-2c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2Z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">Create a new account</h2>
          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-rose-500 hover:text-rose-400">
              Sign in
            </Link>
          </p>
        </div>
        <div className="mt-10 mx-auto w-full max-w-sm">
          <form className="space-y-6"  onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Full name</Label>
              <div className="mt-2">
                <Input id="name" name="name" type="text" autoComplete="name" required  value={formData.name}
            onChange={handleChange}/>
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-2">
                <Input id="email" name="email" type="email" autoComplete="email" required     value={formData.email}
            onChange={handleChange}/>
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="mt-2">
                <Input id="password" name="password" type="password" autoComplete="new-password" required    value={formData.password}
            onChange={handleChange}/>
              </div>
            </div>

            <div>
                <Button type="submit"    disabled={loading} className="w-full"> {loading ? 'Registering...' : 'Register'}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
