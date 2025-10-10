import { Metadata } from 'next'
import { getMetadata } from 'templates/_layout/meta/getMetadata'
import Home from 'templates/home/Home'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata('/', undefined, 'Scoores', 'Scoores, outils pour les jeux de salle (billard, snooker, ...).')
}

export default async function Page() {
  return <Home />
}
