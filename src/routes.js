import index from './pages/index.vue'
const filterMovie = () => import('./pages/FilterMovie.vue')
const movieDetail = () => import('./pages/movieDetail.vue')
const movieWatch = () => import('./pages/movieWatch.vue')
const searchMovie = () => import('./pages/searchMovie.vue')
export default [
    {
        path: '/',
        component: index
    },
    {
        path: '/phim/:slug',
        name: 'movie-detail',
        component: movieDetail,
        props: true
    },
    {
        path: '/phim/:slug/tap-:ep',
        name: 'movie-watch',
        component: movieWatch,
        props: true
    },
    {
        path: '/danh-sach/:slug',
        name: 'movie-list',
        component: filterMovie,
        props: true
    },
    {
        path: '/tim-kiem/:keyword',
        name: 'search-movie',
        component: searchMovie,
        props: true
    },
]