"use client";
import React, { useEffect, useState } from "react";
import { LiaFilterSolid } from "react-icons/lia";
import FilterModel from "./FilterModel";
import { supabase } from "@/lib/supabaseClient";

function FilterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);
  return (
    <div>
      {user && (
        <div className="md:hidden block py-2">
          <span className="text-lg font-semibold">Welcome back, Flivian🎊</span>
        </div>
      )}
      <div className="flex items-center justify-between py-1 shadow md:px-3 gap-4">
        {user && (
          <div className="hidden md:block">
            <span className="text-lg font-semibold">
              Welcome back, Flivian🎊
            </span>
          </div>
        )}
        <div className="flex-grow flex items-center justify-center">
          <input
            type="text"
            className="border border-gray-700 w-full lg:w-1/2 bg-stone-200 px-2 py-2 font-mono rounded outline-none text-lg"
            placeholder="Search User"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className=" flex items-center gap-2 px-4 py-2 bg-gray-300 rounded shadow text-lg font-bold"
          >
            <LiaFilterSolid />
            <span>Filter</span>
          </button>
          {isOpen && <FilterModel onClose={() => setIsOpen(false)} />}
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
