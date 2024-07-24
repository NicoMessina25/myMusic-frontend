import React, { Key, useEffect, useRef, useState } from "react";
import {Autocomplete, AutocompleteItem, MenuTriggerAction} from "@nextui-org/react";
import { Indexable } from "@/types/indexable";
import { Fetcher } from "@/types/fetcher";
import { Combobox, CommonComboboxProps } from "../Combobox/Combobox";

interface DynamicComboboxProps<TItem extends Indexable> extends CommonComboboxProps<TItem>{
  useFetcher:Fetcher<TItem>
}

export function DynamicCombobox<TItem extends Indexable>({useFetcher, ...props}:Readonly<DynamicComboboxProps<TItem>>) {
  let filterTimeout: any = useRef(null)
  const {data: items, loading, refetch} = useFetcher()
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    filterTimeout.current = setTimeout(() => { refetch({filter}) }, 500)
    return () => filterTimeout.current && clearTimeout(filterTimeout.current)
  }, [filter])

  if(!(items instanceof Array)) return

  return <Combobox {...props} items={items} onInputChange={(value) => {
    props.onInputChange?.(value)
    setFilter(value)
  }} isLoading={loading} />
}