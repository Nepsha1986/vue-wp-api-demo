<template>
    <div>
        <h2>Tutorial list</h2>

        <table class="table">
            <thead class="thead-inverse">
            <tr>
                <th>#</th>
                <th>{{ test }}</th>
                <th>Last Name</th>
                <th>Username</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "TutorialsList",
        data() {
            return {
                test: 'test'
            }
        },

        beforeMount() {
            fetchData()
        },

        methods: {
            fetchData(url) {
                console.log()
            }
        }
    }
</script>