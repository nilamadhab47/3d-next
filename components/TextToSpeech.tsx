"use client";

import React, { FormEvent, useState } from "react";

const TextToSpeech = () => {
  const [userText, setUserText] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const synth =
    typeof window === "undefined" ? null : (window as Window).speechSynthesis;
  const voices = synth?.getVoices();
  console.log("synthesis", voices);

  const selectedVoices = voices?.find((voices) => voices.name === "Rishi");

  const speak = (textToSpeak: string) => {
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    if (selectedVoices) {
      utterance.voice = selectedVoices;
    }
    synth?.speak(utterance);
    setisLoading(true);

    utterance.onend = () => {
      const thankYouUtterance = new SpeechSynthesisUtterance("Presented by LensCorp");
      if (thankYouUtterance) {
        // @ts-ignore
        synth.speak(thankYouUtterance);
      }
      setisLoading(false);
    };
  };

  const handleUserText = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    speak(userText);
    try {
        const response = await fetch("/api/openai/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userText
            })
        }) 
        const {message} = await response.json();
        console.log("message: " + message);
    } catch (error) {
        
    }
  };

  return (
    <div className=" relative top-0 z-50">
      <form
        onSubmit={handleUserText}
        className=" space-x-2 absolute top-[711px] left-[30px]"
      >
        <input
          type="text"
          className=" bg-transparent w-[510px] border border-red-500 outline-none rounded-lg placeholder:text-black p-2"
          placeholder="what do you want know?"
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
        />
        <button
          disabled={isLoading}
          className=" text-primary border p-2 border-red-500 rounded-lg hover:scale-100 hover:text-white "
        >
          {isLoading ? "thinking" : "Ask"}
        </button>
      </form>
    </div>
  );
};

export default TextToSpeech;
