import { defaultMetadata } from 'templates/meta/default'
import ShootoutGame from 'templates/shootout/ShootoutGame'

export const dynamic = 'force-static'

export async function generateMetadata() {
  return {
    defaultMetadata,
    title: 'Shootout',
    description: 'Chronomètre pour Shootout, une variation du jeu de snooker pour les sportifs.',
  }
}

export default async function Page() {
  return <ShootoutGame />
}
