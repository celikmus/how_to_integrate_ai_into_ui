'use client'

import { FormEvent } from 'react'
import { ClientMessage } from './actions'
import { useActions, useUIState } from 'ai/rsc'
import { generateId } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export default function Home() {
  const [conversation, setConversation] = useUIState()
  const { continueConversation } = useActions()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      { id: generateId(), role: 'user', display: event.target.message.value },
    ])
    const message = await continueConversation(event.target.message.value)
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ])
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
        <form className="my-4 flex caret-black" onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            className="min-w-[400px] rounded-xl px-2 text-gray-900"
          />
          <button className="ml-2 rounded-xl bg-green-800 p-2 text-gray-100">
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
