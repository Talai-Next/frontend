import { Box, Card, CardActions, CardContent} from '@mui/material';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from 'react';
function LineCardInfo({data, line}){
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        // Toggle visibility of the next CardContent
        console.log(`opem card`);
        setIsOpen(!isOpen);
      };
    return(
        <div >
            <Box >
                <Card className='shadow-none' elevation={0} >
                    <CardContent 
                        onClick={() => handleClick()}
                        className='flex flex-col bg-[#B4D4C3] cursor-pointer rounded-3xl hover:bg-[#9BC0AD]' 
                    >
                        <div className='flex py-3 px-5 justify-between items-center'>
                            <div>
                                <h2 className='font-semibold'>สาย {line}</h2>
                                <p className='mt-2'>12 นาทีถึงที่ที่คุณอยู่</p>
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

// import { Box, Card, CardContent } from "@mui/material";
// import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
// import { useState, useEffect } from "react";

// function LineCardInfo({ line }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [busStops, setBusStops] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchNearbyStops = async (latitude, longitude) => {
//         try {
//             const response = await fetch(
//                 `https://127.0.0.1:8000/api/nearby-stations?lat=${latitude}&lon=${longitude}&radius=2.0`
//             );
//             const data = await response.json();
//             setBusStops(data.nearby_stations || []);
//         } catch (error) {
//             console.error("Error fetching nearby stops:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     fetchNearbyStops(latitude, longitude);
//                 },
//                 (error) => {
//                     console.error("Geolocation error:", error);
//                     setLoading(false);
//                 }
//             );
//         } else {
//             console.error("Geolocation not supported");
//             setLoading(false);
//         }
//     }, []);

//     const handleClick = () => {
//         console.log("Open card");
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div>
//             <Box>
//                 <Card className="shadow-none" elevation={0}>
//                     <CardContent
//                         onClick={handleClick}
//                         className="flex flex-col bg-[#B4D4C3] cursor-pointer rounded-3xl hover:bg-[#9BC0AD]"
//                     >
//                         ...
//                     </CardContent>

//                     <div className={`mt-2 px-5 transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}>
//                         {busStops.map((stop, index) => (
//                             <CardContent key={index} sx={{ mt: 0, padding: "0 !important" }} className="flex h-36 items-center">
//                                 <div className="flex flex-col flex-1 items-center w-[50px] h-full">
//                                     <div className="w-[4px] flex-1 bg-[#19854B]"></div>
//                                     <div className="w-8 h-8 bg-[#19854B] rounded-full"></div>
//                                     <div className="w-[4px] flex-1 bg-[#19854B]"></div>
//                                 </div>

//                                 <div className="flex px-5 h-full w-full justify-between items-center font-semibold">
//                                     <div>
//                                         <h2>[{stop.id}] {stop.name}</h2>
//                                     </div>
//                                     <div>
//                                         <h2 className="text-[#19854B]">~{(stop.distance_km * 2).toFixed(1)} minutes</h2>
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         ))}
//                     </div>
//                 </Card>
//             </Box>
//         </div>
//     );
// }

// export default LineCardInfo;