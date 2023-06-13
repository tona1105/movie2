<template>
    <DefaultLayout>
        <div class="container" style="overflow: hidden;">
            <div class="row">
                <h3 class="text-center text-light">Danh sách {{ this.typeSlug }} {{ this.name }}</h3>
                <div>
                    <h3 class="text-light" style="display: block;">Sắp xếp theo:</h3>
                    <div class="btn btn-primary mb-2" :class="{ 'btn-info': click === 1 }" style="border: none; margin-right: 0.5rem;"
                        @click="sortByYearInc">
                        Mới nhất
                    </div>
                    <div class="btn btn-primary mx-2 mb-2" :class="{ 'btn-info': click === 2 }" style="border: none;"
                        @click="sortByYearDec">
                        Cũ nhất
                    </div>
                    <div class="btn btn-primary mx-2 mb-2" :class="{ 'btn-info': click === 3 }" style="border: none;"
                        @click="sortByText">Chữ cái
                    </div>
                </div>
                <div v-for="(item, index) in paginatedItems" :key="index" class="col-6 col-md-4 col-lg-2 my-1">
                    <ItemMovie :movie="item" />
                </div>
            </div>
        </div>
        <div class="text-center">
            <div class="btn btn-primary m-2 px-3 py-2" v-for="(item,index) in totalPages" :key="index"
            :class="{'disabled': pagination.currentPage === item}"
            @click="goToPage(item)">
                {{ item }}
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import phimbo from '@/data/phimbo.json'
import phimle from '@/data/phimle.json'
import phimhoathinh from '@/data/phimhoathinh.json'
import theloai from '@/data/theloai.json'
import quocgia from '@/data/quocgia.json'
import DefaultLayout from '@/components/Default-layout.vue';
import axios from 'axios'
import ItemMovie from '@/components/ItemMovie.vue';
export default {
    props: {
        slug: {
            type: String,
            required: true
        },
        typeSlug: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: false
        },
    },
    components: {
        ItemMovie,
        DefaultLayout
    },
    data() {
        return {
            listFilterMovie: [],
            click: 0,
            pagination: {
                currentPage: 1,
                pageSize: 12,
                totalItems: 0,
            },
            category: this.slug.replace(/-/g, '')
        }
    },
    watch: {
        slug(newSlug) {
            this.listFilterMovie = []
            this.getMovie(newSlug)
            this.click = 0
           
        },
    },
    async created() {
        await this.getMovie()
    },
    computed: {
        paginatedItems() {
            const startIndex = (this.pagination.currentPage - 1) * this.pagination.pageSize;
            const endIndex = startIndex + this.pagination.pageSize;
            return this.listFilterMovie.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.listFilterMovie.length / this.pagination.pageSize);
        },
    },
    methods: {
        // pushMovieToList(data1,data2) {
        //     this.listFilterMovie = []; //clear old data in list 
        //     this.listFilterMovie.push(...data1.data.pageProps.data.items) //link to item
        //     this.listFilterMovie.push(...data2.data.pageProps.data.items) //link to item
        // },
        getMovie() {
            if (this.type === 'category') this.getMovieByCategory()
            else if (this.type === 'country') this.getMovieByCountry()
            else if (this.type === 'new') this.getNewMovie()
            else this.getMovieBySlug()
            console.log(this.listFilterMovie);
        },
        async getNewMovie() {
            const response = await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1`)
            const response2 = await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=2`)
            const response3 = await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=3`)
            this.listFilterMovie.push(...response.data.items)
            this.listFilterMovie.push(...response2.data.items)
            this.listFilterMovie.push(...response3.data.items)
        },
        getMovieBySlug() {
            let response
            if (this.slug === 'phim-bo') response = phimbo
            else if (this.slug === 'phim-le') response = phimle
            else response = phimhoathinh
            this.listFilterMovie = response.items
        },
        getMovieByCategory() {
            const response = theloai[this.slug]
            this.listFilterMovie = response.items
            console.log(this.listFilterMovie);

        },
        getMovieByCountry() {
            const response = quocgia[this.slug]
            this.listFilterMovie = response.items
            console.log(response);
        },
        sortByYearInc() {
            this.listFilterMovie.sort((a, b) => new Date(b.year) - new Date(a.year))
            this.click = 1
            console.log('sort1');
        },
        sortByYearDec() {
            this.listFilterMovie.sort((a, b) => new Date(a.year) - new Date(b.year))
            this.click = 2
            console.log('sort2');

        },
        sortByText() {
            this.listFilterMovie.sort((a, b) => a.name.localeCompare(b.name))
            this.click = 3
            console.log('sort3');
        },
        goToPage(index) {
            this.pagination.currentPage = index
        },
    }
}
</script>

<style>
.clicked {
    background-color: blueviolet;
}
</style>