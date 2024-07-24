export interface TError {
    error:boolean,
    message?:string
}

export type FetchProps = {
    limit?: number,
    offSet?:number,
    filter?:string
}

export type FetcherResult<TEntity> = {data: TEntity[] | TEntity | undefined, loading: boolean, error: TError, refetch: (props?:FetchProps)=>void}

export type Fetcher<TEntity> = (entityId?:number)=>FetcherResult<TEntity>