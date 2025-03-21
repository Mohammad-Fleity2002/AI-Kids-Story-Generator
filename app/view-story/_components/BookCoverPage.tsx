import Image from "next/image";
import React from "react";

const BookCoverPage = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div>
      <Image width={500} height={500} src={imageUrl} alt="Book Cover" />
    </div>
  );
};

export default BookCoverPage;
