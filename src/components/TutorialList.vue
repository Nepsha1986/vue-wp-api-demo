<template>
    <div class="container mt-3 mb-3">
        <h2 class="mb-3">Check Media Latest Posts</h2>

        <input type="text" class="form-control mb-3" placeholder="Search">

        <table class="table">
            <thead class="thead-inverse">

            <tr>
                <th @click="">#</th>
                <th>Title</th>
                <th>Post</th>
            </tr>

            </thead>
            <tbody>
            <tr v-for="(postData, index) in postsData" :key="index">
                <td><author-data :authorId="postData.author"></author-data></td>
                <td>{{ postData.title.rendered }}</td>
                <td>{{ postData.excerpt.rendered | striphtml }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import AuthorData from "./AuthorData.vue"

    export default {
        name: "TutorialsList",
        data() {
            return {
                postsData: []
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
                        console.log(self.postsData)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },

        computed: {

        }
    }
</script>