import AuthProvider from "@/provider/auth-provider";
import { LoaderCircle } from "lucide-react";

export default function Home() {
  return (
    <AuthProvider>
      <main className="w-full h-screen flex justify-center items-center">
        <LoaderCircle className="w-5 h-5 animate-spin" />
      </main>
    </AuthProvider>
  );
}
