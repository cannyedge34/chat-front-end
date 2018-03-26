<template>
  <div class="col room text-center">
     <router-link :to="{ 
       name: 'Room', 
       params: { title: `${room.title}`, id: `${room.id}` } 
      }">
      <img :src="image" />
      <H3>{{ room.title }}</H3>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Bucket",
  props: ["room"],
  data() {
    return {
      image: `http://via.placeholder.com/200x200?text=${encodeURIComponent(
        this.room.title
      )}`
    };
  }
  // created() {
  //   this.pullImage();
  // },
  // methods: {
  //   async pullImage() {
  //     const response = await fetch(
  //       `http://api.google.com/?q=${encodeURIComponent(
  //         this.room.title
  //       )}&format=json&pretty=1&no_html=1&skip_disambig=1`
  //     );
  //     const json = await response.json();
  //     if (json.Image) {
  //       this.image = json.Image;
  //     }
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.title {
  min-width: 260px;

  img {
    object-fit: cover;
    width: 100%;
    height: 260px;
  }
}
</style>
