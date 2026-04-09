import Player from "lottie-react";
import animationData from "@/assets/restaurant-loader.json"

const LottieAnimation = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Player
        autoplay
        loop
        animationData={animationData} // Use animationData prop for JSON file
        style={{ height: "200px", width: "200px" }}
      />
    </div>
  );
};

export default LottieAnimation;
