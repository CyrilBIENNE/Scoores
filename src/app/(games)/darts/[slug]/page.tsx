import { GAME_CONFIGS, GameConfigVersion } from 'configs/configs.type'
//import { Metadata, ResolvingMetadata } from 'next'
import { defaultMetadata } from 'templates/meta/default'
import { defaultMetadata404 } from 'templates/meta/defaultMetadata404'

export const dynamic = 'force-static'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata(props: Props) {
  const { slug } = await props.params

  const currentVersion: GameConfigVersion | undefined = GAME_CONFIGS.darts?.versions?.find(
    (version: any) => version.slug === slug
  )
  if (!currentVersion) return defaultMetadata404
  return {
    defaultMetadata,
    title: 'Darts | ' + currentVersion?.name,
    description: `Compteur de score pour jeu de fléchettes ${currentVersion?.name}.`,
  }
}

export default async function Page(props: Props) {
  const { slug } = await props.params

  const currentVersion: GameConfigVersion | undefined = GAME_CONFIGS.darts?.versions?.find(
    (version: any) => version.slug === slug
  )

  return (
    <>
      <h1>{currentVersion?.name ?? 'nop'}</h1>
    </>
  )
}
