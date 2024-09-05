import { Link } from "react-router-dom";

import { Head } from "@/components/seo";

export const NotFoundRoute = () => {
  return (
    <>
      <Head title="404 - Not Found" />
      <div className="mt-52 flex flex-col items-center font-semibold">
        <h1>404 - Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" replace>
          Go to Home
        </Link>
      </div>
    </>
  );
};
