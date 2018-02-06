<template>
    <div>
        <h6><a :href="userLink">{{ userName }}</a></h6>
    </div>
</template>

<script>
    export default {
        name: 'AuthorData',
        props: ['authorId'],

        data() {
            return {
                userName: "",
                userLink: ""
            }
        },

        computed: {
            name() {
                return
            }
        },

        mounted() {
            let self = this;

            axios.get("https://4eck-media.de/wp-json/wp/v2/users/" + this.authorId)
                .then(function (response) {
                    self.userName = response.data.name;
                    self.userLink = response.data.link;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
</script>