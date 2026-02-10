import { useEffect, useState } from "react";

const useCountUp = (target, duration = 600) => {
  const [count, setCount] = useState(target);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(target / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
};

export default useCountUp;