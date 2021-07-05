export interface User {
    token: string
    user: {
        name: string,
        username: string,
        api_key: string,
        mock_auth_token: string
    }
}