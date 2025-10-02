"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { AppSidebar } from "./app-sidebar";

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const user = useUser();
	const router = useRouter();

	useEffect(() => {
		if (user === null) {
			router.push("/auth"); // redirect to login if not logged in
		}
	}, [user, router]);

	if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				Loading...
			</div>
		);
	}

	return (
		<div className="flex min-h-screen">
			<AppSidebar />
			<main className="flex-1 p-6">{children}</main>
		</div>
	);
}
