import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from '@/components/ui/button';
const SettingPage = () => {
  return (
    <div className="flex w-full h-screen bg-[radial-gradient(circle_at_top_left,#0096FF52,#FFDE6A42)] overflow-hidden justify-center">
      
      <div className='flex flex-col bg-white w-[25rem] h-[15rem] rounded-xl shadow-xl mt-24'>
        <div className='my-10 mx-10'>
      ตั้งค่า
      <Select>
        <SelectTrigger className="w-[80%] bg-white mt-5">
          <SelectValue placeholder="เปลี่ยนภาษา" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem className="hover:bg-gray-100 "value="thai">ภาษาไทย</SelectItem>
          <SelectItem className="hover:bg-gray-100" value="eng">ภาษาอังกฤษ</SelectItem>
        </SelectContent>
      </Select>
      <div className='flex mt-5 items-center'>
        <Switch /> 
        <h3 className='px-3'>โหมดกลางคืน</h3>
      </div>
      <div className='flex mt-5 gap-3'>
        <Button className="bg-white text-[#0096FF] hover:bg-[#c8d4e0]">ยกเลิก</Button>
        <Button className="bg-[#0096FF] text-white hover:bg-[#507fb0]">ตกลง</Button>
      </div>
      
      </div>

      </div>
    </div>
    
  )
}

export default SettingPage