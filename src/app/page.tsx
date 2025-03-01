import Home from 'templates/home/Home'
import { defaultMetadata } from 'templates/meta/default'

export const dynamic = 'force-static'

export async function generateMetadata() {
  return defaultMetadata
}

export default async function Page() {
  return <Home />
}
