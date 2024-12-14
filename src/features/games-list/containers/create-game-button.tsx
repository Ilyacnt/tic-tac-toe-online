'use client'

import { Button } from '@/shared/ui/button'
import { createGameAction } from '../actions/create-game'
import { useActionState } from '@/shared/lib/react'
import { matchEither, right } from '@/shared/lib/either'
import { useToast } from '@/shared/lib/react/use-toast'
import { startTransition, useEffect } from 'react'

export function CreateGameButton() {
  const [data, dispatch, isPending] = useActionState(createGameAction, right(undefined))
  const { toast } = useToast()

  const dataError = matchEither(data, {
    right: () => null,
    left: (e) =>
      ({
        ['can-create-only-one-game']: 'You can create only one game',
        ['user-not-found']: 'User not found',
      })[e],
  })

  useEffect(() => {
    if (dataError) {
      toast({
        title: 'Error!',
        description: dataError,
        variant: 'destructive',
      })
    }
  }, [dataError, toast])

  return (
    <div className='flex gap-1'>
      <Button disabled={isPending} onClick={() => startTransition(dispatch)}>
        Create game
      </Button>
    </div>
  )
}
