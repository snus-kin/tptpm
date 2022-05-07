import React from "react";
import { TwitterForm } from "./TwitterForm";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <h1>Twitter Public to Private Message Link Generator</h1>

      <QueryClientProvider client={queryClient}>
        <TwitterForm />
      </QueryClientProvider>

      <div className="about">
        <p>
          The link produced by this website can be pasted in a tweet to create a
          badge that directs people to message you.
        </p>

        <p>
          I created this website as the feature is fairly obscure, and twitter 
          direct you to download your entire twitter archive to get your ID.
        </p>

        <p>
          As far as I know, this is the only official public-facing
          documentation:
        </p>
        <a class="docuLink" href="https://business.twitter.com/en/help/campaign-editing-and-optimization/public-to-private-conversation.html">
          Moving from a public Tweet to a private conversation
        </a>
      </div>

      <footer>
        By <a href="https://twitter.com/sn_fk_n">@sn_fk_n</a>
      </footer>
    </>
  );
}

export default App;
