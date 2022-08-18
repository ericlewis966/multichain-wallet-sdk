interface IResponse {
    [key: string]: any;
}

export const response = (args: IResponse) => {
    return args;
}