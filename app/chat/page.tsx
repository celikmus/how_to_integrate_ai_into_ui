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

  return (
    <div>
      <div>
        {conversation.map((message: ClientMessage) => (
          <div key={message.id}>
            {message.role}: {message.display}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={input}
          className="text-gray-900"
          onChange={(event) => {
            setInput(event.target.value)
          }}
        />
        <button
          onClick={async (e) => {
            e.preventDefault()
            setConversation((currentConversation: ClientMessage[]) => [
              ...currentConversation,
              { id: generateId(), role: 'user', display: input },
            ])
            console.log('continueConversation >> input: ' + input)
            const message = await continueConversation(input)
            console.log('message: ', message)
            setConversation((currentConversation: ClientMessage[]) => [
              ...currentConversation,
              message,
            ])
            setInput('')
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  )
}
