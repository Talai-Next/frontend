import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import SeatRating from "@/components/SeatRating";
import { z } from "zod";
import api from "../api";
import { BusStationSearch } from "@/components/BusStationSearch";
import { motion, AnimatePresence } from "framer-motion";
import useNearestStation from "@/hooks/NearestStation";
import { FaCommentMedical } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const reportSchema = z.object({
  busStop: z.string().nonempty("Bus stop is required"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  comments: z
    .string()
    .min(1, "Comments must be at least 1 character long")
    .max(255, "Comments must be less than 255 characters"),
});

const ReportPage = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [busStop, setBusStop] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { nearestStation } = useNearestStation();
  const { t } = useTranslation();

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
      bus_stop: busStop,
      passenger_density: rating,
      comment: comments,
    };

    try {
      const response = await api.post("/api/receive-feedback/", formData);

      if (response.status !== 201) {
        throw new Error("Failed to submit the form");
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      setBusStop(nearestStation?.station_code);
      setRating(0);
      setComments("");
      setError("");
    } catch (error) {
      setError(`An error occurred while submitting the form. : ${error}`);
    }
  };

  return (
    <div className="w-full h-screen bg-[radial-gradient(circle_at_top_left,#0096FF52,#FFDE6A42)] flex justify-center items-center px-6">
      <Card className="w-full max-w-lg bg-white rounded-xl p-8 shadow-xl">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {t('report_label')}
          </h2>

          <h2 className="text-lg text-gray-800">{t('select_bus_stop')}</h2>
          <div className="mx-1">
            <BusStationSearch busStop={busStop} setBusStop={setBusStop} nearestStation={nearestStation} />
          </div>

          <div>
            <h2 className="text-lg text-gray-800">{t('rate_exp')}</h2>
            <SeatRating rating={rating} setRating={setRating} />
          </div>

          <div>
            <h2 className="text-lg text-gray-800">{t('comment')}</h2>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="mt-1 p-3 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder={t('comment_des')}
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
              {t('submit')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {success && (
          <motion.div
            className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center">
              <FaCommentMedical className="mr-2 text-xl" />
              <span>{t('feedback_success')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportPage;
