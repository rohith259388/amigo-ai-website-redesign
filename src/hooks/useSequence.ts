import { useEffect, useState } from "react";

type Options = {
  loop?: boolean;
  restartDelay?: number;
  reduced?: boolean;
};

/**
 * Runs a stepped timeline (array of step durations in ms) while `active` is true.
 * Returns the current step index. Loops by default after the last step.
 */
export function useSequence(durations: number[], active: boolean, options: Options = {}) {
  const { loop = true, restartDelay = 2600, reduced = false } = options;
  const [step, setStep] = useState(0);
  const total = durations.length;

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setStep(total - 1);
      return;
    }

    let i = 0;
    let timer: number | undefined;
    setStep(0);

    const tick = () => {
      if (i < total - 1) {
        timer = window.setTimeout(() => {
          i += 1;
          setStep(i);
          tick();
        }, durations[i]);
      } else if (loop) {
        timer = window.setTimeout(() => {
          i = 0;
          setStep(0);
          tick();
        }, restartDelay);
      }
    };

    tick();
    return () => {
      if (timer) window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduced, total, loop, restartDelay]);

  return step;
}
