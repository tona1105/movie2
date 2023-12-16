<template>
    <div>
        <b-navbar class="navbar header-bg navbar-light navbar-expand header-bg">
            <b-navbar-nav class="mx-sm-1 mx-md-2 mx-lg-5">
                <b-navbar-brand href="/">
         
                    WEB PHIM
                </b-navbar-brand>
                <b-navbar-brand class="search position-relative px-2">
                    <font-awesome-icon class="text-light search-icon" icon="fa-solid fa-magnifying-glass" />
                    <b-form-input v-model="searchInput" placeholder="Nhập phim muốn tìm" class="form-input"
                        @keyup.enter="searchMovie(searchInput)" required />
                    <!-- <button @click="searchMovie(searchInput)"></button> -->
                </b-navbar-brand>
            </b-navbar-nav>

            <b-navbar-nav class="menu-bars text-light">
                <font-awesome-icon icon="fa-solid fa-bars" style="font-size: 1.5rem;" />
                <b-navbar-nav class="ml-auto header-menu">
                    <router-link
                        :to="{ name: 'movie-list', params: { slug: 'phim-moi', name: 'phim mới cập nhật', type: 'new' } }"
                        style="text-decoration: none;">
                        <div class="nav-link text-light header-item  mx-md-2 mx-lg-3">Phim mới</div>
                    </router-link>
                    <router-link :to="{ name: 'movie-list', params: { slug: 'phim-bo', name: 'phim bộ' } }"
                        style="text-decoration: none;">
                        <div class="nav-link text-light header-item mx-md-2 mx-lg-3">Phim bộ</div>
                    </router-link>
                    <router-link :to="{ name: 'movie-list', params: { slug: 'phim-le', name: 'phim lẻ' } }"
                        style="text-decoration: none;">
                        <div class="nav-link text-light header-item mx-md-2 mx-lg-3">Phim lẻ</div>
                    </router-link>
                    <router-link :to="{ name: 'movie-list', params: { slug: 'hoat-hinh', name: 'phim hoạt hình' } }"
                        style="text-decoration: none;">
                        <div class="nav-link text-light header-item mx-md-2 mx-lg-3">Hoạt hình</div>
                    </router-link>
                    <b-nav-item-dropdown text="Thể loại" class="header-item mx-md-2 mx-lg-3 text-light">
                        <div class="row menu-type" style="width: 500px;">
                            <b-dropdown-item class="col-4" v-for="(category, index) in category" :key="index" href=""
                                :id="category.slug" @click="goToMovieListByCategory(category.slug, category.name)">
                                {{ category.name }}
                            </b-dropdown-item>
                        </div>

                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown text="Quốc gia" class="header-item mx-md-2 mx-lg-3">
                        <div class="row menu-country" style="width: 500px;">
                            <b-dropdown-item class="col-4" v-for="(country, index) in country" :key="index" href=""
                                @click="goToMovieListByCountry(country.slug, country.name)">
                                {{ country.name }}
                            </b-dropdown-item>
                        </div>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-navbar-nav>

        </b-navbar>

    </div>
</template>

<script>
export default {
    data() {
        return {
            category: [
                {
                    name: 'Viễn tưởng',
                    slug: 'vien-tuong'
                },
                {
                    name: 'Cổ trang',
                    slug: 'co-trang'
                },
                {
                    name: 'Tình cảm',
                    slug: 'tinh-cam'
                },
                {
                    name: 'Hài hước',
                    slug: 'hai-huoc'
                },
                {
                    name: 'Chiến tranh',
                    slug: 'chien-tranh'
                },
                {
                    name: 'Tâm lý',
                    slug: 'tam-ly'
                },
                {
                    name: 'Hình sự',
                    slug: 'hinh-su'
                },
                {
                    name: 'Thể thao',
                    slug: 'the-thao'
                },
                {
                    name: 'Võ thuật',
                    slug: 'vo-thuat'
                },
                {
                    name: 'Phiêu lưu',
                    slug: 'phieu-luu'
                },
                {
                    name: 'Khoa học',
                    slug: 'khoa-hoc'
                },
                {
                    name: 'Âm nhạc',
                    slug: 'am-nhac'
                },
                {
                    name: 'Tài liệu',
                    slug: 'tai-lieu'
                },
                {
                    name: 'Gia Đình',
                    slug: 'gia-dinh'
                },
                {
                    name: 'Chính kịch',
                    slug: 'chinh-kich'
                },
                {
                    name: 'Bí ẩn',
                    slug: 'bi-an'
                },
                {
                    name: 'Học đường',
                    slug: 'hoc-duong'
                },
            ],
            country: [
                {
                    name: 'Hàn Quốc',
                    slug: 'han-quoc'
                },
                {
                    name: 'Brazil',
                    slug: 'brazil'
                },
                {
                    name: 'Nhật Bản',
                    slug: 'nhat-ban'
                },
                {
                    name: 'Thái Lan',
                    slug: 'thai-lan'
                },
                {
                    name: 'Âu Mỹ',
                    slug: 'au-my'
                },
                {
                    name: 'Đài Loan',
                    slug: 'dai-loan'
                },
                {
                    name: 'Hồng Kông',
                    slug: 'hong-kong'
                },
                {
                    name: 'Ấn Độ',
                    slug: 'an-do'
                },
                {
                    name: 'Anh',
                    slug: 'anh'
                },
                {
                    name: 'Pháp',
                    slug: 'phap'
                },
                {
                    name: 'Canada',
                    slug: 'canada'
                },
                {
                    name: 'Nga',
                    slug: 'nga'
                },
                {
                    name: 'Thụy Điển',
                    slug: 'thuy-dien'
                },
                {
                    name: 'Quốc gia khác',
                    slug: 'quoc-gia-khac'
                },
            ],
            searchInput: ''
        }
    },
    methods: {
        searchMovie(keyword) {
            this.$router.push({ name: 'search-movie', params: { keyword: keyword } })
        },
        goToMovieListByCategory(slug, name) {
            this.$router.push({ name: 'movie-list', params: { slug: slug, typeSlug: 'thể loại', name: name, type: 'category' } })
        },
        goToMovieListByCountry(slug, name) {
            this.$router.push({ name: 'movie-list', params: { slug: slug, typeSlug: 'nước', name: name, type: 'country' } })
        }

    }
}
</script>

<style>
.header-bg {

}

.header-bg .dropdown-menu {
    background-color: #0f172a;
}

.header-bg .navbar-nav .show>.nav-link {
    color: #0258d1;
}

.header-bg .dropdown-item:hover {
    background-color: #8B5CF6;
}

.navbar-expand {
    justify-content: space-between !important;
}

.navbar-brand {
    color: #B7BEC8 !important;
}

.nav-item a {
    color: #fff;
}

.nav-link:focus {
    color: #B7BEC8
}

.nav-item:hover .nav-link {
    color: #0258d1;
}

.header-item .dropdown-menu {
    right: -50px;
}

@media screen and (min-width : 320px) and (max-width: 767px) {
    .form-input {
        position: absolute;
        display: none;
        width: 200px;
        border: 1px solid #ccc;
    }

    .search:hover .form-input, .search:active .form-input {
        display: block !important;
        z-index: 2;
    }

    .header-menu {
        display: none;
        background-color: #0f172a;
        border: 1px solid #ccc;
        position: absolute;
        top: 30px;
        right: 0;
        z-index: 10;
    }
    .header-item .dropdown-menu {
    right: -12px;
}
    .navbar-expand {
        justify-content: space-between !important;
        margin-left: 0.5rem;
    }

    .menu-bars {
        display: block;
        position: relative;
        left: -0.5rem;
        padding: 2px;
    }

    .menu-bars:hover .header-menu, .menu-bars:active .header-menu {
        display: block;
    }

    .menu-type, .menu-country {
        width: 400px !important;
    }
}

@media only screen and (min-width : 768px) and (max-width: 991px) {
    .form-input {
        position: absolute;
        display: none;
        width: 200px;
        border: 1px solid #ccc;
    }

    .navbar-expand {
        justify-content: center !important;
    }

    .search:hover .form-input, .search:active .form-input  {
        display: block !important;
    }
    .menu-bars .fa-bars {
        display: none;
    }
}

@media screen and (min-width : 992px) {
    .search-icon {
        display: none;
    }
    .menu-bars .fa-bars {
        display: none;
    }

}
</style>
