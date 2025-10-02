"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import useUser from "@/hooks/useUser";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type NoteModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSave: (note: { title: string; content: string; category: string }) => void;
	initialData?: {
		title: string;
		content: string;
		category: string;
	};
};

export function NoteModal({
	isOpen,
	onClose,
	onSave,
	initialData,
}: NoteModalProps) {
	const { user } = useUser();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	// Fetch categories from database
	useEffect(() => {
		const fetchCategories = async () => {
			const { data, error } = await supabase
				.from("note_categories")
				.select("name")
				.order("id", { ascending: true });

			if (error) {
				console.error("Failed to fetch categories:", error);
			} else {
				const catNames = data.map((cat) => cat.name);
				setCategories(catNames);
				// Set default category if not set
				if (!category) setCategory(initialData?.category || "General");
			}
		};

		fetchCategories();
	}, [initialData]);

	useEffect(() => {
		if (initialData) {
			setTitle(initialData.title);
			setContent(initialData.content);
			setCategory(initialData.category);
		} else {
			setTitle("");
			setContent("");
			setCategory("General");
		}
	}, [initialData, isOpen, categories]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;

		setLoading(true);

		try {
			// Get user's org_id and member id
			const { data: memberData, error: memberError } = await supabase
				.from("members")
				.select("id, org_id")
				.eq("user_id", user.id)
				.single();

			if (memberError || !memberData?.org_id)
				throw new Error("Organization not found");

			const orgId = memberData.org_id;
			const memberId = memberData.id;

			// Get category id from category name
			const { data: categoryData, error: categoryError } = await supabase
				.from("note_categories")
				.select("id")
				.eq("name", category)
				.single();

			if (categoryError || !categoryData?.id)
				throw new Error("Category not found");

			const categoryId = categoryData.id;

			// Insert note into DB
			const { error: insertError } = await supabase.from("notes").insert({
				org_id: orgId,
				title,
				content,
				category_id: categoryId,
				created_by: memberId,
			});

			if (insertError) throw insertError;

			onSave({ title, content, category });
			onClose();
		} catch (err: any) {
			console.error(err);
			alert("Failed to create note: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>
						{initialData ? "Edit Note" : "Create New Note"}
					</DialogTitle>
					<DialogDescription>
						{initialData
							? "Make changes to your note below."
							: "Add a new note to your collection."}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="title">Title</Label>
							<Input
								id="title"
								placeholder="Enter note title..."
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="category">Category</Label>
							<Select value={category} onValueChange={setCategory}>
								<SelectTrigger id="category">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{categories.map((cat) => (
										<SelectItem key={cat} value={cat}>
											{cat}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="content">Content</Label>
							<Textarea
								id="content"
								placeholder="Write your note content..."
								value={content}
								onChange={(e) => setContent(e.target.value)}
								rows={8}
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							disabled={loading}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={loading}>
							{initialData ? "Save Changes" : "Create Note"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
