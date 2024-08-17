import React, { Key, useEffect, useRef, useState } from "react";
import {Autocomplete, AutocompleteItem, MenuTriggerAction} from "@nextui-org/react";
import { Indexable } from "@/types/indexable";
import { Fetcher } from "@/types/fetcher";
import { Combobox, CommonComboboxProps } from "../Combobox/Combobox";
import useSearcher from "@/hooks/useSearcher";

interface DynamicComboboxProps<TItem extends Indexable> extends CommonComboboxProps<TItem>{
  useFetcher:Fetcher<TItem>
}

export function DynamicCombobox<TItem extends Indexable>({useFetcher, ...props}:Readonly<DynamicComboboxProps<TItem>>) {
  const {data: items, loading, refetch} = useFetcher()
  const [filter, setFilter] = useState<string>("");
  useSearcher({fetch: refetch, filterValue: filter})

  if(!(items instanceof Array)) return

  return <Combobox {...props} items={items} onInputChange={(value) => {
    props.onInputChange?.(value)
    setFilter(value)
  }} isLoading={loading} />
}