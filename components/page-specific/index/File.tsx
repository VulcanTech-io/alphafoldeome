import type { FC, SetStateAction } from "react";
import { useDrop } from "react-use";

interface Props {
  setText: (value: SetStateAction<string>) => void;
}

export const File: FC<Props> = ({ setText }) => {
  const state = useDrop({
    onFiles: (files) => {
      files[0].text().then((text) => {
        setText(text);
      });
    },
  });

  return (
    <div className="mt-8 flex w-full items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-slate-700 dark:hover:border-gray-500 dark:hover:bg-slate-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            .txt | .fasta | .faa | .fas | .FASTA | .FAA | .FAS
          </p>
        </div>
        <input
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            file.text().then((text) => {
              setText(text);
            });
          }}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </label>
    </div>
  );
};
