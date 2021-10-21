import { useRouter } from "next/router";
import { useIdleTimer } from "react-idle-timer";

export const ReloadOnIdle = () => {
  const router = useRouter();

  const handleOnIdle = () => {
    router.reload();
  };

  useIdleTimer({
    //        ms    s    m
    timeout: 1000 * 10 * 1,
    onActive: handleOnIdle,
    events: ["visibilitychange"],
    debounce: 500,
  });
};
