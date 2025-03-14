// import React from 'react'
import Image from 'next/image'
// function BookCoverPage({imageUrl}:any) {
//   return (
//     <div>
//         <Image src={imageUrl} width={500} height={500} alt='cover-Image'/>
//     </div>
//   )
// }

// export default BookCoverPage
import React from "react";

const BookCoverPage = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div>
            <Image width={500} height={500} src={imageUrl} alt="Book Cover" />
        </div>
    );
};

export default BookCoverPage;