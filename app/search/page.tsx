









// this is to search songs we want to find. nice:

import getSongsByTitle from "@/actions/getSongsByTitle";
import SearchInput from "@/components/SearchInput";
import Header from "@/components/Header";

import SearchContent from "./components/SearchContent";

export const revalidate = 0;

interface SearchProps {
  searchParams: { title: string }
};

// has our title
// export const revalidate=0;

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

//   gets our songs by title
  return (
    <div 
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
{/* these styles make it different from our home page, no gradient by the bg-neutral-900 */}

      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Search
          </h1>
{/* search page. has our search in addition to a header and other things to make it look neater.  */}


{/* search contente refills our page with a list of songs after weve searched.  */}
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />

      
    </div>
  );
}

export default Search;


