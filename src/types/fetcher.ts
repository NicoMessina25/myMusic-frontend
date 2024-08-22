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

export type Fetcher<TEntity> = (entityId?:number, initialProps?:FetchProps)=>FetcherResult<TEntity>

export interface FetcherState<TEntity> {
    data?: TEntity | TEntity[],
    error: TError,
    loading:boolean
}

export const defaultFetcherState = <TEntity>(initialValue?:TEntity[] | TEntity):FetcherState<TEntity> => {
    return {
        data:initialValue,
        error: {
            error:false,
            message:""
        },
        loading: false
    }
}