import { get } from "@/app/server/get";
import { set } from "@/app/server/set";

const TestGlobalDBPage = async () => {
  const userName = await get<string>("userName");
  return (
    <div>
      <div>
        <h1>Test Global DB Page</h1>
        <p>username: {userName}</p>
      </div>
      <div>
        <form
          action={async (formData: FormData) => {
            "use server";
            set("userName", formData.get("userName")?.toString());
          }}
        >
          <input type="text" name="userName" />
          <button type="submit">Set Username</button>
        </form>
      </div>
    </div>
  );
};

export default TestGlobalDBPage;
