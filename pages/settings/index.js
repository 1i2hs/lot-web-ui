import { useCallback, useEffect, useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CurrencySelectDialog from "../../components/CurrencySelectDialog";
import LanguageSelectDialog from "../../components/LanguageSelectDialog";

const ACTION_TYPE = {
  SIGN_OUT: "SIGN_OUT",
  OPEN_LANGUAGE_SELECT_DIALOG: "OPEN_LANGUAGE_SELECT_DIALOG",
  OPEN_CURRENCY_SELECT_DIALOG: "OPEN_CURRENCY_SELECT_DIALOG",
  CLOSE_DIALOG: "CLOSE_DIALOG",
};

const initialState = {
  isSignOutDialogOpen: false,
  isLanguageSelectDialogOpen: false,
  isCurrencySelectDialogOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.SIGN_OUT:
      return {
        isSignOutDialogOpen: true,
        isLanguageSelectDialogOpen: false,
        isCurrencySelectDialogOpen: false,
      };
    case ACTION_TYPE.OPEN_LANGUAGE_SELECT_DIALOG:
      return {
        isSignOutDialogOpen: false,
        isLanguageSelectDialogOpen: true,
        isCurrencySelectDialogOpen: false,
      };
    case ACTION_TYPE.OPEN_CURRENCY_SELECT_DIALOG:
      return {
        isSignOutDialogOpen: false,
        isLanguageSelectDialogOpen: false,
        isCurrencySelectDialogOpen: true,
      };
    case ACTION_TYPE.CLOSE_DIALOG:
      return {
        isSignOutDialogOpen: false,
        isLanguageSelectDialogOpen: false,
        isCurrencySelectDialogOpen: false,
      };
    default:
      throw new Error(`Invalid action type for a reducer`);
  }
}

const containerVariants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  hidden: { opacity: 0, x: 100 },
};

export default function Settings({}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onClickSetLanguage = useCallback(async () => {
    dispatch({ type: ACTION_TYPE.OPEN_LANGUAGE_SELECT_DIALOG });
  }, []);

  const onClickSetCurrency = useCallback(async () => {
    dispatch({ type: ACTION_TYPE.OPEN_CURRENCY_SELECT_DIALOG });
  }, []);

  const onCloseDialog = useCallback(() => {
    dispatch({ type: ACTION_TYPE.CLOSE_DIALOG });
  }, []);

  const onSaveLanguage = useCallback((languageCode) => {
    // TODO set local language setting(both LocalStorage & Context);
    console.log(languageCode);
  }, []);

  const onSaveCurrency = useCallback((currencyCode) => {
    // TODO set local language setting(both LocalStorage & Context);
    console.log(currencyCode);
  }, []);

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="flex flex-col gap-3 p-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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
                <span className="text-base font-bold text-blue-600">
                  GOOGLE
                </span>
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
              <button
                className="flex justify-between items-center py-4"
                onClick={onClickSetLanguage}
              >
                <span className="text-base">Language</span>
                <span className="text-base font-bold text-blue-600">
                  English
                </span>
              </button>
              <button
                className="flex justify-between items-center py-4"
                onClick={onClickSetCurrency}
              >
                <span className="text-base">Currency</span>
                <span className="text-base font-bold text-blue-600">KRW</span>
              </button>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      <LanguageSelectDialog
        isOpen={state.isLanguageSelectDialogOpen}
        onClose={onCloseDialog}
        onSave={onSaveLanguage}
      />

      <CurrencySelectDialog
        isOpen={state.isCurrencySelectDialogOpen}
        onClose={onCloseDialog}
        onSave={onSaveCurrency}
      />
    </>
  );
}
