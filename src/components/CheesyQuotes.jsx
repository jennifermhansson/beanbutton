import MarqueeText from "react-marquee-text";

const quotes = [
  "Espresso yourself — don’t hold back",
  "Bean there, done that, still need coffee",
  "I love you a latte",
  "You mocha me happy",
  "Take life one sip at a time",
  "Better latte than never",
  "Coffee — because adulting is hard",
  "Words cannot espresso how much you mean to me",
  "Brew-tiful things happen after coffee",
  "May your coffee be strong and your Mondays short",
  "Life happens, coffee helps",
  "Stressed, blessed, and coffee obsessed",
  "Sometimes I stay up late just to drink coffee in peace",
  "Espresso may not fix everything, but it’s worth a shot",
  "Coffee — a hug in a mug",
  "Rise and grind",
  "Decaf? No thanks, I’m not into horror stories",
];

function CheesyQuotes() {
  return (
    <div className="container-quotes">
      <MarqueeText direction="right" duration={20} pauseOnHover={true}>
        {quotes.join(" • ")} • {quotes[0]}
      </MarqueeText>
    </div>
  );
}

export default CheesyQuotes;
