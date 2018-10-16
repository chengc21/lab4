<template>
  <div class="container-fluid">
    <h1>Gallery Listing</h1>
    <ul>
      <li v-for="object in objects">
        <a :href="`/object/${object.id}`"> {{object.title}} </a>
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
