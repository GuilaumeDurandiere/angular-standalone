import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as Leaflet from 'leaflet';
import * as LeafletScreenshoter from 'leaflet-simple-map-screenshoter';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-add-emprise',
  standalone: true,
  imports: [
    CommonModule,
    LeafletModule,
    ButtonModule,
  ],
  templateUrl: './modal-add-emprise.component.html',
  styleUrl: './modal-add-emprise.component.less',
})
export class ModalAddEmpriseComponent {

  points: { lat: number, lng: number }[] = this.config.data.points;

  polygon: Leaflet.Polygon | null = null;
  markers: Leaflet.Marker[] = []

  map!: Leaflet.Map;

  screenshotter: LeafletScreenshoter.SimpleMapScreenshoter | null = null;

  options: Leaflet.MapOptions = {
    layers: [new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    })],
    zoom: 9,
    center: new Leaflet.LatLng(47.400231, -1.6466296)
  };

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) { }

  setMap(map: Leaflet.Map): void {
    this.map = map
    this.drawEmprise();
    this.setScreenShotter();
  }

  setScreenShotter(): void {
    const snapshotOptions = {
      hideElementsWithSelectors: [
        ".leaflet-control-container",
        ".leaflet-dont-include-pane",
        "#snapshot-button"
      ],
      hidden: true,
    };

    // Add screenshotter to map
    this.screenshotter = new LeafletScreenshoter.SimpleMapScreenshoter(snapshotOptions);
    this.screenshotter.addTo(this.map);
  }

  getPoint(event: Leaflet.LeafletMouseEvent): void {
    if (!this.polygon) {
      const lat = event.latlng.lat
      const lng = event.latlng.lng;
      this.points.push({ lat, lng })
      const marker = Leaflet.marker([lat, lng])
      this.markers.push(marker);
      marker.addTo(this.map)
    }
  }

  drawEmprise(): void {
    if (!this.polygon && this.points.length > 2) {
      this.polygon = Leaflet.polygon(this.points, { color: 'red' })
      this.polygon.addTo(this.map);

      this.markers.forEach((marker: Leaflet.Marker) =>
        this.map.removeLayer(marker)
      )
    }
  }

  cancel(): void {
    if (this.points) {
      this.markers.forEach((marker: Leaflet.Marker) =>
        this.map.removeLayer(marker)
      )

      this.points = [];
    }

    if (this.polygon) {
      this.map.removeLayer(this.polygon);
      this.polygon = null;
    }
  }

  takeScreenShot(): void {
    this.screenshotter?.takeScreen("image")
      .then((image: Blob | Error | Leaflet.ErrorEvent) => {
        // Create <img> element to render img data
        this.ref.close({ image, points: this.points })

      })
  }

}



