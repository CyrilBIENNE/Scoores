import { GAME_CONFIGS, GameConfigType, GameConfigVersion } from 'configs/configs.type'
import { DartsGameConfig } from './Darts.typs'

type Props = {
  config: DartsGameConfig
}
export default function Darts({ config }: Props) {
  const currentGame: GameConfigType = GAME_CONFIGS.darts
  const currentVersion: GameConfigVersion | undefined = currentGame?.versions?.find(
    (version: any) => version.slug === config.dartGame
  )

  return (
    <div>
      {currentVersion?.name}
      <p>{config.name1}</p>
      <p>{config.name2}</p>
    </div>
  )
}
