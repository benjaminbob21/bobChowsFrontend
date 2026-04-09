import Player from "lottie-react";
import animationData from "@/assets/restaurant-loader.json"

const LottieAnimation = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Player
        autoplay
        loop
        animationData={animationData} // Use animationData prop for JSON file
        style={{ height: "250px", width: "250px" }}
      />
    </div>
  );
};

export default LottieAnimation;
