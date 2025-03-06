'use client'
import fetchApi from '@/utils/basic/fetchApi'
import Address from 'shared/clients/funnel/bloks/FunnelSelect/AddressSelect/Address.type'

class AddressApi {
  private timerID?: any
  private id: string

  constructor() {
    this.timerID = null
    this.id = (Math.random() + 1).toString(36).substring(2)
  }

  private async fetch(slug: string, params: { [key: string]: string | number } = {}): Promise<Address[]> {
    const searchParams = new URLSearchParams(params as Record<string, string>).toString()
    const { features } = await fetchApi(`https://api-adresse.data.gouv.fr/${slug}?${searchParams}`)
    return features?.map((f: Address) => this.format(f)).filter((f: Address) => f.postcode?.substring(0, 2) != '97')
  }

  private format({ properties, geometry }: any): Address {
    const [lon, lat] = geometry.coordinates ?? [null, null]
    const { id, type, label, housenumber, street, name, city, citycode, postcode } = properties
    return { id, type, label, housenumber, street, name, city, citycode, postcode, lon, lat }
  }
  private async search(q: string, type?: string): Promise<Address[]> {
    if (type == 'city')
      return (await this.fetch('search', { q, limit: 10, type: 'municipality' }))?.filter(
        (addr) => !addr.city.includes('Arrondissement')
      )
    const addresses = await this.fetch('search', { q, limit: 15 })
    return addresses.filter((addr) => ['housenumber', 'street'].includes(addr.type))
  }

  async getAddrFromCoords(lon: number, lat: number): Promise<Address | null> {
    return (await this.fetch('reverse', { lon, lat }))[0] ?? null
  }

  clear() {
    this.id = (Math.random() + 1).toString(36).substring(2)
    this.timerID = clearTimeout(this.timerID)
  }

  autocomplete(value: any, minChar: any, callback: any, type: any) {
    if (value.length <= minChar) return
    if (this.timerID) clearTimeout(this.timerID)
    const id = this.id
    this.timerID = setTimeout(async () => {
      try {
        const addrs = await this.search(value, type)
        if (id == this.id) callback(addrs)
      } catch (e: any) {
        console.error('ERROR 827', e)
      }
    }, 300)
  }
}

const addressApi = new AddressApi()
export default addressApi
