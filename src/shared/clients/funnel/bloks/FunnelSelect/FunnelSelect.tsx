import styles from './FunnelSelect.module.scss'

import OutSideDiv from 'shared/components/layout/OutSideDiv/OutSideDiv'
import Input from '../FunnelInput/Input/Input'
import Close from '@/icons/closed'
import Search from '@/icons/search'
import ArrowRight from '@/icons/arrow-right'

// @TODO: DELETE
interface StyleData {
  mt?: number
  mb?: number
  width?: string
  borderRadius?: string
  fullWidth?: boolean
}
function createStyle(data: StyleData): object {
  const style: any = {}
  if (data.mt) style['marginTop'] = data.mt + 'px'
  if (typeof data.mt == 'number' && data.mt == 0) style['marginTop'] = '0px'
  if (data.mb) style['marginBottom'] = data.mb + 'px'
  if (typeof data.mb == 'number' && data.mb == 0) style['marginBottom'] = '0px'

  if (data.width) style['width'] = data.width
  if (data.fullWidth) style['width'] = '100%'

  return style
}

type Props = StyleData & {
  label?: string
  children: any
  core: any
  fullWidth?: boolean
  hasBtn?: boolean
  onClear?: () => void
}

export default function FunnelSelect(props: Props) {
  const { label, isOpen, setIsOpen, onFocus, onInputChange } = props.core

  return (
    <OutSideDiv callback={() => setIsOpen(false)}>
      <div style={createStyle(props)}>
        <div
          data-open={isOpen}
          className={styles.funnelSelect}
          data-fullwidth={props.fullWidth}
          style={isOpen ? { top: `${visualViewport?.offsetTop}px` } : {}}
        >
          <Close onClick={() => onFocus(false, true)} class={styles.closeMobile} />
          <div className={styles.wrapper}>
            <div className={styles.wrapperBtn} data-btn={props.hasBtn ? true : false}>
              <Search />
              <Input
                onChange={onInputChange}
                label={props.label}
                value={label ?? ''}
                onFocus={onFocus}
                onClear={props.onClear}
              />
              {props.hasBtn && (
                <div className={styles.btn}>
                  <ArrowRight />
                </div>
              )}
            </div>
            {isOpen && <div className={styles.droplist}>{props.children}</div>}
          </div>
        </div>
      </div>
    </OutSideDiv>
  )
}
