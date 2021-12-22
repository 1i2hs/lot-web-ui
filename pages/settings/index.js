import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

export default function Settings({}) {
  return (
    <>
      <div className="flex flex-col gap-3 p-4">
        <section>
          <label className="block text-xl font-semibold border-b py-2">
            Account
          </label>
          <div>
            <div className="pt-2 text-blue-500 text-base">
              oneitwoh@gmail.com
            </div>
            <div className="flex justify-between items-center mt-1 pb-2">
              <span className="text-base">Connected Service</span>
              <span className="text-base font-bold text-blue-600">GOOGLE</span>
            </div>
            <button className="mt-1 text-rose-600 text-base font-bold py-2 underline">
              SIGN OUT
            </button>
          </div>
        </section>

        <section>
          <label className="block text-xl font-semibold border-b py-2">
            Preferences
          </label>
          <div className="flex flex-col divide-y divide-dotted">
            <button className="flex justify-between items-center py-4">
              <span className="text-base">Language</span>
              <span className="text-base font-bold text-blue-600">English</span>
            </button>
            <button className="flex justify-between items-center py-4">
              <span className="text-base">Currency</span>
              <span className="text-base font-bold text-blue-600">KRW</span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
