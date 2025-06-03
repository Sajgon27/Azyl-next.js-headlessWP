
import Slider from "react-infinite-logo-slider";
import Image from "next/image";

const logos = [
  {
    src: '/facebook.png',
    href: "https://www.youtube.com/watch?v=B9giBE_Wkfs&ab_channel=SaintKhaled",
  },
  {
    src: '/facebook.png',
    href: "https://www.youtube.com/watch?v=B9giBE_Wkfs&ab_channel=SaintKhaled",
  },
  {
    src: '/facebook.png',
    href: "https://www.youtube.com/watch?v=B9giBE_Wkfs&ab_channel=SaintKhaled",
  },
  {
    src: '/facebook.png',
    href: "https://www.youtube.com/watch?v=B9giBE_Wkfs&ab_channel=SaintKhaled",
  },
];

export default function Sponsors() {
  return (
    <div className="bg-primary-200  py-32 mt-20 overflow-hidden">
    
      <div className="container mx-auto">
        <Slider
          width="250px"
          duration={10} // Adjust speed
          pauseOnHover={false}
          blurBorders={true}
          blurBorderColor={"#8f2100"}
        >
          {logos.map((logo, index) => (
            <Slider.Slide key={index}>
              <a href={logo.href} target="_blank" rel="noopener noreferrer">
                <Image width={160} height={60} src={logo.src} alt={`logo-${index}`} className="w-32 sm:w-46" />
              </a>
            </Slider.Slide>
          ))}
        </Slider>
      </div>
    </div>
  );
}


