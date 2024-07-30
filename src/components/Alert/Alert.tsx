 

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from './Alert.module.scss' 
import { IAlert } from "@/types/alert";
import { deleteAlert } from "@/redux/slices/alertSlice";
import { colors } from "@/types/color";

export const Alert = (alert:IAlert) => {
  const {message="",color="cyan",title,icon} = alert;
  const dispatch = useDispatch();
  
  const onClose = () =>{
    dispatch(deleteAlert(alert))
  }

  useEffect(()=>{
    setTimeout(onClose,3000)
  },[])

  return <div key={title} className={`flex px-3 py-7 items-center justify-between ${colors[color].bg} rounded-lg border ${colors[color].border} ${style.alert}`}>
        {icon && <Icon icon={icon} className={`${colors[color].text700} text-2xl`} />}
        <div className={`flex flex-col flex-grow ml-5`}>
          <p className={`font-semibold ${colors[color].text800}`}>{title}</p>  
          <p className={`text-sm ${colors[color].text700}`}>{message}</p>
        </div>
        <Icon
            icon={'tabler:x'}
            onClick={onClose}
            className={`${colors[color].text700} text-2xl`}
            style={{ cursor: "pointer" }}
        />
    </div>;
};