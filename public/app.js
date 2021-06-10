new Vue({
    el: '#app',
    data () {
        return {
            videos: [],
            loader: false,
            fallback: true,
            view: false,
        }
    },
    methods: {
        async getVideos() {
            this.loader = true
            await axios.get(`http://localhost:5000/api/videos`).then((response) => {
                if (response.status == 200) {
                    window.setTimeout(() => {
                        this.loader = false
                        this.videos = response.data                    
                        window.setTimeout(() => {
                            this.videos = response.data
                            this.fallback = false
                            this.view = true
                        }, 2000)
                    }, 3000)
                }
            })
        }
    },
    created() {
        this.getVideos()
    },
})