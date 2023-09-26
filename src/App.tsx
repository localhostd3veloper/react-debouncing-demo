import { useEffect, useState } from "react";
interface NoticesState {
  date_of_birth: string;
  entity_id: string;
  forename: string;
  name: string;
}
function App() {
  const [notices, setNotices] = useState<Array<NoticesState>>([]);
  const [search, setSearch] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getNotices = async () => {
      setLoading(true);
      await fetch(
        `https://ws-public.interpol.int/notices/v1/red?forename=${search}&resultPerPage=200`
      )
        .then((res) => res.json())
        .then((json) => setNotices(json._embedded.notices));
      setLoading(false);
    };
    getNotices();
  }, [search]);

  return (
    <div className="h-screen bg-gray-200 flex flex-col gap-3 px-10 pt-5">
      <div className="text-4xl font-semibold">React Debouncing Demo</div>
      <div className="flex-1 flex flex-col justify-start items-center">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none focus:outline-blue-800 shadow-md hover:shadow-lg duration-700 px-4 py-2 h-11 rounded-md md:w-1/3 placeholder:animate-pulse "
          placeholder="🔍 Search Anything..."
          value={search}
        />
        <div> {!loading && notices.map((notice) => <span key={notice.entity_id} className="px-2">{notice.name}</span>)}</div>
      </div>
    </div>
  );
}

export default App;
