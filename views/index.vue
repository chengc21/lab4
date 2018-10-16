<template>
  <div class="container-fluid">
    <h1>Gallery Listing</h1>
    <ul>
      <li v-for="gallery in galleries">
        <a :href="`/gallery/${gallery.id}`"> {{gallery.name}} </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    data() {
      return {};
    }
}
</script>

<style>
</style>
