'use client'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import React from 'react'

function PageContent({ q }: { q: string }) {
  const res = useQuery(['test', q], () => ({ mynumber: Math.random() }), {
    // staleTime: Number.POSITIVE_INFINITY,
    // staleTime: 0,
    networkMode: 'always',
  })
  ;(globalThis as any).res = res
  return (
    <div className="space-y-8">
      {res.status}
      <h1 className="text-xl font-medium text-gray-300">
        {q}: {res.data?.mynumber}
      </h1>
    </div>
  )
}

export default function Page() {
  const [slug, setSlug] = React.useState('')

  const queryClient = React.useMemo(() => {
    console.log('Creating new query client')
    const client = new QueryClient()
    Object.assign(client, { ts: new Date().toISOString() })
    return client
  }, [slug])

  ;(globalThis as any).queryClient = queryClient

  const [queryKey, setKey] = React.useState('tab1')

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Hello {slug}</h1>
      Slug: <input value={slug} onChange={(e) => setSlug(e.target.value)} />
      Query Key:{' '}
      <input value={queryKey} onChange={(e) => setKey(e.target.value)} />
      <QueryClientProvider client={queryClient}>
        <PageContent q={queryKey} />
      </QueryClientProvider>
    </div>
  )
}
