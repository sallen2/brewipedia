<script lang="ts">
  import { browser } from '$app/env';
  import L from 'leaflet'
  import { onMount } from 'svelte';
  import access from './config'

  export let zoom = 18;
  export let id: string;
  export let location: {latitude: number, longitude: number};
  export let style = 'width:425px; height:350px';
  export let breweryName: string;

  const { latitude, longitude } = location;
  const { mapboxAccessToken } = access;
  const markerMarkup = `<img style="height:35px; border: none;" class="is-inline mr-1" src="favicon-32x32.png" alt="beer icon">`;
  const popup = `<p>${breweryName}</p>`;

  function createMap() {
    let map = L.map(id).setView([latitude, longitude], zoom);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}{r}?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: mapboxAccessToken,
      detectRetina: true,
    })
    .addTo(map);
    L.marker([latitude, longitude], {icon: L.divIcon({
      html: markerMarkup,
      iconSize: 40,
      className: 'beer-icon'
    })}).bindPopup(popup).addTo(map);
  }

  onMount(() => {
    createMap()
  })
</script>

<svelte:head>
   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>
</svelte:head>

<style>
  .beer-icon {
    border: none;
    background: transparent;
  }
</style>

<div {id} {style}/>