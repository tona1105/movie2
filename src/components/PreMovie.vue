<template>
    <div>
        <h4 class="text-light mt-2 mb-2" style="padding-top: 5px;">PHIM MỚI CẬP NHẬT</h4>
        <div v-for="(item) in top6OfNewMovie" class="text-light">
            <ItemMovie :movie="item" />
        </div>
        <h3 class="text-light mt-2">PHIM SẮP CHIẾU</h3>
        <div v-for="(item, index) in top6OfPreMovie" :key="index" class="text-light">
            <ItemMovie :movie="item" />
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import phimmoi from '@/data/phimmoi.json'
import phimsapchieu from '@/data/phimsapchieu.json'
import ItemMovie from './ItemMovie.vue';
export default {
    data() {
        return {
            listPreMovie: [],
            listNewMovie: []
        }
    },
    components: {
        ItemMovie
    },
    computed: {
        top6OfPreMovie() {
            const top6 = this.listPreMovie.slice(0, 6)
            return top6
        },
        top6OfNewMovie() {
            const top6 = this.listNewMovie.slice(0, 6)
            return top6
        }
    },
    async created() {
        await this.getListPre()
        await this.getNewMovie()
    },
    methods: {
        getListPre() {
            const response = phimsapchieu
            this.listPreMovie = response.items
        },
        getNewMovie() {
            const response = phimmoi
            this.listNewMovie = response.items
        }
    }
}
</script>