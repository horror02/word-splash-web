import WordInstance from "../../../setup/axios/WordInstance";

export async function loginAuth(username = "", password = "") {
    const response = await WordInstance.post("/v1/user/login", {
        username: username,
        password: password
    });

    return response.data;
}