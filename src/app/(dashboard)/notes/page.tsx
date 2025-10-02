"use client"

import { useState, useEffect } from "react"
import { supabase } from '@/lib/supabaseClient'
import useUser from '@/hooks/useUser'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { NoteModal } from '@/components/notes/note-modal'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, MoreVertical, Edit, Trash2, Star, FileText, Loader } from 'lucide-react'

type Note = {
  id: number
  title: string
  content: string
  category: string
  lastEdited: string
  author: string
  isFavorite: boolean
}

export default function NotesPage() {
  const { user, isLoading: userLoading } = useUser()
  const [notes, setNotes] = useState<Note[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchNotes = async () => {
      setLoading(true)
      try {
        // Get user's org_id
        const { data: memberData, error: memberError } = await supabase.from('members').select('org_id').eq('user_id', user.id).single()
        if (memberError || !memberData) throw memberError || new Error('No organization found')
        const orgId = memberData.org_id

        // Fetch notes for this org
        const { data: notesData, error: notesError } = await supabase.from('notes').select('*').eq('org_id', orgId).order('created_at', { ascending: false })
        if (notesError) throw notesError

        const formattedNotes: Note[] = notesData.map((note: any) => ({
          id: note.id,
          title: note.title,
          content: note.content,
          category: note.category,
          lastEdited: new Date(note.created_at).toLocaleString(),
          author: note.created_by || 'Unknown',
          isFavorite: note.is_favorite || false,
        }))

        setNotes(formattedNotes)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [user])

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateNote = (noteData: { title: string; content: string; category: string }) => {
    const newNote: Note = {
      id: Math.max(...notes.map(n => n.id), 0) + 1,
      ...noteData,
      lastEdited: 'Just now',
      author: user?.email || 'Unknown',
      isFavorite: false,
    }
    setNotes([newNote, ...notes])
    setIsModalOpen(false)
  }

  const handleEditNote = (noteData: { title: string; content: string; category: string }) => {
    if (editingNote) {
      setNotes(notes.map(note => note.id === editingNote.id ? { ...note, ...noteData, lastEdited: 'Just now' } : note))
      setEditingNote(null)
      setIsModalOpen(false)
    }
  }

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const handleToggleFavorite = (id: number) => {
    setNotes(notes.map(note => note.id === id ? { ...note, isFavorite: !note.isFavorite } : note))
  }

  const openEditModal = (note: Note) => {
    setEditingNote(note)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingNote(null)
  }

  if (userLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader />{" "} Loading...</div>
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
        {filteredNotes.map(note => (
          <Card key={note.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <div className="truncate">
                    <CardTitle className="text-lg truncate w-full">{note.title}</CardTitle>
                    <CardDescription className="mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {note.category}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToggleFavorite(note.id)}>
                    <Star className={`w-4 h-4 ${note.isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
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
