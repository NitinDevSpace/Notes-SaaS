"use client";

import type React from "react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function SignUpForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [organizationName, setOrganizationName] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// Sign up user with Supabase
			const cleanEmail = email.trim().toLowerCase();
			const { data: authData, error: authError } = await supabase.auth.signUp({
				email: cleanEmail,
				password,
			});

			if (authError) {
				if (authError.message && authError.message.includes("User already registered")) {
					alert("This email is already registered. Please sign in instead.");
					setIsLoading(false);
					return;
				} else {
					alert(authError.message);
					setIsLoading(false);
					return;
				}
			}

			const userId = authData.user?.id;
			if (!userId) {
				alert("Failed to get user ID from Supabase");
				setIsLoading(false);
				return;
			}

			// Insert organization
			const { data: orgData, error: orgError } = await supabase
				.from("organizations")
				.insert({
					name: organizationName,
				})
				.select()
				.single();

			if (orgError || !orgData) {
				alert(orgError?.message || "Failed to create organization");
				setIsLoading(false);
				return;
			}

			// Add user as admin in members table
			const { error: memberError } = await supabase.from("members").insert({
				user_id: userId,
				org_id: orgData.id,
				role: "admin",
				full_name: name, // store full name
				email: email.trim().toLowerCase(), // store email
			});

			if (memberError) {
				alert(memberError.message);
				setIsLoading(false);
				return;
			}

			alert("Account and organization created successfully!");
			window.location.href = "/dashboard";
		} catch (err: any) {
			console.error(err);
			alert("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
				<CardDescription>Create your account and organization</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Full Name</Label>
						<Input
							id="name"
							type="text"
							placeholder="John Doe"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="name@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="organization">Organization Name</Label>
						<Input
							id="organization"
							type="text"
							placeholder="Organization Inc."
							value={organizationName}
							onChange={(e) => setOrganizationName(e.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="Min. 8 characters"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							minLength={8}
						/>
					</div>
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Creating account..." : "Create Account"}
					</Button>
					<p className="text-xs text-muted-foreground text-center text-balance">
						By signing up, you agree to our Terms of Service and Privacy Policy
					</p>
				</form>
			</CardContent>
		</Card>
	);
}
