'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function BookmarkList({ user }: any) {
  const [bookmarks, setBookmarks] = useState<any[]>([])

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error) {
      setBookmarks(data || [])
    }
  }

  useEffect(() => {
    if (!user?.id) return

    fetchBookmarks()

    const channel = supabase
      .channel(`bookmarks-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Realtime event:', payload)
          fetchBookmarks()
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status)
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user?.id])

  const deleteBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
  }

  return (
    <div>
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="border p-3 mb-3 rounded flex justify-between"
        >
          <a
            href={bookmark.url}
            target="_blank"
            className="text-blue-600"
          >
            {bookmark.title}
          </a>
          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}

      {bookmarks.length === 0 && (
        <p className="text-gray-500">No bookmarks yet</p>
      )}
    </div>
  )
}
