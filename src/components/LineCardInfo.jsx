import { Box, Card, CardActions, CardContent} from '@mui/material';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from 'react';
import { GoAlertFill } from "react-icons/go";

function LineCardInfo({data, line, isDisable}){
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        // Toggle visibility of the next CardContent
        console.log(`open card`);
        setIsOpen(!isOpen);
      };
    return(
        <div >
            <Box >
                <Card className='shadow-none' elevation={0} >
                    <CardContent 
                        onClick={() => handleClick()}
                            className={`flex flex-col bg-[#B4D4C3] cursor-pointer rounded-3xl hover:bg-[#9BC0AD] ${isDisable == true ? "opacity-30" : "opacity-100"}`}
                    >
                        <div className='flex py-3 px-5 justify-between items-center'>
                            <div className='w-full'>
                                <h2 className='font-semibold'>สาย {line}</h2>
                                {isDisable == true ? (
                                    <div className='flex justify-between'>
                                            <p className='mt-2 text-red-700'>สายนี้ไม่ผ่านป้ายทีอยู่ใกล้ที่สุดของคุณ</p>
                                        <div className='px-5'>
                                            <GoAlertFill 
                                                color='red'
                                                size={30}/>
                                        </div>
                                    </div>
                                ):
                                    <p className='mt-2'>12 นาทีถึงที่ที่คุณอยู่</p>
                                }
                            </div>
                            <div>
                                {isOpen ? (
                                    <MdKeyboardArrowRight size={48}/>
                                ) : 
                                    <MdKeyboardArrowDown size={48}/>}
                            </div>
                        </div>
                    </CardContent>
                <div className={` mt-2 px-5 transition-all duration-500 ease-in-out ${isOpen ? "max-h-[3500px]" : "max-h-0"}`}>
                {data.map((stop, index) => (
                    <CardContent sx={{ mt: 0, padding: "0 !important" }} className="flex h-36 items-center">
                        {/* Timeline Column */}
                        <div className="flex flex-col flex-1 items-center w-[50px] h-full">
                            {/* Top Line */}
                            <div className="w-[4px] flex-1 bg-[#19854B]"></div>
                            {/* Stop Circle */}
                            <div className="w-8 h-8 bg-[#19854B] rounded-full"></div>
                            {/* Bottom Line */}
                            <div className="w-[4px] flex-1 bg-[#19854B]"></div>
                        </div>
                
                        {/* Stop Details */}
                        <div className="flex px-5 h-full w-full justify-between items-center font-semibold">
                            <div>
                                <h2>[{stop.station.station_code}] {stop.station.name}</h2>
                            </div>
                            <div>
                                <h2 className="text-[#19854B]">~3 นาที</h2>
                            </div>
                        </div>
                    </CardContent>
                ))}
                </div>

                </Card>
                
            </Box>
        </div>
    )
    
}
export default LineCardInfo;
