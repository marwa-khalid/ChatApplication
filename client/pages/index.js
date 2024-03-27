import { useEffect } from "react";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);
};

export default index;
