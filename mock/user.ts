import {MockMethod} from "vite-plugin-mock";
import {ResultData, ResultPage} from "../src/api";

const user = [
    {
        url: "/api/user/info",
        method: "get",
        response: () => {
            return {
                code: 200,
                success: true,
                message: "操作成功",
                data: {
                    id: 1,
                    name: "张三",
                    username: "admin",
                    avatar: "https://avatars.githubusercontent.com/u/44080404?v=4",
                }
            } as ResultData
        }
    },
    {
        url: "/api/user/list",
        method: "get",
        response: () => {
            return {
                code: 200,
                success: true,
                message: "操作成功",
                data: {
                    rows: [
                        {
                            id: 1,
                            name: "张三",
                            username: "admin",
                            avatar: "https://avatars.githubusercontent.com/u/44080404?v=4",
                        },
                        {
                            id: 2,
                            name: "李四",
                            username: "lisi",
                            avatar: "https://avatars.githubusercontent.com/u/44080404?v=4",
                        },
                        {
                            id: 3,
                            name: "王五",
                            username: "wangwu",
                            avatar: "https://avatars.githubusercontent.com/u/44080404?v=4",
                        },
                        {
                            id: 4,
                            name: "赵六",
                            username: "zhaoliu",
                            avatar: "https://avatars.githubusercontent.com/u/44080404?v=4",
                        },
                        {
                            id: 5,
                            name: "孙七",
                            username: "sunqi",
                            avatar: "https://avatars.githubusercontent.com/u/44080404?v=4",
                        },
                        {
                            id: 6,
                            name: "周八",
                            username: "zhouba",
                            avatar: "https://avatars.githubusercontent.com/u/44080404?v=4",
                        },
                        {
                            id: 7,
                            name: "吴九",
                            username: "wujui",
                            avatar: "https://avatars.githubusercontent.com/u/44080404?v=4",
                        },
                        {
                            id: 8,
                            name: "郑十",
                            username: "zhengshi",
                            avatar: "https://avatars.githubusercontent.com/u/44080404?v=4",
                        }
                    ],
                    total: 8
                }
            } as ResultPage
        }
    }
] as MockMethod[]

export default user
