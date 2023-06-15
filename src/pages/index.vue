<template>
    <div>
        <DefaultLayout>
            <div class="container p-2" id="home-page">
                <div class="row">
                    <!-- Slider recommend movie -->
                    <h3 class="text-light">PHIM ĐỀ XUẤT</h3>
                    <flickity v-if="Object.keys(random12inListMovie).length > 0" class="carousel" ref="flickity"
                        :options="flickityOptions">
                        <div class="carousel-cell mx-md-2 col-md-4 col-lg-pc" v-for="(item, index) in random12inListMovie"
                            :key="index" style="height: 300px;">
                            <ItemMovie :movie="item" />
                        </div>
                    </flickity>
                    <!-- List movie -->
                    <div class="col-sm col-md-9 list__line ">
                        <div class="row">
                            <div>
                                <router-link :to="{ name: 'movie-list', params: { slug: 'phim-bo', name: 'phim bộ' } }"
                                    class="col-3" style="text-decoration: none;">
                                    <div class="row">
                                        <div class="col-8">
                                            <h4 class="text-light">PHIM BỘ</h4>
                                        </div>
                                        <div class="col-4 text-end">
                                            <h4 class="text-light">XEM THÊM</h4>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                            <div v-for="(item, index) in listSeriesMovie" :key="index"
                                class="col-6 col-md-4 col-lg-3 text-light mb-4 ">
                                <ItemMovie :movie="item" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="mt-2">
                                <router-link :to="{ name: 'movie-list', params: { slug: 'phim-le', name: 'phim lẻ' } }"
                                    class="col-3" style="text-decoration: none;">
                                    <div class="row">
                                        <div class="col-8">
                                            <h4 class="text-light">PHIM LẺ</h4>
                                        </div>
                                        <div class="col-4 text-end">
                                            <h4 class="text-light">XEM THÊM</h4>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                            <lazy-component v-for="(item, index) in listSingleMovie" :key="index"
                                class="col-6 col-md-4 col-lg-3 text-light mb-4 ">
                                <ItemMovie :movie="item" />
                            </lazy-component>
                        </div>
                        <div class="row">
                            <div>
                                <router-link
                                    :to="{ name: 'movie-list', params: { slug: 'hoat-hinh', name: 'phim hoạt hình' } }"
                                    class="col-3" style="text-decoration: none;">
                                    <div class="row">
                                        <div class="col-8">
                                            <h4 class="text-light">PHIM HOẠT HÌNH</h4>
                                        </div>
                                        <div class="col-4 text-end">
                                            <h4 class="text-light">XEM THÊM</h4>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                            <lazy-component v-for="(item, index) in listCartoon" :key="index"
                                class="col-6 col-md-4 col-lg-3 text-light  ">
                                <ItemMovie :movie="item" />
                            </lazy-component>

                        </div>
                        <router-view></router-view>
                    </div>
                    <!-- Top movie -->
                    <div class="col-3 ml-3 premovie">
                            <PreMovie />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    </div>
</template>
  
<script>
import PreMovie from '@/components/PreMovie.vue'
import Flickity from 'vue-flickity';
import DefaultLayout from '@/components/Default-layout.vue';
import ItemMovie from '@/components/ItemMovie.vue'
import axios from 'axios';
import phimbo from '@/data/phimbo.json'
import phimle from '@/data/phimle.json'
import phimhoathinh from '@/data/phimhoathinh.json'
export default {
    components: {
        DefaultLayout,
        ItemMovie,
        Flickity,
        PreMovie
    },
    data() {
        return {
            flickityOptions: {
                initialIndex: 0,
                prevNextButtons: true,
                pageDots: false,
                wrapAround: true,
                freeScroll: false,
                groupCells: 2,
                autoPlay: true
                // any options from Flickity can be used
            },
            listMovie: [],
            listSeriesMovie: [],
            listSingleMovie: [],
            listCartoon: [],
        }
    },
    async created() {
        await this.getAllMovie()
        await this.getListSeriesMovie()
        await this.getListSingleMovie()
        await this.getListCartoon()
    },
    computed: {
        random12inListMovie() {
            const shuffledList = this.listMovie.sort(() => Math.random() - 0.5);
            return shuffledList.slice(0, 12);
        },

    },

    methods: {
        getAllMovie() {
            // block get data by CORS :'(
            // const response = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/danh-sach/phim-bo.json?slug=phim-bo`)
            // const response2 = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/danh-sach/hoat-hinh.json?slug=hoat-hinh`)
            // const response3 = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/danh-sach/phim-le.json?slug=phim-le`)
            // this.listMovie.push(...response.data.pageProps.data.items);
            // this.listMovie.push(...response2.data.pageProps.data.items);
            // this.listMovie.push(...response3.data.pageProps.data.items);
            const response = phimbo
            const response2 = phimle
            const response3 = phimhoathinh
            this.listMovie.push(...response.items);
            this.listMovie.push(...response2.items);
            this.listMovie.push(...response3.items);
            console.log(this.listMovie)
        },
        getListSeriesMovie() {
            const response = phimbo
            this.listSeriesMovie = response.items.slice(0, 24)
        },
        getListSingleMovie() {
            const response = phimle
            this.listSingleMovie = response.items.slice(0, 24)
        },
        getListCartoon() {
            const response = phimhoathinh
            this.listCartoon = response.items.slice(0, 24)
        },
    }
}

</script>
  
<style>
html,
body {
    /* overflow-y: auto; */

}

.list__line {
    margin-top: 1rem;
    border-right: 0.15rem dashed #ccc;
}

.text-end:hover .text-light, .text-end {
    color:blue !important;
}

.thumb-movie {
    width: 3.5rem;
    height: 4rem;
    border-radius: 2px;
}


@media screen and (min-width : 320px) and (max-width: 767px) {
    .carousel-cell {
        margin: 0 0.25rem;
        width: 50%;
        left: 4px !important;
    }

    .premovie {
        display: none;
    }
}

@media screen and (min-width : 992px) {
    .col-lg-pc {
        width: 20%;
    }
}
</style>
  