import Image from "next/image";

type LoadingProps = {
  additionalStyles?: string;
}

export default function Loading({additionalStyles}: LoadingProps ) {
  return (
    <div className={`flex justify-center items-center flex-col gap-4 py-20 ${additionalStyles ? additionalStyles : ""}`}>
      <h4 className="text-3xl">Ładowanie ...</h4>
      <Image
        src={"/loading.gif"}
        alt="Loading"
        unoptimized
        width={170}
        height={170}
      />
    </div>
  );
}
