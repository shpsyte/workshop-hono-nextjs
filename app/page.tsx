"use client";

import { useSession } from "@/hooks/use-session";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

export default function Home() {
  const { status, session } = useSession();

  if (status === "pending") {
    return (
      <div>
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <h1>Only auth uiser can see that</h1>;
}
