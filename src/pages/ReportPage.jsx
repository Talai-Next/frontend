import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import SeatRating from "@/components/SeatRating";
import { z } from "zod";
import api from "@/api";
import { BusStationSearch } from "@/components/BusStationSearch";

const reportSchema = z.object({
  busStop: z.string().nonempty("Bus stop is required"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  comments: z
    .string()
    .max(500, "Comments must be less than 255 characters")
    .optional(),
});

const ReportPage = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [busStop, setBusStop] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = reportSchema.safeParse({
      busStop,
      rating,
      comments,
    });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    const formData = {
      passenger_density: rating,
      comment: comments,
      busStop: "bus stop",
    };

    try {
      const response = await api.post("/api/receive-feedback/", formData);

      if (response.status !== 201) {
        throw new Error("Failed to submit the form");
      }

      setBusStop("");
      setRating(0);
      setComments("");
      setError("");
    } catch (error) {
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-200 to-green-100 flex justify-center items-center px-6">
      <Card className="w-full max-w-lg bg-white rounded-xl p-8 shadow-xl">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Rate Your Bus Stop Experience
          </h2>

          <h2 className="text-lg text-gray-800">Select Your Bus Stop</h2>
          <div className="mx-5">
            <BusStationSearch busStop={busStop} setBusStop={setBusStop} />
          </div>

          <div>
            <h2 className="text-lg text-gray-800">Rate Your Experience</h2>
            <SeatRating rating={rating} setRating={setRating} />
          </div>

          <div>
            <h2 className="text-lg text-gray-800">Additional Comments</h2>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="mt-1 p-3 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Add your comments..."
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              <p>{error}</p>
            </div>
          )}

          <div className="w-full flex justify-end mt-6">
            <Button
              className="bg-[#0096FF] text-white px-6 py-2 rounded-lg transition-all hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportPage;
