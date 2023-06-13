<template>
    <div style="background-color: #02080f">
        <Header />
        <main>
            <slot></slot>
        </main>
        <Footer />
    </div>
</template>


<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
    name: 'DefaultLayout',
    components: {
        Header,
        Footer
    }
}
</script>

<style>
html,
body {
    overflow-y: auto;

}
</style>