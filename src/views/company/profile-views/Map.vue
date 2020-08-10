<template>
  <div>
    <h1 class="ui center aligned icon header">
      <i class="circular map icon"></i>
      Map
    </h1>
    <div style="height: 500px; width: 100%;">
      <div style="height: 200px overflow: auto;"></div>
      <l-map
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 100%;"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      >
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker :lat-lng="center">
          <l-tooltip :options="{ permanent: true, interactive: true }">
            <div>
              company location
            </div>
          </l-tooltip>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script lang="ts">
import "leaflet/dist/leaflet.css";

import { Component, Vue } from "vue-property-decorator";
import api from "@/services/api";
import { mapState } from "vuex";

import { latLng, Icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

type D = Icon.Default & {
  _getIconUrl: string;
};

delete (Icon.Default.prototype as D)._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

@Component({
  components: { LMap, LTileLayer, LMarker, LPopup, LTooltip },
  computed: mapState("company", ["company"]),
})
export default class CompanyMap extends Vue {
  zoom = 15;
  url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  attribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
  cmpLocation = this.$store.state.company.company.location;
  currentCenter = latLng(this.cmpLocation[1], this.cmpLocation[0]);
  center = this.currentCenter;

  currentZoom = 11.5;
  mapOptions = {
    zoomSnap: 0.5,
  };

  zoomUpdate(zoom: any) {
    this.currentZoom = zoom;
  }
  centerUpdate(center: any) {
    this.currentCenter = center;
  }
}
</script>
