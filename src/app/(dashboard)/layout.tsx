"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, isLoading } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && user === null) {
			router.push("/sign-in"); // redirect only if loading is done and no user
		}
	}, [user, isLoading, router]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				Loading...
			</div>
		);
	}

	if (!user) return null; // render nothing while redirecting

	return (
		<div className="min-h-screen">
			<AppSidebar />
			<div className="lg:pl-64">
				<AppHeader />
				<main className="p-4 lg:p-6">{children}</main>
			</div>
		</div>
	);
}
