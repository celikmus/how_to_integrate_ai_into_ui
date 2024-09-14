'use client'

import { useState } from 'react'
import { ClientMessage } from './actions'
import { useActions, useUIState } from 'ai/rsc'
import { generateId } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export default function Home() {
  const [input, setInput] = useState<string>('')
  const [conversation, setConversation] = useUIState()
  const { continueConversation } = useActions()

  const handleSubmit = async (event: any) => {
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      { id: generateId(), role: 'user', display: input },
    ])
    const message = await continueConversation(input)
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ])
    setInput('')
  }

  return (
    <div>
      <div className="mx-auto w-full bg-gray-800 px-4 py-8 sm:w-[760px]">
        <div>
          {conversation.map((message: ClientMessage) => (
            <div key={message.id} className="flex">
              {message.role}: {message.display}
            </div>
          ))}
        </div>
        <div className="my-4 flex caret-black">
          <input
            type="text"
            value={input}
            className="min-w-[400px] rounded-xl px-2 text-gray-900"
            onChange={(event) => {
              setInput(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit(event)
              }
            }}
          />
          <button
            className="ml-2 rounded-xl bg-green-800 p-2 text-gray-100"
            onClick={handleSubmit}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  )
}
