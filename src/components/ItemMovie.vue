<template>
    <div class="h-100 item-movie  position-relative">
       <router-link :to="{name:'movie-detail', params: {slug: movie.slug}}" style="text-decoration: none;">
        <img :src="'https://img.ophim1.com/uploads/movies/' + movie.thumb_url" class=" w-100 h-100 item-img">
        <font-awesome-icon class="item-icon text-light" icon="play-circle" />
        <div class="btn btn-primary position-absolute" style="left: 0;">{{ movie.year }}</div>
        <div class="text-center text-light position-relative" style="background-color: rgba(0,0,0,.7); bottom:48px">
            <div class="text-truncate mx-auto w-80">{{ movie.name }} </div>
            <div class="text-truncate mx-auto w-80">{{ movie.origin_name }}</div>
        </div>
       </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        movie: {
            type: Object,
            requred: true,
            default() {
                return {}
            },
        },
    }
}
</script>

<style>
.item-movie:hover .item-img{
    cursor: pointer;
    opacity: 0.7;
}

.item-movie:hover .item-icon{
    display: block;
    animation: fadeIn 0.2s ease-in;
}

.item-icon {
    font-size: 3rem;
    position: absolute;
    top: 50%;
    left: 39%;
    display: none;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
<!-- 
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
    integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
crossorigin="anonymous">


</head> -->