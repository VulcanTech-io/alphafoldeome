import { useState, type FC, useEffect, useRef } from "react";
import { Loader } from "./Loader";
import { v4 as uuid } from "uuid";
import { RxCopy, RxDownload } from "react-icons/rx";
import { File } from "./File";

interface Props {
  //
}

export const Home: FC<Props> = ({}) => {
  const [text, setText] = useState("");
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // array of urls
  const urlResults = useRef<string[]>([]);
  const counter = useRef<number>(0);
  const [code, setCode] = useState<string>(
    `#!/bin/bash\n\npdbArr=(URL_ARRAY)\n\n` +
      "uuidDir=ALPHAFOLDEOME-UUID\n" +
      "mkdir ${uuidDir}\n\n" +
      "for pbd in ${pdbArr[@]}\n" +
      "do\n" +
      "curl https://alphafold.ebi.ac.uk/files/${pbd} -o ${uuidDir}/${pbd}\n" +
      "done\n"
  );

  useEffect(() => {
    console.log(text);
    const x =
      text.match(/\|([A-Za-z0-9]+)\|/g)?.map((r) => r.replaceAll("|", "")) ||
      [];
    if (x.length > 0) setData(x);
  }, [text]);

  useEffect(() => {
    const maxDataLength = 100;
    if (data.length !== 0) {
      setLoading(true);
      data.map((accession, i, { length }) => {
        const url = `https://alphafold.ebi.ac.uk/api/prediction/${accession}?key=AIzaSyCeurAJz7ZGjPQUtEaerUkBZ3TaBkXrY94`;
        fetch(url)
          .then((res) => res.json())
          .then(([res]) => {
            urlResults.current.push(
              res.pdbUrl.replace("https://alphafold.ebi.ac.uk/files/", "")
            );
            counter.current++;

            if (counter.current === (maxDataLength || length)) {
              setLoading(false);
              setCode(
                (current) =>
                  `${current
                    .replaceAll("UUID", uuid())
                    .replace("URL_ARRAY", urlResults.current.join("\n"))}`
              );
            }
          })
          .catch((err) => {
            console.error(err);
            counter.current++;
            if (counter.current === (maxDataLength || length)) {
              setLoading(false);
              setCode(
                (current) =>
                  `${current
                    .replaceAll("UUID", uuid())
                    .replace("URL_ARRAY", urlResults.current.join("\n"))}`
              );
            }
          });
      });
    }
  }, [data]);
  return (
    <div className="mx-8">
      <h2 className="mb-2 mt-4 text-center text-3xl text-white">Our Mission</h2>
      <p className="text-center text-lg text-white">
        Download multiple AlphaFold structure <br />
        from any Uniprot FASTA file
      </p>
      <File setText={setText} />
      <br />
      <Loader loading={loading} />
      <div className="relative my-8 rounded-md border-gray-700 bg-slate-700 p-3 text-blue-200">
        <code className="whitespace-pre-wrap">{code}</code>
        <div
          className="absolute right-2 top-2 cursor-pointer rounded-md border border-gray-600 p-2 transition-colors hover:brightness-125"
          onClick={() => {
            navigator.clipboard.writeText(code);
          }}
        >
          <RxCopy size={24} />
        </div>
        <div
          onClick={() => {
            const blob = new Blob([code], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "alphafoldeome.sh";
            a.click();
          }}
          className="absolute right-16 top-2 cursor-pointer rounded-md border border-gray-600 p-2 transition-colors hover:brightness-125"
        >
          <RxDownload size={24} />
        </div>
      </div>
    </div>
  );
};
