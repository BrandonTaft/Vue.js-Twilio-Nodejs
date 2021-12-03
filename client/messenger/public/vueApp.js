const vm = new Vue({
    el: '#list',
    data: {
        results: {}
    },
    mounted() {
        axios.get("http://localhost:1337/api/reminders").then(response => {
            this.results = response.data
        })
    }
});

