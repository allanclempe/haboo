export interface IAction<T> {
    errors: { [key: string]: string };
    isFetching: boolean;
}
