export interface Account {
    
    email? :string;
    username? :string;
    password? :string;
    details? : AccountDetails;
    accessToken? :string;
    expiresIn? :any;
}

export interface AccountDetails {

    gender?: string;
    orientation?: string;
    role?: string;
    age?: Date;
    lookingFor?: string;
    about?: string;
}