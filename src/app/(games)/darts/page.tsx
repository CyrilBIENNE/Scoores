import DartsGame from 'templates/darts/DartsGame'
import { defaultMetadata } from 'templates/meta/default'

export const dynamic = 'force-static'

export async function generateMetadata() {
  return {
    defaultMetadata,
    title: 'Darts',
    description: 'Compteur de score pour jeu de fléchettes.',
  }
}

export default async function Page() {
  return <DartsGame />
}
