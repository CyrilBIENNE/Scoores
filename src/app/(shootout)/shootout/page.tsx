import { defaultMetadata } from 'templates/meta/default'
import ShootoutGame from 'templates/shootout/ShootoutGame'

export const dynamic = 'force-static'

export async function generateMetadata() {
  return defaultMetadata
}

export default async function Page() {
  return <ShootoutGame />
}
