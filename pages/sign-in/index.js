import { useState, useCallback, useEffect, useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PasswordInput, TextInput } from "../../components/base/Input";
import Progress from "../../components/Progress";

const EMPTY_ID_PASSWORD = "ID or password cannot be empty";
const INVALID_ID_PASSWORD = "ID or password is invalid";

function validateIdAndPassword(id, pw) {
  if (id.length === 0 || pw.length === 0) {
    return EMPTY_ID_PASSWORD;
  }
  return null;
}

const sectionVariants = {
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  hidden: { opacity: 0 },
};

const itemVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -10 },
};

const ACTION_TYPE = {
  SET_ID: "SET_ID",
  SET_PW: "SET_PW",
  SHOW_ERROR_MESSAGE: "SHOW_ERROR_MESSAGE",
  START_SIGN_IN: "START_SIGN_IN",
  FINISH_SIGN_IN: "FINISH_SIGN_IN",
};

const initialState = {
  id: "",
  pw: "",
  errorMessage: "",
  isInvalid: false,
  isSigningIn: false,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.SET_ID:
      return {
        ...state,
        id: action.id,
      };
    case ACTION_TYPE.SET_PW:
      return {
        ...state,
        pw: action.pw,
      };
    case ACTION_TYPE.SHOW_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isInvalid: true,
      };
    case ACTION_TYPE.START_SIGN_IN:
      return {
        ...state,
        errorMessage: "",
        isInvalid: false,
        isSigningIn: true,
      };
    case ACTION_TYPE.FINISH_SIGN_IN:
      return {
        ...state,
        errorMessage: "",
        isInvalid: false,
        isSigningIn: false,
      };
  }
}

export default function SignIn({}) {
  // const [id, setId] = useState("");
  // const [pw, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("error message");
  // const [isSigningIn, setIsSigningIn] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChangeId = useCallback(
    (text) => {
      dispatch({ type: ACTION_TYPE.SET_ID, id: text });
    },
    [state.id]
  );

  const onChangePassword = useCallback(
    (text) => {
      dispatch({ type: ACTION_TYPE.SET_PW, pw: text });
    },
    [state.pw]
  );

  const onClickSignIn = useCallback(() => {
    const errorMessage = validateIdAndPassword(state.id, state.pw);
    if (errorMessage === null) {
      dispatch({ type: ACTION_TYPE.START_SIGN_IN });
      // TODO: call sign-in API
      setTimeout(() => {
        dispatch({ type: ACTION_TYPE.FINISH_SIGN_IN });
      }, 3000);
    } else {
      dispatch({ type: ACTION_TYPE.SHOW_ERROR_MESSAGE, errorMessage });
    }
  }, [state.id, state.pw]);

  return (
    <div className="relative flex flex-col h-screen justify-center items-center">
      <AnimatePresence>
        <motion.section
          className="flex flex-col gap-4 justify-center items-center max-w-md mx-auto p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={sectionVariants}
        >
          <motion.h1
            className="text-3xl font-extrabold mb-8"
            variants={itemVariants}
          >
            Lifetime of Things
          </motion.h1>

          <motion.div variants={itemVariants}>
            <TextInput
              htmlId="id"
              noLabel
              placeholder="YOUR ID"
              onChange={onChangeId}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PasswordInput
              htmlId="pw"
              noLabel
              placeholder="YOUR PASSWORD"
              onChange={onChangePassword}
            />
          </motion.div>
          {state.isInvalid && (
            <motion.div
              className="text-red-600 font-bold text-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {state.errorMessage}
            </motion.div>
          )}
          <motion.div variants={itemVariants}>
            <button
              className="mt-4 btn-primary-md w-full h-10"
              onClick={onClickSignIn}
            >
              Sign In
            </button>
          </motion.div>
        </motion.section>
      </AnimatePresence>
      <Progress message="Signing In..." dialog isVisible={state.isSigningIn} />
    </div>
  );
}

SignIn.getLayout = function getLayout(page) {
  return page;
};
