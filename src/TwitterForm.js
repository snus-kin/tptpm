import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios";

const getTwitterID = async (data) => {
  const response = await axios.post("https://snufk.in:8443/getTwitterID", {
    username: data,
  });
  return response.data;
};

export const TwitterForm = () => {
  const queryClient = useQueryClient();
  let url = new URL("https://twitter.com/messages/compose/");
  let params = new URLSearchParams(url.search);
  const [link, setLink] = useState("Click submit to generate link");

  const mutate = useMutation(getTwitterID, {
    onSuccess: async (data) => {
      return data;
    },
    onError: () => {
      setLink("Error, try again later");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const generateLink = async (event) => {
    event.preventDefault();

    const username = event.target.elements.twname.value;
    const message = event.target.elements.message.value;

    if (!event.target.elements.twname.value) {
      setLink("Please enter a username");
      return;
    }

    const data = await mutate.mutateAsync(username);

    if (data.error) {
      setLink(data.error);
      return;
    }

    params.set("recipient_id", data.id);

    if (message) {
      // add message parameter
      params.set("text", message);
    } else {
      params.delete("text");
    }

    url.search = params.toString();
    setLink(url.toString());
  };

  return (
    <>
      <form onSubmit={generateLink}>
        <input type="text" name="twname" placeholder="Twitter username" />

        <input
          type="text"
          name="message"
          placeholder="Optional: Message to be included"
        />

        <input id="submit" type="submit" />
      </form>

      <div className="container">
        <div id="linkOutput">{link}</div>
        {/* TODO add visual feedback for clipboard */}
        <button
          id="clipboard"
          onClick={() => {
            navigator.clipboard.writeText(link);
          }}
        >
          <FontAwesomeIcon icon={solid("clipboard")} />
        </button>
      </div>
    </>
  );
};
