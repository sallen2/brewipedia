<script>
  import Map from '$lib/components/map/map.svelte'

  export let isActive;
  export let brewery;

  const closeModal = () => {
    isActive = false;
  }
</script>


<div class={`modal ${isActive ? 'is-active' : ''}`}>
  <div class="modal-background" on:click={closeModal}></div>
  <div class="modal-card">
    <header class="modal-card-head has-background-brewipedia-color-light">
      <p class="is-family-secondary modal-card-title">{brewery.name}</p>
      <button class="delete" aria-label="close" on:click={closeModal}></button>
    </header>
    <section class="modal-card-body has-background-brewipedia-color-light">
      <div class="columns">
        <div class="column">
          <div class="rows">
            <div class="row">
              <p class="is-size-4 is-family-secondary">Address</p> 
              {#if brewery.street}
                {brewery.street}
              {/if} {brewery.city}, {brewery.state}
            </div>
            <div class="row mt-3">
              <p class="is-size-4 is-family-secondary">Type</p>  
              {#if brewery.brewery_type}
                {brewery.brewery_type}
                {:else}
                Not specified
              {/if}
            </div>
            <div class="row mt-3">
              <p class="is-size-4 is-family-secondary">Website</p> 
              {#if brewery.website_url}
                <a href={brewery.website_url} target="_blank">{brewery.website_url}</a> 
                {:else}
                None
              {/if}
            </div>
          </div>
        </div>
        <div class="column">
          <figure class="container">
            <Map id={brewery.name} 
              style='width:20em; height:20em' breweryName={brewery.name}
              location={{latitude: Number(brewery.latitude), longitude: Number(brewery.longitude)}}
            />
          </figure>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot has-background-brewipedia-color-light">
      <button class="button is-beer-orange" on:click={closeModal}>Close</button>
    </footer>
  </div>
</div>