import { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot, Star } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight hover:text-gray-700 transition-colors">
            {restaurant.restaurantName}
          </h2>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-lg bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-md">
              {restaurant.averageRating.toFixed(1)}
            </span>

            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="relative">
                  <Star className="w-5 h-5 text-gray-200" />
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          (restaurant.averageRating - (star - 1)) * 100
                        )
                      )}%`,
                    }}
                  >
                    <Star className="w-5 h-5 text-yellow-700 fill-yellow-500" />
                  </div>
                </div>
              ))}
            </div>
            <span className="text-gray-500 text-sm">
              ({restaurant.reviewCount} reviews)
            </span>
          </div>
        </CardTitle>
        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {restaurant.cuisines.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
