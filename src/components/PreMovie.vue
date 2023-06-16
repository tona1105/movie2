<template>
    <div>
        <h4 class="text-light mt-2 mb-2" style="padding-top: 6px;">PHIM MỚI CẬP NHẬT</h4>
        <div v-for="(item) in top6OfNewMovie" class="text-light col-12">
            <ItemMovie :movie="item" />
        </div>
        <h3 class="text-light mt-2">PHIM SẮP CHIẾU</h3>
        <lazy-component v-for="(item, index) in top6OfPreMovie" :key="index" class="text-light">
            <ItemMovie :movie="item" />
        </lazy-component>

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
        async getNewMovie() {
            // ok but too long -> low performed
            // const response = await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1`)
            // let data =  response.data.items
            // for (let item in data) {
            //     const status = await axios.get(`https://ophim1.com/phim/${data[item].slug}`)
            //     data[item].episode_current = status.data.movie.episode_current
            // }
            // console.log(data);
            // this.listNewMovie = data

            //better
            const response = await axios.get('https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1');
            const data = response.data.items;
            const promises = data.map(item => axios.get(`https://ophim1.com/phim/${item.slug}`));
            const results = await Promise.all(promises);
            for (let i = 0; i < results.length; i++) {
                data[i].episode_current = results[i].data.movie.episode_current;
            }
            this.listNewMovie = data;
        }
    }
}
</script>