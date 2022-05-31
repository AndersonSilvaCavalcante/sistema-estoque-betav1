import Lottie from "react-lottie";

type Iprops = {
  name: string;
  width?: string;
  height?: string;
};

const LottieCustom = ({ name, width, height }: Iprops) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require(`./animations/${name}.json`),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      height={height ? height : 400}
      width={width ? width : 400}
    />
  );
};

export { LottieCustom };
