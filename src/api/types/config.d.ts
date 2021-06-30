export interface ConfigData {
    env:        string;
    port:       number;
    mongoDB:    MongoDB
}

export interface MongoDB {
    url:        string;
    username:   string;
    password:   string;
    database:   string;
}