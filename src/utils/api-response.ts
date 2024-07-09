class APIResponse<T> {
    constructor(
        public success: boolean,
        public message: string,
        public data: T,
    ) {}
}
export default APIResponse;
