import Lottie from "react-lottie";

interface IProps {
    loop?: boolean
    animation: any
}
const LottieFilesComponent = ({loop, animation}: IProps) => {
    const defaultOptions = {
        loop: loop || false,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={300}
                width={300}
            />
        </div>
    );
}
export default LottieFilesComponent