'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import AddBookmark from '@/components/AddBookmark'
import BookmarkList from '@/components/BookmarkList'
import LogoutButton from '@/components/LogoutButton'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/login'
      } else {
        setUser(data.user)
      }
    })
  }, [])

  if (!user) return <div className="p-8">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto p-8">
      <LogoutButton />
      <h1 className="text-2xl font-bold mb-6">Your Bookmarks</h1>
      <AddBookmark user={user} />
      <BookmarkList user={user} />
    </div>
  )
}
