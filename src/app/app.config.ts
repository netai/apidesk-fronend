export class AppConfig {

    public static API_BASE_URL = 'http://localhost:5000/api';
    public static MOCK_API_BASE_URL = 'http://localhost:5000/mokapi/';

    public static API_RESOURCE = {
        LOGIN: '/login',
        SIGNUP: '/signup',
        GET_PROJECT: '/mock_project',
        ADD_PROJECT: '/mock_project/add',
        ADD_API: '/<PROJECT-ID>/mock_api/add',
    }
}