import { useCallback, useRef, useState } from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";

const Portfolio = () => {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [portfolioReady, setPortfolioReady] = useState(false);
  const attachPortfolio = useCallback((element: HTMLDivElement | null) => {
    portfolioRef.current = element;
    setPortfolioReady(element !== null);
  }, []);

  return (
    <div
      ref={attachPortfolio}
      id="portfolio-work"
      tabIndex={-1}
      className="min-[801px]:flex min-[801px]:items-start"
    >
      {portfolioReady && <Sidebar portfolioRef={portfolioRef} />}
      <Content />
    </div>
  );
};

export default Portfolio;
