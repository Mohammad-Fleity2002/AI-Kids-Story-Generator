import React from "react";

const ChapterPage = ({ chapter }: { chapter: any }) => {
    return (
        <div className="p-10">
            <h3 className="text-2xl font-bold mb-4">{chapter.title}</h3>
            <p className="text-lg">{chapter.content}</p>
        </div>
    );
};

export default ChapterPage;