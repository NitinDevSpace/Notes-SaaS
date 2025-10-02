"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type NoteModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (note: { title: string; content: string; category: string }) => void
  initialData?: {
    title: string
    content: string
    category: string
  }
}

const categories = ["Meetings", "Product", "Research", "Marketing", "Engineering", "General"]

export function NoteModal({ isOpen, onClose, onSave, initialData }: NoteModalProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("General")

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setContent(initialData.content)
      setCategory(initialData.category)
    } else {
      setTitle("")
      setContent("")
      setCategory("General")
    }
  }, [initialData, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ title, content, category })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Note" : "Create New Note"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Make changes to your note below." : "Add a new note to your collection."}
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Save Changes" : "Create Note"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
