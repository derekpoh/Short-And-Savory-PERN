import { DataProps } from "./type-declaration";

export async function signUp(userData: DataProps) {
    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else if (data.keyPattern && data.keyPattern.email) {
      throw new Error("Email taken");
    } else {
      throw new Error("Invalid Sign Up");
    }
  }
  
  export async function login(userData: DataProps) {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Invalid Sign Up");
    }
  }