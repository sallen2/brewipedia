<script context='module'>
  export async function load({ fetch }) {
    const res = await fetch('/api')
    const { data: breweries } = await res.json()
    console.log(breweries);
    return 'ok'
  }
</script>

<script>
  let title = 'Brewipedia';

  const updateTitle = () => {
    title = 'new title';
  }

  export let guides
</script>

<!-- <div>
  <ul>
    {#each guides as guide}
      <li>
        <a href="/">{guide.title}</a>
      </li>
    {/each}
  </ul>
</div> -->

<div class="index">
  <h1 class="is-size-1">{title}</h1>
  <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam sapiente 
      odio facere sequi eos iusto autem praesentium animi exercitationem nulla, 
      aliquam laborum rem excepturi laudantium repellendus assumenda est velit 
      suscipit aut officiis eaque hic! Eaque assumenda minima in alias autem 
      exercitationem at tenetur accusamus fugit vel. Optio impedit accusamus 
      numquam, eum eaque quod facere perferendis voluptatum animi, doloribus 
      tenetur at!
  </p>
</div>

<button class="button is-primary">test</button>

<style>
  .index {
      text-align: center;
      display: block;
      margin: 20px auto;
  }

</style>