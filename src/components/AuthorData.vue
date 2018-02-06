<template>
    <div>
        <h6><a :href="userLink">{{ userName }}</a></h6>
    </div>
</template>

<script>
    import config from '../config.js';

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

            axios.get(`${config.API_URI}/wp-json/wp/v2/users/` + this.authorId)
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