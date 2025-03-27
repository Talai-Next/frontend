import { LiaHomeSolid } from "react-icons/lia";
import { TbReportAnalytics } from "react-icons/tb";
import { IoColorFillOutline } from "react-icons/io5";

function Header() {

  return (
      <div className='flex flex-col w-full'>
        <div className='mt-5 mb-2 flex justify-center items-center'>
            <h2 className='font-bold'>Talai NEXT</h2>
        </div>
        <div className='my-2 mx-[5px] flex justify-between'>
            <div className='flex flex-col w-[30%] justify-center items-center'>
                <LiaHomeSolid size={36}/>
                <h4>Home</h4>
            </div>
            <div className='flex flex-col w-[30%] justify-center items-center'>
                <TbReportAnalytics size={36}/>
                <h4>Report</h4>
            </div>
            <div className=' flex flex-col w-[30%] justify-center items-center'>
                <IoColorFillOutline size={36}/>
                <h4>Theme</h4>
            </div>
            
        </div>
      </div>
  )
}

export default Header;
