"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File>();
  const [name, setName] = useState<string>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);
      data.set("name", name ?? "");

      const res = await fetch("/api/images", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="text-black"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <input type="submit" value="Upload" />
    </form>
  );
}
