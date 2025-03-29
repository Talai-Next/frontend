import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import SearchBar from "@/components/SearchBar";
import SeatRating from "@/components/SeatRating";

const ReportPage = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-200 to-green-100 flex justify-center items-center px-6">
      <Card className="w-full max-w-lg bg-white rounded-xl p-8 shadow-xl">
        <CardContent className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Rate Your Bus Stop Experience
          </h2>

          <h2 className="text-lg text-gray-800">Select Your Bus Stop</h2>
          <SearchBar searchLabel="Search Here" state="des" />

          <div>
            <h2 className="text-lg text-gray-800">Rate Your Experience</h2>
            <SeatRating rating={rating} setRating={setRating} />
          </div>

          <div>
            <h2 className="text-lg text-gray-800">Additional Comments</h2>
            <Textarea
              className="mt-1 p-3 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Add your comments..."
            />
          </div>

          <div className="w-full flex justify-end mt-6">
            <Button className="bg-[#0096FF] text-white px-6 py-2 rounded-lg transition-all hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">
              SUBMIT
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportPage;
