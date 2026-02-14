'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AddBookmark({ user }: any) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBookmark = async () => {
    if (!title || !url) return alert('Fill all fields')

    try {
      new URL(url)
    } catch {
      return alert('Invalid URL')
    }

    await supabase.from('bookmarks').insert({
      title,
      url,
      user_id: user.id,
    })

    setTitle('')
    setUrl('')
  }

  return (
    <div className="mb-6 flex gap-2">
      <input
        className="border p-2 flex-1 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 flex-1 rounded"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={addBookmark}
        className="bg-blue-600 text-white px-4 rounded"
      >
        Add
      </button>
    </div>
  )
}
