import './scripts/init-partner';
declare type CreateCasServices = {
    casURI: string;
    partnerId: string;
};
declare const createCasServices: ({ casURI, partnerId }: CreateCasServices) => {
    loginService: (credentials: {
        login: string;
        password: string;
    }) => any;
    signUpService: (payload: any) => any;
};
export default createCasServices;
