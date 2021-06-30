export interface JWTToken {
    access: AccessToken;
    refresh: RefreshToken;
}

export interface AccessToken {
    token: string;
    expires: Date;
}

export interface RefreshToken {
    token: string;
    expires: Date;
}