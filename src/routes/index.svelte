<script context='module'>
  export async function load({ fetch }) {
    const res = await fetch('/api')
    const { data: breweries } = await res.json()

    if (res.ok) {
      return {
        props: {
          breweries
        }
      }
    }

    return {
      status: res.status,
      error: new Error('Error fetching breweries')
    }

  }
</script>

<script>
  import Brewery from '$lib/components/brewery.svelte';

  let title = 'Brewipedia';
  let highlightCity = 'Atlanta'
  export let breweries;
</script>

<div class="has-background-brewipedia-color">
  <div class="container pb-4">
    <div class="rows">
      <div class="row is-size-1 title">
        <h1 id="playwright-title" class="is-family-secondary is-size-1">
          {title}
        </h1>
      </div>

      <div class="row is-size-4 subtitle">
        <p>
          Wikipedia for breweries, but with a twist! Every week we highlight the top 20 best breweries
          in a US city. This weeks highlight is...{highlightCity}! Enjoy this week's top 20 list and 
          don't forget to tell em we sent ya! 😉
        </p>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="columns is-flex-wrap-wrap">
      {#each breweries as brewery}
        <Brewery {brewery}/>
      {/each}
    </div>
  </div>
</div>