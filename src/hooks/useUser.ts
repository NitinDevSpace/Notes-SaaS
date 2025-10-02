"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function useUser(): User | null {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		// Get session on mount
		supabase.auth.getSession().then(({ data }) => {
			setUser(data.session?.user ?? null);
		});

		// Listen for auth changes
		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user ?? null);
			}
		);

		return () => listener.subscription.unsubscribe();
	}, []);

	return user;
}
