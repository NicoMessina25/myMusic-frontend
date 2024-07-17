export const requiredMessage = 'Campo requerido'

export type FormProps<T> = {
    onSubmit: (e:T)=>void,
    onCancel?: ()=>void,
    initialValue?: T
}

export type EditProps = {
    params:{ id?: number}
}