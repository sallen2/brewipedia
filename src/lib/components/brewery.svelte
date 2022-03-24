<script>
  import BrewaryModal from '$lib/components/brewary-modal.svelte'

  let openModal = false;
  export let brewery;
</script>

{#if openModal}
  <BrewaryModal {brewery} bind:isActive={openModal}/>
{/if}

<div class="column is-6">
  <div class="box has-background-brewipedia-color-light">
    <article class="media">
      <div class="media-content">
        <div class="rows">
          <div class="row">
            <h1 class="is-size-4 is-family-secondary">
              <img id="beer-favicon-height" class="is-inline mr-1" src="beer.png" alt="beer icon">
              {brewery.name}
            </h1>
          </div>
          <div class="row"> 
            {#if brewery.street}
              {brewery.street}
            {/if} {brewery.city}, {brewery.state}
          </div>
        </div>
        <div class="container pt-6">
          <button 
            on:click={()=>{
                openModal = true
              }
            } 
            class="button is-beer-orange">
            More Info
          </button>
        </div>
      </div>
    </article>
  </div>
</div>

<style>
  #beer-favicon-height {
    height: 42px;
  }
</style>