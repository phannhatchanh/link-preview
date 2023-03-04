/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import React, { useState } from "react";
import Link from "next/link";
import { ImSpinner9 as LoadingSpinner } from "react-icons/im";
import { isValidUrl } from "../util/isValidUrl";
import axios, { AxiosError } from "axios";
import { Tab, TabPanel } from "../components/Tab";

const placeholderImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
const PreviewCard: React.FC<{ data: { [key: string]: string } }> = ({
  data,
}) => {
  return (
    <a href={data.url} target="_blank" rel="noreferrer">
      <div className="shadow-xl card card-compact w-96 bg-base-100">
        <figure>
          <img
            src={data.image || placeholderImage}
            alt="Shoes"
            height={250}
            width={384}
            className="object-contain w-full h-full"
          />
        </figure>
        <div className="card-body">
          <span className="text-sm text-gray-400 line-clamp-1">
            {data.site_name || data.url}
          </span>
          <h2 className="card-title">{data.title ?? ""}</h2>
          <p>{data.description ?? ""}</p>
        </div>
      </div>
    </a>
  );
};

const Home: NextPage = () => {
  const [url, setUrl] = useState("");

  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<{} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiEndpoint, setAPIEndpoint] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url || !isValidUrl(url)) {
      setError("Enter a valid URL");
      return;
    }

    try {
      setError(null);
      setData(null);
      setFetching(true);
      const { data, status } = await axios(`/api/previewDetails?url=${url}`);
      setUrl("");
      setData(data);
      setAPIEndpoint(url);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.error);
      } else {
        setError("Something went wrong. Try Again!");
      }
    } finally {
      setFetching(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen p-10">
      <header className="flex items-center gap-3 pt-3 cursor-pointer">
        <img src="/logo.png" alt="Logo" height={35} width={35} />
        <p className="text-lg font-bold text-gray-300">Preview Links</p>
      </header>

      <main className="flex flex-col items-center flex-1">
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-start justify-center w-full gap-5 mb-5 sm:flex-row"
        >
          <input
            type="url"
            required
            autoFocus
            value={url}
            onChange={(e) => {
              e.currentTarget.setCustomValidity("");
              setUrl(e.target.value);
            }}
            placeholder="Type a Url to see its preview."
            className="w-full input sm:max-w-sm"
            onInvalid={(e) => {
              e.currentTarget.setCustomValidity("Enter a valid Url");
            }}
          />
          <button
            disabled={fetching}
            className="btn btn-sm sm:btn-md btn-active btn-primary"
            type="submit"
          >
            Get Preview
          </button>
        </form>

        {fetching && <LoadingSpinner className="w-10 h-10 animate-spin" />}
        {error && !fetching && (
          <div className="text-sm text-red-400">{error}</div>
        )}
        {data && !fetching && (
          <Tab>
            <TabPanel title="Result">
              <PreviewCard data={data} />
            </TabPanel>
            <TabPanel title="API Endpoint">
              <li className="">
                API Endpoint:{" "}
                <Link href={`/api/previewDetails?url=${apiEndpoint}`}>
                  <a className="link link-accent link-hover">
                    /api/previewDetails?url={apiEndpoint}
                  </a>
                </Link>
              </li>
              <li className="w-[32rem]">
                JSON:{" "}
                <pre className="w-full overflow-x-auto border border-gray-600">
                  {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
                </pre>
              </li>
            </TabPanel>
          </Tab>
        )}
      </main>
    </div>
  );
};

export default Home;
