<template>
  <div class="container-fluid">
    <h1>Object Details</h1>

      <!-- table of info about object -->
      <table style="width:100%" class="table">
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Provenance</th>
          <th>Accession Year</th>
          <th>Image</th>
        </tr>
        <tr id="actual-details">
          <td>{{detail.title}}</td>
          <td>{{detail.description}}</td>
          <td>{{detail.provenance}}</td>
          <td>{{detail.accessionyear}}</td>
          <td><img style="max-height:300px;" width="100%" :src="`${detail.primaryimageurl}`" v-if="detail.primaryimageurl"></td>
        </tr>
      </table>

      <h2>Comments</h2>
      <ul style="list-style-type:none" id="comments_list">
        <li v-for="comment in comments">
          {{comment}}
        </li>
      </ul>

      <form :action="`/object/${object_id}/comment`">
          <!-- comment submission box -->
          <div class="form-group">
            <label for="comment">Add comment:</label>
            <textarea class="form-control" rows="5" id="comment"></textarea>
          </div>
      <button v-on:click="submit_comment(object_id)" type="button" class="btn btn-primary">Submit</button>  <!-- from https://stackoverflow.com/questions/7803814/prevent-refresh-of-page-when-button-inside-form-clicked -->
      </form>
      <ul>
      </ul>


  </div>
</template>


<script>
export default {
    data() {
      return {};
    }
    ,
    methods: {
    submit_comment: function (object_id)  {
    console.log("hiii")
    console.log(object_id)
    fetch(`/object/${object_id}/${encodeURIComponent(document.getElementById("comment").value)}`) // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
    .then(document.getElementById("comments_list").innerHTML += `<li>${document.getElementById("comment").value}</li>`);
    }
    }
}
</script>

<style>
</style>
