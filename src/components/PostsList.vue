<template>
    <div class="container pt-3 mb-3" v-cloak>
        <h2 class="mb-3 text-primary">Check Media Latest Posts</h2>

        <input type="text" v-model="search" class="form-control mb-3" placeholder="Search">

        <ul class="list-group" v-if="filteredList.length > 0">
            <li class="list-group-item mb-2" v-for="(postData, index) in filteredList" :key="index">

                <h4 class="text-primary">{{ postData.title.rendered | striphtml }}</h4>

                <span class="d-block mb-3">{{ postData.content.rendered | striphtml | makeExcerpt }}</span>

                <span class="d-block mb-3">
                    <small>Published: {{ postData.modified | formatDate}}</small>
                </span>

                <button class="btn btn-primary" @click.prevent="showPost(postData)">Read</button>
            </li>
        </ul>

        <div v-else>
            <h5>Sorry no posts matched your criteria...</h5>
        </div>

        <transition name="slide-from-top">
            <active-single-post
                    @onCloseCurrentPost="closeCurrentPost"
                    v-if="isActiveSinglePostToShow"
                    :post="singlePostToShow">
            </active-single-post>
        </transition>
    </div>
</template>

<script>
    import ActiveSinglePost from "./ActiveSinglePost.vue"
    import config from '../config.js'

    export default {
        name: "PostsList",

        data() {
            return {
                search: '',
                postsData: [],
                singlePostToShow: {},

                isActiveSinglePostToShow: false
            }
        },

        components: {
            ActiveSinglePost
        },

        beforeMount() {
            this.fetchPostData(`${config.API_URI}/wp-json/wp/v2/posts?per_page=${config.POSTS_PER_PAGE}`)
        },

        methods: {
            fetchPostData(url) {
                let self = this;

                axios.get(url)
                    .then(function (response) {
                        self.postsData = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            showPost(post) {
                this.isActiveSinglePostToShow = true;
                this.singlePostToShow = post;
            },

            closeCurrentPost() {
                this.isActiveSinglePostToShow = false;
            }
        },

        computed: {
            filteredList() {
                return this.postsData.filter(post => {
                    let hasTextInTitle = post.title.rendered.toLowerCase().includes(this.search.toLowerCase());
                    let hasTextInContent = post.content.rendered.toLowerCase().includes(this.search.toLowerCase());
                    return hasTextInTitle || hasTextInContent;
                })
            }
        }
    }
</script>

<style>
    img {
        width: 100% !important;
        height: auto;
        display: block;
    }

    .slide-from-top-enter-active, .slide-from-top-leave-active {
        transition: .5s;
    }

    .slide-from-top-enter {
        top: -100%;
        opacity: 0;
    }

    .slide-from-top-leave-to {
        top: 100%;
        opacity: 0;
    }
</style>