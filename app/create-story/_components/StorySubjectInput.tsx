import React, { useState } from "react";
import { Textarea } from "@heroui/input";

function StorySubjectInput({ userSelection }: any) {
  const [text, setText] = useState("");

  // Check if the browser supports SpeechRecognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "en-US"; // Set the language for speech recognition

  // Start the speech recognition and update the text state when speech is detected
  const startSpeechRecognition = () => {
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      userSelection({
        fieldValue: transcript,
        fieldName: "storySubject",
      });
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
    };
  };

  return (
    <div>
      <label className="font-bold text-4xl text-primary">
        1. Subject of the story
      </label>
      <Textarea
        value={text}
        placeholder="Write the subject of the story which you want to generate"
        size="lg"
        classNames={{ input: "resize-y min-h-[230px] text-2xl p-5" }}
        className="mt-3 max-w-lg"
        onChange={(e) => {
          setText(e.target.value);
          userSelection({
            fieldValue: e.target.value,
            fieldName: "storySubject",
          });
        }}
      />
      <button
        onClick={startSpeechRecognition}
        color="primary"
        className="mt-3 p-2 text-2xl bg-primary text-white rounded-lg"
      >
        Start Voice Input
      </button>
    </div>
  );
}

export default StorySubjectInput;


/*
import React from "react";
import { Textarea } from "@heroui/input";

function StorySubjectInput({ userSelection }: any) {
  return (
    <div>
      <label className="font-bold text-4xl text-primary">
        1. Subject of the story
      </label>
      <Textarea
        placeholder="Write the subject of the story which you want to generate"
        size="lg"
        classNames={{ input: "resize-y min-h-[230px] text-2xl p-5" }}
        className="mt-3 max-w-lg"
        onChange={(e) =>
            userSelection({
            fieldValue: e.target.value,
            fieldName: "storySubject",
          })
        }
      />
    </div>
  );
}

export default StorySubjectInput;
*/