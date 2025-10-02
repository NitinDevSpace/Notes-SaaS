"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function useUser() {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Get current session
		supabase.auth.getSession().then(({ data }) => {
			setUser(data.session?.user ?? null);
			setIsLoading(false);
		});

		// Listen for auth changes
		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user ?? null);
				setIsLoading(false);
			}
		);

		return () => listener.subscription.unsubscribe();
	}, []);

	return { user, isLoading };
}
