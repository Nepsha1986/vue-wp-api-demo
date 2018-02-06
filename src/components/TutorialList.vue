<template>
    <div class="container mt-3 mb-3">
        <h2 class="mb-3">Check Media Latest Posts</h2>

        <input type="text" v-model="search" class="form-control mb-3" placeholder="Search">

        <table class="table" v-if="filteredList.length > 0">
            <thead class="thead-inverse">

            <tr>
                <th>Author</th>
                <th>Title</th>
                <th>Post</th>
            </tr>

            </thead>
            <tbody>
            <tr v-for="(postData, index) in filteredList" :key="index">
                <td>
                    <author-data :authorId="postData.author"></author-data>
                    <span><small>Published: {{ postData.modified | formatDate}}</small></span>
                </td>
                <td>{{ postData.title.rendered | striphtml }}</td>
                <td>{{ postData.excerpt.rendered | striphtml | adddots }} <a :href="postData.link">Read More</a></td>
            </tr>
            </tbody>
        </table>

        <div v-else>
            <h5>Sorry no posts found on your creterea!</h5>
        </div>
    </div>
</template>

<script>
    import AuthorData from "./AuthorData.vue"

    export default {
        name: "TutorialsList",

        data() {
            return {
                search: '',
                postsData: [],
            }
        },

        components: {
            AuthorData
        },

        beforeMount() {
            this.fetchPostData('https://4eck-media.de/wp-json/wp/v2/posts?per_page=3')
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
            }
        },

        computed: {
            filteredList() {
                return this.postsData.filter(post => {
                    let hasTextInTitle = post.title.rendered.toLowerCase().includes(this.search.toLowerCase());
                    let hasTextInText = post.content.rendered.toLowerCase().includes(this.search.toLowerCase());
                    return  hasTextInTitle || hasTextInText;
                })
            }
        }
    }
</script>