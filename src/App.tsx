import { useEffect, useState } from "react";

export interface Notice {
  date_of_birth: string;
  nationalities: string[];
  entity_id: string;
  forename: string;
  name: string;
  _links: Links;
}

export interface Links {
  self: Images;
  images: Images;
  thumbnail: Images;
}

export interface Images {
  href: string;
}

function App() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [search, setSearch] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const data = await fetch(
        `https://ws-public.interpol.int/notices/v1/red?forename=${search}&resultPerPage=200`
      ).then((res) => res.json());

      setNotices(data._embedded.notices);
      setLoading(false);
    };
    fetchData();
  }, [search]);

  return (
    <div className="h-screen bg-gray-200 flex flex-col gap-3 px-10 pt-5">
      <div className="text-4xl font-semibold">React Debouncing Demo</div>
      <div className="flex-1 flex flex-col justify-start items-center">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none focus:outline-blue-800 shadow-md hover:shadow-lg duration-700 px-4 py-2 h-11 rounded-md md:w-1/3 placeholder:animate-pulse "
          placeholder="🔍 Search Interpol Data"
        />
        <div>
          {notices.map((notice) => (
            <div key={notice.entity_id}>
              <img src={notice?._links?.images?.href} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
