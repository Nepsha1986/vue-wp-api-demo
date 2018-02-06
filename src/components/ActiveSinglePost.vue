<template>
    <div class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click.prevent="$emit('onCloseCurrentPost')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <h2 v-html="title"></h2>
                    <div class="post-content" v-html="content"></div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click.prevent="$emit('onCloseCurrentPost')">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'activeSinglePost',

        props: ['post'],

        computed: {
            title() {
                return this.post.title.rendered
            },

            content() {
                return this.post.content.rendered
            }
        }
    }
</script>

<style scoped>
    .modal {
        background: rgba( 0,0,0,0.6);
        position: absolute;
        bottom: unset;
        overflow: unset;
        display: block;
        min-height: 100%;
    }

    .modal-dialog {
        max-width: 800px;
    }
</style>