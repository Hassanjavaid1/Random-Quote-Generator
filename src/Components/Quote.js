import React, { useEffect, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { RiDoubleQuotesL } from "react-icons/ri";
import Lottie from "lottie-react";
import Loader from "./Loader.json";
import { quotes } from "../api/QuoteApi";
import { GrLinkNext } from "react-icons/gr";
import { LinkedinShareButton } from "react-share";

function Quote() {
  const [quoteData, setQuoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Quote Fetching.
  const fetchQuote = async () => {
    try {
      setIsLoading(true);
      //Fetch Image
      const url = await fetch("https://picsum.photos/1920/1080");
      const imageURL = url.url;

      // Fetch Quote
      let randomIndx = Math.floor(Math.random() * 30);

      // Declaring Values.
      setTimeout(() => {
        document.body.style.backgroundImage = `url(${imageURL})`;
        setQuoteData(quotes[randomIndx]);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      setIsLoading(true);
    }
  };

  // Social share handle.
  // const getLinkedinURL = (quote, author) => {
  //   const baseUrl = "https://twitter.com/intent/tweet";
  //   const text = encodeURIComponent(`"${quote}" - ${author}`);
  //   return `${baseUrl}?text=${text}`;
  // };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <>
      <div className="container">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(4, 4, 4, 0.33)", // Blue overlay
            zIndex: 0,
          }}
        ></div>
        <div id="quote-box">
          {isLoading ? (
            <Lottie
              animationData={Loader}
              style={{ width: "350px", marginBottom: "2rem" }}
            />
          ) : (
            <>
              <h3 id="author">{quoteData.author}</h3>
              <p id="text">
                <RiDoubleQuotesL />
                {quoteData.quote}
              </p>
            </>
          )}

          <div id="links">
            <LinkedinShareButton
              url={window.location.href}
              title={`"${quoteData.quote}" - ${quoteData.author}`}
            >
              <FaLinkedinIn id="share" />
            </LinkedinShareButton>
            <button id="new-quote" onClick={() => fetchQuote()}>
              <GrLinkNext />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quote;
