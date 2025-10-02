"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, MoreVertical, Edit, Trash2, Star, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { NoteModal } from "@/components/notes/note-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

type Note = {
  id: number
  title: string
  content: string
  category: string
  lastEdited: string
  author: string
  isFavorite: boolean
}

const initialNotes: Note[] = [
  {
    id: 1,
    title: "Q4 Planning Meeting Notes",
    content: "Discussed goals and objectives for Q4...",
    category: "Meetings",
    lastEdited: "2 hours ago",
    author: "John Doe",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Product Roadmap Ideas",
    content: "New features to consider for next release...",
    category: "Product",
    lastEdited: "5 hours ago",
    author: "Jane Smith",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Customer Feedback Summary",
    content: "Key insights from customer interviews...",
    category: "Research",
    lastEdited: "1 day ago",
    author: "Mike Johnson",
    isFavorite: true,
  },
  {
    id: 4,
    title: "Sprint Retrospective",
    content: "What went well and what to improve...",
    category: "Meetings",
    lastEdited: "2 days ago",
    author: "Sarah Williams",
    isFavorite: false,
  },
  {
    id: 5,
    title: "Marketing Campaign Ideas",
    content: "Brainstorming session for Q1 campaigns...",
    category: "Marketing",
    lastEdited: "3 days ago",
    author: "John Doe",
    isFavorite: false,
  },
  {
    id: 6,
    title: "Technical Architecture Review",
    content: "System design and scalability considerations...",
    category: "Engineering",
    lastEdited: "4 days ago",
    author: "Alex Chen",
    isFavorite: true,
  },
]

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateNote = (noteData: { title: string; content: string; category: string }) => {
    const newNote: Note = {
      id: Math.max(...notes.map((n) => n.id)) + 1,
      ...noteData,
      lastEdited: "Just now",
      author: "John Doe",
      isFavorite: false,
    }
    setNotes([newNote, ...notes])
    setIsModalOpen(false)
  }

  const handleEditNote = (noteData: { title: string; content: string; category: string }) => {
    if (editingNote) {
      setNotes(
        notes.map((note) => (note.id === editingNote.id ? { ...note, ...noteData, lastEdited: "Just now" } : note)),
      )
      setEditingNote(null)
      setIsModalOpen(false)
    }
  }

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const handleToggleFavorite = (id: number) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, isFavorite: !note.isFavorite } : note)))
  }

  const openEditModal = (note: Note) => {
    setEditingNote(note)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingNote(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Notes</h1>
          <p className="text-muted-foreground mt-1">Manage and organize your team's notes</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Notes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{note.title}</CardTitle>
                  <CardDescription className="mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {note.category}
                    </Badge>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToggleFavorite(note.id)}>
                    <Star
                      className={`w-4 h-4 ${note.isFavorite ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditModal(note)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteNote(note.id)} className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{note.content}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{note.author}</span>
                <span>{note.lastEdited}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-1">No notes found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or create a new note</p>
          </CardContent>
        </Card>
      )}

      {/* Note Modal */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={editingNote ? handleEditNote : handleCreateNote}
        initialData={editingNote || undefined}
      />
    </div>
  )
}
