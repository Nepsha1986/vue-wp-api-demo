<template>
    <div class="container pt-3 mb-3" v-cloak>
        <h2 class="mb-3">Check Media Latest Posts</h2>

        <input type="text" v-model="search" class="form-control mb-3" placeholder="Search">

        <ul class="list-group" v-if="filteredList.length > 0">
            <li class="list-group-item" v-for="(postData, index) in filteredList" :key="index">
                <div>
                    <author-data :authorId="postData.author"></author-data>
                    <span><small>Published: {{ postData.modified | formatDate}}</small></span>
                </div>
                <div>{{ postData.title.rendered | striphtml }}</div>
                <div>
                    <span class="d-block mb-3">{{ postData.content.rendered | striphtml | makeExcerpt }}</span>
                    <button class="btn btn-primary" @click.prevent="showPost(postData)">Read</button>
                </div>
            </li>
        </ul>

        <div v-else>
            <h5>Sorry no posts matched your criteria...</h5>
        </div>

        <transition name="slide-from-right">
            <active-single-post
                    @onCloseCurrentPost="closeCurrentPost"
                    v-if="isActiveSinglePostToShow"
                    :post="singlePostToShow">
            </active-single-post>
        </transition>
    </div>
</template>

<script>
    import AuthorData from "./AuthorData.vue"
    import ActiveSinglePost from "./ActiveSinglePost.vue"

    export default {
        name: "TutorialsList",

        data() {
            return {
                search: '',
                postsData: [],
                singlePostToShow: {},

                isActiveSinglePostToShow: false
            }
        },

        components: {
            AuthorData,
            ActiveSinglePost
        },

        beforeMount() {
            this.fetchPostData('https://4eck-media.de/wp-json/wp/v2/posts')
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

    .slide-from-right-enter-active, .slide-from-right-leave-active {
        transition: .5s;
    }

    .slide-from-right-enter {
        right: -100%;
        opacity: 0;
    }

    .slide-from-right-leave-to {
        left: -100%;
        opacity: 0;
    }
</style>