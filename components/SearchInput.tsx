"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useDebounce from "@/hooks/useDebounce";

// this will not make us refresh our songs on every input. We will only refetch when user stops typing. smart. 

// debounce only refreshes page when user stops typing. 
import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');

// value is our string searcher

  const debouncedValue = useDebounce<string>(value, 500);

//   .5 sec of non typing causes it to re fetch
  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/search',
      query
    });

    router.push(url);
  }, [debouncedValue, router]);

  return ( 
    <Input 
      placeholder="Find a Song"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
    // can change this more later too. the event is here, it just sets value. it changes url after .5 seconds. 
  );
}
 
export default SearchInput;