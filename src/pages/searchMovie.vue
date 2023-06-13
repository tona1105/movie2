<template>
    <DefaultLayout>
        <div class="container" style="overflow: hidden;">
            <div class="row">
                <h3 class="text-center text-light">Danh sách phim</h3>
                <div>
                    <h3 class="text-light" style="display: block;">Sắp xếp theo:</h3>
                    <div class="btn btn-primary mb-2" :class="{ 'btn-info': click === 1 }" style="border: none;"
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
                <div v-for="(item, index) in paginatedItems" :key="index" class="col-6 col-md-4 col-lg-3 my-1">
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
import axios from 'axios'
import ItemMovie from '@/components/ItemMovie.vue';
import DefaultLayout from '@/components/Default-layout.vue';
export default {
    props: {
        keyword: {
            type: String,
            required: true
        }
    },
    components: {
        ItemMovie,
        DefaultLayout
    },
    data() {
        return {
            listSearchMovie: [],
            pagination: {
                currentPage: 1,
                pageSize: 12,
                totalItems: 0,
            },
            click: 0
        }
    },
    watch: {
        keyword(newKey) {
            this.getMovieByKeyWord(newKey)
            click = 0
        }
    },
    computed: {
        paginatedItems() {
            const startIndex = (this.pagination.currentPage - 1) * this.pagination.pageSize;
            const endIndex = startIndex + this.pagination.pageSize;
            return this.listSearchMovie.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.listSearchMovie.length / this.pagination.pageSize);
        },
    },
    async created() {
        await this.getMovieByKeyWord()
    },
    methods: {
        async getMovieByKeyWord() {
            const response = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/tim-kiem.json?keyword=${this.keyword}`)
            const response2 = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/tim-kiem.json?page=2&keyword=${this.keyword}`)
            this.listSearchMovie.push(...response.data.pageProps.data.items)
            this.listSearchMovie.push(...response2.data.pageProps.data.items)
        },
        sortByYearInc() {
            this.listSearchMovie.sort((a, b) => new Date(b.year) - new Date(a.year))
            this.click = 1
        },
        sortByYearDec() {
            this.listSearchMovie.sort((a, b) => new Date(a.year) - new Date(b.year))
            this.click = 2

        },
        sortByText() {
            this.listSearchMovie.sort((a, b) => a.name.localeCompare(b.name))
            this.click = 3
        },
        goToPage(index) {
            this.pagination.currentPage = index
        },
    }
}
</script>