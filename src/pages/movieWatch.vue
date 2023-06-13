<template>
    <defaultLayout>
        <div class="container">
            <div class="row">
                <div style="height: 600px;" class="text-center">
                    <iframe :src=srcEp width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="col col-md-9 col-lg-9">
                    <!-- List episodes and movie's content -->
                    <h3>TẬP PHIM</h3>
                    <router-link class="btn btn-light mx-1 my-1"
                        :class="{ 'active': item.slug === ep || item.slug === 'full' }" style="width: 50px;"
                        v-for="(item, index) in listEpisodes" :key="index"
                        :to="{ name: 'movie-watch', params: { slug: slug, ep: item.slug } }">
                        {{ item.name }}
                    </router-link>
                    <div class="text-light">
                        <h4 class="my-0 text-danger">Nội dung chi tiết</h4>
                        <h4>{{ movie.name }}</h4>
                        <span v-html="removePTag(movie.content)"></span>
                    </div>

                </div>
                <div class="col-3 movie-pre">
                    <PreMovie />
                </div>
            </div>

        </div>
    </defaultLayout>
</template>

<script>
import axios from 'axios'
import PreMovie from '@/components/PreMovie.vue'
import defaultLayout from '@/components/Default-layout.vue'
export default {
    props: {
        slug: {
            type: String,
            required: true
        },
        ep: {
            type: String,
            required: true
        },
    },
    components: {
        defaultLayout,
        PreMovie,
    },
    data() {
        return {
            listEpisodes: [],
            movie: [],

            srcEp: '',
        }
    },
    watch: {
        ep(newEp) {
            this.playMovieByEp(newEp)
            this.scrollTop()
        }
    },

    async created() {
        await this.getMovieBySlug()
        await this.playMovieByEp()
        this.scrollTop()

    },
    methods: {
        scrollTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            });
        },
        async getMovieBySlug() {
            try {
                const response = await axios.get(`https://ophim1.com/phim/${this.slug}`)
                this.movie = response.data.movie
                this.listEpisodes = response.data.episodes[0].server_data
                console.log(this.listEpisodes);
            }
            catch (e) {
                console.log(e);
            }
        },
        async playMovieByEp() {
            try {
                if (isNaN(this.ep)) {
                    this.srcEp = this.listEpisodes[0].link_embed
                }
                else {
                    this.srcEp = this.listEpisodes[this.ep - 1].link_embed
                }
                console.log(this.srcEp);
            }
            catch (e) {
                console.log(e);
            }
        },
        removePTag(string) {
            if (string) {
                return string.replace(/<\/?p>/g, '');
            }
            return '';
        },

    }
}
</script>

<style>
.active {
    background-color: blue !important;
    color: white !important;
}


@media screen and (min-width: 312px) and (max-width: 716px) {
    .movie-pre {
        display: none;
    }

}
</style>