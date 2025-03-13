import SearchBar from "./SearchBar"
function Search({des}){
    return(
        <div>
            <div className="flex flex-col w-[75%]">
                <div className="mb-5">
                    <SearchBar 
                        searchLable="ตำแหน่งของคุณ"/>
                </div>
                <SearchBar 
                    searchLable="กำลังนำทางไป"
                    value={des}/>
            </div>
        </div>
    )

}

export default Search