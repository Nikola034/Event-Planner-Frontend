import { Injectable } from '@angular/core';
import { Address } from './address';
import { StreetAddress } from './street-address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private readonly PHOTON_ENDPOINT = 'https://photon.komoot.io';
  async getRealAddress(coords: Address): Promise<StreetAddress> {
    const response = await fetch(
      `${this.PHOTON_ENDPOINT}/reverse?` +
      `lat=${coords.latitude}&lon=${coords.longitude}` +
      '&lang=en'
    );

    if (!response.ok) {
      throw new Error(`Photon API error: ${response.status}`);
    }

    const data = await response.json();
    const properties = data.features[0]?.properties;

    if (!properties) {
      throw new Error('No results found');
    }

    return {
      street: properties.street || 'Unknown Street',
      number: properties.housenumber || '',
      city: properties.city || properties.town || properties.village || 'Unknown City'
    };
  }
  constructor() { }
}
