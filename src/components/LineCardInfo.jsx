import { Box, Card, CardContent} from '@mui/material';
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from 'react';
function LineCardInfo({line, time, lineInfo}){
    const [isOpen, setIsOpen] = useState(false);
    const stops = [
        { id: "w2", name: "ร้านค้าโครงการหลวง", time: 34 },
        { id: "w3", name: "หอพักหญิง", time: 25 },
        { id: "c9", name: "โรงอาหาร 1", time: 15 },
    ];
    return(
        <div >
            <Box >
                <Card className='shadow-none' elevation={0}>
                    <CardContent className='flex flex-col bg-[#B4D4C3] rounded-3xl hover:bg-[#9BC0AD]'>
                        <div className='flex py-3 px-5 justify-between items-center'>
                            <div>
                                <h2 className='font-semibold'>สาย 1</h2>
                                <p className='mt-2'>12 นาทีถึงที่ที่คุณอยู่</p>
                            </div>
                            <div>
                                <MdKeyboardArrowDown size={48}/>
                            </div>
                        </div>
                    </CardContent>
                    {stops.map((stop, index) =>
                    <CardContent className='flex h-38'>
                        <div className="flex flex-col w-[50px] justify-center items-center">
                            {/* Vertical Line - Top Half */}
                            <div className="w-[4px] h-11 bg-[#19854B]"></div>
                            {/* Circle in the center */}
                            <div className="w-8 h-8 bg-[#19854B] rounded-full"></div>
                            {/* Vertical Line - Bottom Half */}
                            <div className="w-[4px] h-11 bg-[#19854B]"></div>
                        </div>
                        <div className='flex px-5 w-screen justify-between items-center font-semibold'>
                            <div>
                                <h2>[{stop.id}] {stop.name}</h2>
                            </div>
                            <div>
                                <h2 className='text-[#19854B]'>~{stop.time} นาที</h2>
                            </div>
                        </div>
                    </CardContent>
                    )}   
                </Card>
                
            </Box>
        </div>
    )
}
export default LineCardInfo;