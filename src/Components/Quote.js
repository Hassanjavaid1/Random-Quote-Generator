import React, { useEffect, useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { motivationalQuotes } from "./QuoteApi";
import { RiDoubleQuotesL } from "react-icons/ri";

function Quote() {
  const [data, setData] = useState([]);
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let color = "#";
  const fetchQuote = () => {
    let random = Math.floor(Math.random() * 30);
    setData(motivationalQuotes[random]);

    let hexDigit = "0123456789abcdef";
    for (let i = 0; i < 6; i++) {
      let randomNum = Math.floor(Math.random() * 16);
      color += hexDigit[randomNum];
    }
    document.body.style.background = `linear-gradient(to right,${color},rgb(${r},${g},${b}))`;
  };
  useEffect(() => {
    fetchQuote();
  }, []);
  const getTwitterShareUrl = (quote, author) => {
    const baseUrl = "https://twitter.com/intent/tweet";
    const text = encodeURIComponent(`"${quote}" - ${author}`);
    return `${baseUrl}?text=${text}`;
  };
  return (
    <>
      <div className="container">
        <div id="quote-box">
          <h3 id="text">
            <RiDoubleQuotesL />
            {data.quote}
          </h3>
          <p id="author">{data.author}</p>
          <div id="links">
            <div id="sub-links">
              <a
                title="share on X"
                href={getTwitterShareUrl(data.quote, data.author)}
                id="tweet-quote"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
            </div>
            <button id="new-quote" onClick={() => fetchQuote()}>
              New quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quote;
