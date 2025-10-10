import { Metadata } from 'next'
import { getMetadata } from 'templates/_layout/meta/getMetadata'
import ShootoutGame from 'templates/shootout/ShootoutGame'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata(
    '/shootout/',
    undefined,
    'Shootout',
    'Chronomètre pour Shootout, une variation du jeu de snooker pour les sportifs.'
  )
}

export default async function Page() {
  return <ShootoutGame />
}
