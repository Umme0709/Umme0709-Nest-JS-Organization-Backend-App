export type CreateCategoryParams = {
    name: string;
    description: string;    
}

export type UpdateCategoryParams = {
    name: string;
    description: string;    
}

export type UpdateUserParams = {
    email: string;
    password: string;

};

export type CreateUserProfileParams = {
    firstName: string;
    lastName: string;
    age: number;
    dob: string;
    bloodGroup: string;
    category: any;

};


export type UpdateUserProfileParams = {
    firstName: string;
    lastName: string;
    age: number;
    dob: string;
    bloodGroup: string;
    category: any;

};


export type CreateClassParams = {
    name: string;
    description: string;
    user: any; 

};


export type UpdateClassParams = {
    name: string;
    description: string;
    user: any; 

};


export type CreateSubjectParams = {
    bookName: string;
    description: string;
    class: any;

};


export type UpdateSubjectParams = {
    bookName: string;
    description: string;
    class: any;
};