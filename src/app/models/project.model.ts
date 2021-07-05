export interface ProjectModel {
    id: Number,
    project_name: string,
    APIs: APIsModel[]
}

export interface APIsModel {
    id: Number,
    title: string,
    url: string,
    method: string,
    auth_require: boolean,
    input_json: string,
    success_json: string,
    failed_json: string
}