import React, { Key, useEffect } from "react";
import {Autocomplete, AutocompleteItem, MenuTriggerAction} from "@nextui-org/react";
import { Indexable } from "@/types/indexable";
import { InputProps } from "@/types/input";
import { Label } from "../Labels/Label/Label";
import { useFilter } from "@react-aria/i18n";
import { Button } from "../ui/button";

export interface CommonComboboxProps<TItem extends Indexable> extends InputProps{
  optionLabel:keyof TItem,
  keyField: keyof TItem,
  notFoundText:string,
  value: TItem | undefined,
  onChange: (i:TItem|undefined) => void,
  onInputChange?:(value:string) => void,
  allowsCustomValue?:boolean
  addCustomValueButtonLabel?: string
  onAddCustomValue?:(i:string) => void,
  isLoading?:boolean
}

interface ComboboxProps<TItem extends Indexable> extends CommonComboboxProps<TItem> {
  items: TItem[],
}

export function Combobox<TItem extends Indexable>({items,placeholder = "",optionLabel,keyField,label="",notFoundText,onChange,error,value,className="",required, ariaLabel = "", onInputChange, allowsCustomValue, addCustomValueButtonLabel, onAddCustomValue, isLoading}:Readonly<ComboboxProps<TItem>>) {
  const [fieldState, setFieldState] = React.useState<{
    selectedKey: string | null,
    inputValue: string,
    items: TItem[]
  }>({
    selectedKey: "",
    inputValue: "",
    items,
  });

  useEffect(()=>{
    setFieldState({...fieldState, items})
  },[items.length])

  useEffect(()=>{
    (!value || !value[optionLabel]) && setFieldState({...fieldState, inputValue:""})
  },[value?.[optionLabel]])

  // Implement custom filtering logic and control what items are
  // available to the Autocomplete.
  const {startsWith} = useFilter({sensitivity: "base"});

  // Specify how each of the Autocomplete values should change when an
  // option is selected from the list box
  const onSelectionChange = (key:string) => {
    setFieldState((prevState) => {
      let selectedItem = prevState.items.find((option) => option[keyField] === key);

      return {
        inputValue: selectedItem?.[optionLabel] ?? "",
        selectedKey: "",
        items: items.filter((item) => startsWith(item[optionLabel], selectedItem?.[optionLabel] || "")),
      };
    });
  };

  // Specify how each of the Autocomplete values should change when the input
  // field is altered by the user
  const _onInputChange = (value:string) => {
    onInputChange?.(value)
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKey: value === "" ? null : prevState.selectedKey,
      items: items.filter((item) => startsWith(item[optionLabel], value)),
    }));
  };

  // Show entire list if user opens the menu manually
  const onOpenChange = (isOpen:boolean, menuTrigger:MenuTriggerAction) => {
    if (menuTrigger === "manual" && isOpen) {
      setFieldState((prevState) => ({
        inputValue: prevState.inputValue,
        selectedKey: prevState.selectedKey,
        items,
      }));
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Autocomplete
        isLoading={isLoading}
        items={fieldState.items}
        aria-label={ariaLabel}
        label={label && <Label className='font-semibold mb-1' text={label} required={required} />}
        placeholder={placeholder}
        className={`max-w-xs ${className}`}
        labelPlacement="outside"
        variant="bordered"
        isInvalid={!!error}
        errorMessage={error}
        selectedKey={fieldState.selectedKey}
        inputValue={value?.[optionLabel] || fieldState.inputValue}
        onInputChange={_onInputChange}
        onOpenChange={onOpenChange}
        allowsCustomValue={allowsCustomValue}
        onSelectionChange={(key)=>{
          if(key || !allowsCustomValue){
            onChange(items.find(i => i[keyField] == key))
            onSelectionChange(key?.toString() ?? "")
          }
        }}
        listboxProps={{
          emptyContent: notFoundText
        }}
      >
        {(item) => <AutocompleteItem key={item[keyField]}>{item[optionLabel]}</AutocompleteItem>}
      </Autocomplete>
      {onAddCustomValue && <Button variant='outline' type='button' disabled={!fieldState.inputValue || fieldState.items.length > 0} onClick={() => {
        onAddCustomValue(fieldState.inputValue)
      }} >{addCustomValueButtonLabel}</Button>}
    </div>
    
  );
}