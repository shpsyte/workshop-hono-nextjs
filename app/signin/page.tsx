"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const SignInPage = () => {
  const { status, session } = useSession();

  if (status === "pending") {
    return (
      <div>
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (session) {
    redirect("/");
  }

  return (
    <div>
      <p>Sign in</p>
      <Link href="/api/auth/signin">
        <Button>Sign in</Button>
      </Link>
    </div>
  );
};

export default SignInPage;
