<template>
    <DefaultLayout>
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="row position-relative">
                        <div class="position-absolute w-100 h-100">
                            <img :src=movie.thumb_url class="w-100 h-100" style="opacity: 0.1;" />
                        </div>
                        <div class="col-12 col-md-6 z-1">
                            <img :src="movie.thumb_url" class="w-100" />
                            <router-link :to="{ name: 'movie-watch', params: { slug: slug, ep: '1' } }" class="button">
                                Xem ngay
                            </router-link>
                        </div>
                        <div class="col-12 col-md-6 z-1 text-light">
                            <h3 class="my-0">{{ movie.name }}</h3>
                            <p>{{ movie.origin_name }}</p>
                            <div>
                                <p>Trạng thái: {{ movie.episode_current }} {{ movie.lang }}</p>
                                <p>Thể loại:
                                    <span v-for="(item, index) in category" :key="index">
                                        <router-link
                                            :to="{ name: 'movie-list', params: { slug: item.slug, typeSlug: 'thể loại', name: item.name, type: 'category' } }"
                                            class="ml-1 text-light category" style="text-decoration: none;">
                                            <span v-if="index !== category.length - 1"> {{ item.name }},</span>
                                            <span v-else> {{ item.name }}</span>
                                        </router-link>
                                    </span>
                                    <!-- a -->
                                </p>
                            </div>
                            <p>Đạo diễn:
                                <span class="ml-0" v-for="(item, index) in director" :key="index">
                                    <span v-if="index !== director.length - 1"> {{ item }},</span>
                                    <span v-else> {{ item }}</span>
                                </span>
                            </p>
                            <p>Diễn viên:
                                <span v-for="(item, index) in get5actor" :key="index">
                                    <span v-if="index !== get5actor.length - 1"> {{ item }},</span>
                                    <span v-else> {{ item }}</span>
                                </span>

                            </p>
                            <!-- Movie's content -->
                            <div class="text-light mb-3">
                                <h4 class="my-0 text-danger">Nội dung chi tiết</h4>
                                <h4>{{ movie.name }}</h4>
                                <span>{{ removePTag(movie.content) }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- List movie user may like to watch -->
                    <div class="row">
                        <h3 class="my-0 text-danger my-3" >Có thể bạn sẽ thích</h3>
                        <lazy-component v-for="item in randomListNewMovie" :key="item.slug"
                            class="col-6 col-md-4 col-lg-3 my-2">
                            <ItemMovie :movie="item" />
                        </lazy-component>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import axios from 'axios';
import ItemMovie from '@/components/ItemMovie.vue'
import PreMovie from '@/components/PreMovie.vue';
import DefaultLayout from '@/components/Default-layout.vue'
export default {
    props: {
        slug: {
            type: String,
            required: true
        },
    },
    components: {
        DefaultLayout,
        PreMovie,
        ItemMovie
    },
    data() {
        return {
            movie: {},
            category: [],
            director: [],
            actor: [],
            listNewMovie: [],
        }
    },
    computed: {
        randomListNewMovie() {
            const shuffledList = this.listNewMovie.sort(() => Math.random() - 0.5);
            return shuffledList
        },
        get5actor() {
            return this.actor.slice(0, 4)
        }
    },
    async created() {
        await this.getMovieBySlug()
        await this.getNewMovie()
        this.scrollTop()
    },
    watch: {
        slug(newSlug) {
            this.getMovieBySlug(newSlug);
            this.scrollTop()
        }
    },
    methods: {
        scrollTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        removePTag(string) {
            if (string) {
                return string.replace(/<\/?p>/g, '');
            }
            return '';
        },
        async getMovieBySlug() {
            try {
                const response = await axios.get(`https://ophim1.com/phim/${this.slug}`)
                this.movie = response.data.movie
                this.category = this.movie.category
                this.director = this.movie.director
                this.actor = this.movie.actor
                console.log(this.movie);
            }
            catch (e) {
                console.log(e);
            }
        },
        async getNewMovie() {
            const response = await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=4`)
            const response2 = await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=8`)
            this.listNewMovie.push(...response.data.items)
            this.listNewMovie.push(...response2.data.items)


        }
    }
}
</script>
<style>
.button {
    display: block;
    text-decoration: none;
    text-align: center;
    background-color: blueviolet;
    padding: 4px;
    border: 1px solid #000;
    color: #fff;
    font-weight: 500;
}

.button:hover {
    cursor: pointer;
}

.category:hover {
    color: #00b8ff !important;
}

.bg-movie {}

@media screen and (min-width: 312px) and (max-width: 716px) {
    .movie-pre {
        display: none;
    }

    .movie-detail {
        margin-left: 0.25rem;
    }
}
</style>