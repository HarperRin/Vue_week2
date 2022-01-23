import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'hlin-hexschool',
            products: [],
            temp: {}
        }
    },
    methods: {
        checkAdmin() {
            const api = `${this.url}/api/user/check`;
            axios.post(api)
                // 如果是登入狀態才允許發出this.getData請求，取得產品資料，並把資料推到data的products
                // 如果不是登入狀態會跳出警示，並將使用者導回登入頁面
                .then(() => {
                    this.getData();
                })
                .catch((err) => {
                    alert(err.data.message);
                    window.location = 'index.html';
                })
        },
        getData() {
            const api = `${this.url}/api/${this.path}/admin/products`;
            axios.get(api)
                .then((res) => {
                    this.products = res.data.products;
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        }
    },
    created() {
        // 從cookie裡面取得token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // 下次發送axios時，會自動把token夾帶到headers裡面
        axios.defaults.headers.common['Authorization'] = token;
        // 確認是否為登入狀態
        this.checkAdmin();
    }
}).mount('#appProducts');